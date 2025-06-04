import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
// Removed payload import that was causing issues

// Create a custom adapter for DigitalOcean Spaces (S3-compatible)
export const createDigitalOceanAdapter = ({ 
  region = process.env.S3_REGION || 'us-east-1', 
  endpoint = process.env.S3_ENDPOINT || '', 
  bucket = process.env.S3_BUCKET || '', 
  prefix = process.env.S3_PREFIX || '',
  accessKeyId = process.env.S3_ACCESS_KEY_ID || '',
  secretAccessKey = process.env.S3_SECRET_ACCESS_KEY || '',
  cdnEndpoint = process.env.PAYLOAD_PUBLIC_CLOUD_STORAGE_ENDPOINT || ''
}) => {
  // Process endpoint to ensure proper format
  let formattedEndpoint = endpoint;
  
  // Remove https:// if present
  if (formattedEndpoint.startsWith('https://')) {
    formattedEndpoint = formattedEndpoint.replace('https://', '');
  }
  
  // Create the S3 client for DigitalOcean
  console.log(`[DEBUG] Creating S3 client with endpoint: https://${formattedEndpoint}`);
  
  const client = new S3Client({
    region,
    endpoint: `https://${formattedEndpoint}`,
    credentials: {
      accessKeyId,
      secretAccessKey
    },
    forcePathStyle: true
  });

  // Return the adapter handler functions - match Payload's expected signature with optional prefix
  return ({ collection, prefix: collectionPrefix }: { collection: any; prefix?: string }) => {
    // Combine the global prefix with collection-specific prefix
    const finalPrefix = prefix ? (collectionPrefix ? `${prefix}/${collectionPrefix}` : prefix) : collectionPrefix;
    const prefixPath = finalPrefix ? `${finalPrefix}/` : '';

    return {
      // Provide a name for the adapter
      name: 'digital-ocean-spaces',

      // Handle file uploads to DigitalOcean Spaces
      handleUpload: async ({ file, data }: { file: any; data?: any }) => {
        if (!file?.filename) return;

        try {
          const key = `${prefixPath}${file.filename}`;
          
          // Dump full details of the file object to understand its structure
          console.log(`[DIGITAL OCEAN] Uploading file ${file.filename} to ${bucket}/${key}`);
          // Use a safe stringify to avoid circular references
          const safeStringify = (obj: any) => {
            const seen = new Set();
            return JSON.stringify(obj, (key, value) => {
              if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) return '[Circular]';
                seen.add(value);
              }
              return value;
            }, 2);
          };
          
          console.log(`[DIGITAL OCEAN] File metadata:`, {
            filename: file.filename,
            mimeType: file.mimeType,
            size: file.size,
            tempFilePath: file.tempFilePath || 'none'
          });
          console.log(`[DIGITAL OCEAN] Has tempFilePath:`, !!file.tempFilePath);
          console.log(`[DIGITAL OCEAN] Has buffer:`, !!file.buffer);
          console.log(`[DIGITAL OCEAN] Has data.buffer:`, data && !!data.buffer);
          
          // With Payload v3, the file access pattern is different
          // Let's try multiple strategies to get the file content
          const fs = await import('fs/promises');
          let buffer;
          
          try {
            if (file.buffer) {
              // Direct buffer access (uncommon)
              buffer = file.buffer;
              console.log('[DIGITAL OCEAN] Using file.buffer');
            } else if (file.tempFilePath) {
              // Payload often uses temporary files
              buffer = await fs.readFile(file.tempFilePath);
              console.log('[DIGITAL OCEAN] Using tempFilePath:', file.tempFilePath);
            } else if (data?.file?.buffer) {
              // Sometimes the buffer is nested in data.file
              buffer = data.file.buffer;
              console.log('[DIGITAL OCEAN] Using data.file.buffer');
            } else if (data?.buffer) {
              // Sometimes the buffer is in data
              buffer = data.buffer;
              console.log('[DIGITAL OCEAN] Using data.buffer');
            } else if (file.path) {
              // Some Payload versions use 'path' instead of tempFilePath
              buffer = await fs.readFile(file.path);
              console.log('[DIGITAL OCEAN] Using file.path:', file.path);
            } else if (typeof file.data === 'string' && file.data.startsWith('/')) {
              // Sometimes file.data is a path string
              buffer = await fs.readFile(file.data);
              console.log('[DIGITAL OCEAN] Using file.data as path:', file.data);
            } else {
              // Last resort: look for file in media folder based on filename
              try {
                const potentialPath = `media/${file.filename}`;
                buffer = await fs.readFile(potentialPath);
                console.log('[DIGITAL OCEAN] Found file in media folder:', potentialPath);
              } catch (err) {
                console.error('[DIGITAL OCEAN] No file data available for upload, all methods failed');
                return;
              }
            }
          } catch (readError) {
            console.error('[DIGITAL OCEAN] Error reading file:', readError);
            return;
          }
          
          // Upload the file with detailed logging
          console.log(`[DIGITAL OCEAN] Uploading buffer of length: ${buffer?.length || 'undefined'}`);
          
          await client.send(new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: buffer,
            ContentType: file.mimeType || 'application/octet-stream',
            ACL: 'public-read', // Make files publicly readable
          }));
          
          console.log(`[DIGITAL OCEAN] Upload completed for ${file.filename}`);

          // Don't return anything - void return type is expected
        } catch (error) {
          console.error('Error uploading to DigitalOcean:', error);
          return;
        }
      },

      // Handle file deletion from DigitalOcean Spaces
      handleDelete: async ({ filename }: { filename: string }) => {
        if (!filename) return;

        try {
          const key = `${prefixPath}${filename}`;
          
          // Log delete operations for debugging
          console.log(`[DIGITAL OCEAN] Deleting file ${filename} from ${bucket}/${key}`);
          
          // Actually delete the file from DigitalOcean Spaces
          await client.send(new DeleteObjectCommand({
            Bucket: bucket,
            Key: key,
          }));
        } catch (error) {
          console.error('Error deleting from DigitalOcean:', error);
        }
      },

      // Generate URLs for files stored in DigitalOcean Spaces
      generateURL: ({ filename }: { filename: string }) => {
        if (!filename) return '';
        const url = `${cdnEndpoint}/${prefixPath}${filename}`;
        console.log(`[DIGITAL OCEAN] Generated URL: ${url}`);
        return url;
      },

      // Static handler for files requested from the admin panel
      // Fix signature to match what Payload expects
      staticHandler: async (req: any, args: { params: { filename: string } }) => {
        try {
          const filename = args.params.filename;
          console.log(`[DIGITAL OCEAN] Static handler requested file: ${filename}`);
          
          // Instead of 404, redirect to the actual file URL
          const url = `${cdnEndpoint}/${prefixPath}${filename}`;
          console.log(`[DIGITAL OCEAN] Redirecting to: ${url}`);
          
          // Return a redirect response to the CDN URL
          return Response.redirect(url, 302);
        } catch (error) {
          console.error(`[DIGITAL OCEAN] Static handler error:`, error);
          return new Response('File not found', { status: 404 });
        }
      }
    };
  };
};

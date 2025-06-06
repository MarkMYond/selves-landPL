import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

export const createDigitalOceanAdapter = ({ 
  region = process.env.S3_REGION || 'us-east-1', 
  endpoint = process.env.S3_ENDPOINT || '', 
  bucket = process.env.S3_BUCKET || '', 
  prefix = process.env.S3_PREFIX || '',
  accessKeyId = process.env.S3_ACCESS_KEY_ID || '',
  secretAccessKey = process.env.S3_SECRET_ACCESS_KEY || '',
  cdnEndpoint = process.env.PAYLOAD_PUBLIC_CLOUD_STORAGE_ENDPOINT || ''
}) => {
  let formattedEndpoint = endpoint;
  
  if (formattedEndpoint.startsWith('https://')) {
    formattedEndpoint = formattedEndpoint.replace('https://', '');
  }
  
  const client = new S3Client({
    region,
    endpoint: `https://${formattedEndpoint}`,
    credentials: {
      accessKeyId,
      secretAccessKey
    },
    forcePathStyle: true
  });

  return ({ collection, prefix: collectionPrefix }: { collection: any; prefix?: string }) => {
    const finalPrefix = prefix ? (collectionPrefix ? `${prefix}/${collectionPrefix}` : prefix) : collectionPrefix;
    const prefixPath = finalPrefix ? `${finalPrefix}/` : '';

    return {
      name: 'digital-ocean-spaces',

      handleUpload: async ({ file, data }: { file: any; data?: any }) => {
        if (!file?.filename) return;

        try {
          const key = `${prefixPath}${file.filename}`;
          
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
          
          const fs = await import('fs/promises');
          let buffer;
          
          try {
            if (file.buffer) {
              buffer = file.buffer;
            } else if (file.tempFilePath) {
              buffer = await fs.readFile(file.tempFilePath);
            } else if (data?.file?.buffer) {
              buffer = data.file.buffer;
            } else if (data?.buffer) {
              buffer = data.buffer;
            } else if (file.path) {
              buffer = await fs.readFile(file.path);
            } else if (typeof file.data === 'string' && file.data.startsWith('/')) {
              buffer = await fs.readFile(file.data);
            } else {
              try {
                const potentialPath = `media/${file.filename}`;
                buffer = await fs.readFile(potentialPath);
              } catch (err) {
                return;
              }
            }
          } catch (readError) {
            return;
          }
          
          await client.send(new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: buffer,
            ContentType: file.mimeType || 'application/octet-stream',
            ACL: 'public-read',
          }));

        } catch (error) {
          return;
        }
      },

      handleDelete: async ({ filename }: { filename: string }) => {
        if (!filename) return;

        try {
          const key = `${prefixPath}${filename}`;
          
          await client.send(new DeleteObjectCommand({
            Bucket: bucket,
            Key: key,
          }));
        } catch (error) {
        }
      },

      generateURL: ({ filename }: { filename: string }) => {
        if (!filename) return '';
        const url = `${cdnEndpoint}/${prefixPath}${filename}`;
        return url;
      },

      staticHandler: async (req: any, args: { params: { filename: string } }) => {
        try {
          const filename = args.params.filename;
          
          const url = `${cdnEndpoint}/${prefixPath}${filename}`;
          
          return Response.redirect(url, 302);
        } catch (error) {
          return new Response('File not found', { status: 404 });
        }
      }
    };
  };
};

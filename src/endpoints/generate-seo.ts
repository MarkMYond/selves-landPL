// import type { Endpoint } from 'payload/types'; // Temporarily using any
// import { Forbidden } from 'payload/errors'; // Temporarily removing
import type { Request, Response, NextFunction } from 'express'; // Adding Express types
import { extractTextFromBlocks } from '../lib/extractTextFromBlocks';
import { generateSeoDataWithGemini } from '../lib/geminiService';
import type { PayloadRequest } from 'payload/types'; // For req.user and req.payload

export const generateSeoEndpoint: any = { // Using any for Endpoint type temporarily
  path: '/generate-seo',
  method: 'post',
  handler: async (req: PayloadRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      // return next(new Forbidden()); // Temporarily removed due to import issues
      return res.status(403).json({ error: 'Forbidden' });
    }

    // TODO: Refine body typing once core functionality is working
    const { docId, collectionSlug } = req.body as any; 

    if (!docId || !collectionSlug) {
      return res.status(400).json({ error: 'Missing docId or collectionSlug' });
    }

    try {
      // 1. Fetch the document
      const doc = await req.payload.findByID({
        collection: collectionSlug,
        id: docId,
        depth: 0, // We only need top-level fields for now
        user: req.user, // Pass user for access control
      });

      if (!doc) {
        return res.status(404).json({ error: 'Document not found' });
      }

      // Determine where the layout/blocks field is.
      // This might vary based on your collection structure.
      // Common names are 'layout' or 'pageBuilder'.
      let contentBlocks;
      if (doc.layout) {
        contentBlocks = doc.layout;
      } else if (doc.pageBuilder) {
        contentBlocks = doc.pageBuilder;
      } else {
        console.warn(`No layout or pageBuilder field found for doc ${docId} in ${collectionSlug}`);
        return res.status(400).json({ error: 'No content blocks field (layout/pageBuilder) found in document' });
      }
      
      // 2. Extract text content
      const textContent = extractTextFromBlocks(contentBlocks);

      if (!textContent.trim()) {
        return res.status(400).json({ error: 'No text content found in blocks to generate SEO data.' });
      }

      // 3. Generate SEO data
      const generatedSeo = await generateSeoDataWithGemini(
        textContent,
        doc.meta?.title,
        doc.meta?.description
      );

      // 4. Update the document
      const updatedMeta = {
        ...doc.meta, // Preserve existing meta fields
      };

      if (generatedSeo.seo_metadata) {
        if (generatedSeo.seo_metadata.title) {
          updatedMeta.title = generatedSeo.seo_metadata.title;
        }
        if (generatedSeo.seo_metadata.description) {
          updatedMeta.description = generatedSeo.seo_metadata.description;
        }
        if (generatedSeo.seo_metadata.keywords && generatedSeo.seo_metadata.keywords.length > 0) {
          updatedMeta.keywords = generatedSeo.seo_metadata.keywords.join(', ');
        }
      }
      // We are not directly saving the full schema_markup object from the endpoint,
      // as the individual fields (title, desc, keywords, schemaType) are what's stored.
      // If schemaType was part of seo_metadata, it would be handled here.
      // If schema_markup itself needs to be stored, a field for it is required.
      
      await req.payload.update({
        collection: collectionSlug,
        id: docId,
        data: {
          meta: updatedMeta,
        },
        user: req.user,
      });

      return res.status(200).json({ success: true, message: 'SEO data generated and updated successfully.', meta: updatedMeta });

    } catch (error: any) {
      console.error(`Error generating SEO for ${collectionSlug} ${docId}:`, error);
      return res.status(500).json({ error: 'Failed to generate SEO data.', details: error.message });
    }
  },
};

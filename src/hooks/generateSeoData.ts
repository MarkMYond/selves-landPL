// import type { BeforeChangeHook } from 'payload/types'; // Temporarily commenting out
import { extractTextFromBlocks } from '../lib/extractTextFromBlocks';
import { generateSeoDataWithGemini } from '../lib/geminiService'; // Placeholder

// This hook will run before any document in the specified collections is changed (created or updated)
export const generateSeoDataHook: any = async ({ // Using any temporarily for the hook type
  data, // incoming data to update or create the document with
  req, // full express request
  operation, // 'create' or 'update'
  originalDoc, // original document in case of update
}: { data: any; req: any; operation: 'create' | 'update'; originalDoc?: any }) => {
  // Only proceed if we have content blocks and if SEO data is not manually filled
  // or if a specific field indicates a desire to regenerate SEO.
  // For simplicity, we'll regenerate if title or description is missing.
  const shouldGenerateSeo = 
    (operation === 'create' || operation === 'update') &&
    data.layout && 
    (!data.meta?.title || !data.meta?.description);

  if (!shouldGenerateSeo) {
    return data; // No changes needed, return original data
  }

  try {
    // 1. Extract text from content blocks
    // Ensure 'layout' is the correct field name for your blocks
    const textContent = extractTextFromBlocks(data.layout);

    if (!textContent.trim()) {
      console.warn('No text content found in blocks to generate SEO data.');
      return data;
    }

    // 2. Call Gemini (or other AI service) to generate SEO data
    // Pass existing meta title/description if they exist, so AI can potentially improve them or use as context
    const generatedSeo = await generateSeoDataWithGemini(
      textContent,
      data.meta?.title,
      data.meta?.description
    );

    // 3. Update the document's SEO fields with the generated data
    // Ensure 'meta' is the correct field name for your SEO group field
    if (!data.meta) {
      data.meta = {};
    }

    if (generatedSeo.seo_metadata) {
      if (generatedSeo.seo_metadata.title && !data.meta.title) {
        data.meta.title = generatedSeo.seo_metadata.title;
      }
      if (generatedSeo.seo_metadata.description && !data.meta.description) {
        data.meta.description = generatedSeo.seo_metadata.description;
      }
      if (generatedSeo.seo_metadata.keywords && (!data.meta.keywords || data.meta.keywords.length === 0)) {
        data.meta.keywords = generatedSeo.seo_metadata.keywords.join(', ');
      }
    }
    // schema_markup is not directly saved by this hook, only its components if needed
    
    console.log('SEO data generated and applied:', data.meta);

  } catch (error) {
    console.error('Error generating SEO data:', error);
    // Decide if you want to halt the operation or proceed without generated SEO
    // For now, we'll proceed without, but you might want to add error handling to the UI
  }

  return data; // Return the modified data
};

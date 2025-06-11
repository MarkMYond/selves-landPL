import path from 'path'; 
import { fileURLToPath } from 'url'; 
// import * as dotenv from 'dotenv'; // dotenv will be handled by the package.json script

// Environment variables should be loaded by the `dotenv -e .env --` command in package.json
// const filename = fileURLToPath(import.meta.url);
// const dirname = path.dirname(filename);
// dotenv.config({ path: path.resolve(dirname, '../../.env') });

import payload from 'payload';
import payloadConfig from '../payload.config'; // Import the payload config
import { extractTextFromBlocks } from '../lib/extractTextFromBlocks';
import { generateSeoDataWithGemini } from '../lib/geminiService';

// Helper function to simplify page titles based on specific rules
function simplifyPageTitle(originalTitle: string, webPageContent: string): string {
  const lowerTitle = originalTitle.toLowerCase();
  if (lowerTitle === 'about') return 'About Taash';
  if (lowerTitle === 'contact') return 'Contact Taash';
  if (originalTitle === '1.1 Retrospective') return 'Travel Infrastructure Retrospective'; // Keep case for specific match
  if (originalTitle === '1.1.5 Manager / Owner Key Insights') return 'Venue Owner Insights'; // Keep case

  // If title is generic (e.g., "not set", "Home", or just a number)
  if (originalTitle === 'not set' || originalTitle.toLowerCase() === 'home' || /^\d+(\.\d+)*\s*$/.test(originalTitle.trim())) {
    // Create a concise title (3-5 words) from Webpage Content
    // This is a basic heuristic; a more sophisticated summary might be needed for best results
    const words = extractTextFromBlocks([{ type: 'text', children: [{ text: webPageContent }] }]) // Simulate block structure for extraction
      .split(/\s+/)
      .filter(word => word.length > 3); // Filter out very short words
    return words.slice(0, 5).join(' ') || 'Taash Page'; // Fallback if no suitable words
  }

  // Otherwise, use the original title, possibly slightly rephrased if very long/awkward
  // For now, just return original if no specific rule matches and it's not generic
  // More sophisticated rephrasing could be added here if needed.
  return originalTitle;
}


const collectionsToProcess = ['web-pages', 'wiki-pages'];

const run = async () => {
  console.log('Initializing Payload for bulk SEO generation...');
  try {
    // Initialize Payload with the imported config
    // The 'local' property might be part of the config itself or inferred.
    // If PAYLOAD_CONFIG_PATH is set, Payload might pick it up automatically,
    // but explicitly passing the config is safer for scripts.
    await payload.init({
      config: payloadConfig,
      // local: true, // Re-add if still needed and valid with this init structure
    });
    console.log('Payload initialized.');

    for (const collectionSlug of collectionsToProcess) {
      console.log(`\nProcessing collection: ${collectionSlug}...`);
      try {
        const { docs } = await payload.find({
          collection: collectionSlug as any, // Using 'as any' for collectionSlug
          limit: 0, // Process all documents
          depth: 1, 
          pagination: false, 
        });

        console.log(`Found ${docs.length} documents in ${collectionSlug}.`);

        for (const doc of docs as any[]) { // Using 'as any[]' for docs
          const docTitle = doc.title ? `"${doc.title}"` : '(No title)';
          console.log(`  Processing [${collectionSlug}] ID: ${doc.id}, Title: ${docTitle}...`);

          let contentBlocks;
          if (doc.layout) {
            contentBlocks = doc.layout;
          } else if (doc.pageBuilder && collectionSlug === 'wiki-pages') { 
            contentBlocks = doc.pageBuilder;
          } else {
            console.warn(`    No layout or pageBuilder field found for doc ${doc.id}. Skipping.`);
            continue;
          }
          
          const textContent = extractTextFromBlocks(contentBlocks);

          if (!textContent.trim()) {
            console.warn(`    No text content found for doc ${doc.id}. Skipping.`);
            continue;
          }

          // if (doc.meta && doc.meta.title && doc.meta.description) {
          //   console.log(`    SEO data already exists for doc ${doc.id}. Skipping generation.`);
          //   continue;
          // }
          // console.log(`    Forcing SEO generation for testing for doc ${doc.id}.`); // Keep overwrite for now as per previous decision
          
          // If you want to ONLY fill empty, uncomment the block below and comment out the "Forcing..." line.
          if (doc.meta && doc.meta.title && doc.meta.description && doc.meta.jsonLD && Object.keys(doc.meta.jsonLD).length > 0 && !process.env.FORCE_SEO_GENERATION) {
            console.log(`    SEO data (title, desc, jsonLD) already exists for doc ${doc.id}. Skipping generation.`);
            continue;
          }
          if (process.env.FORCE_SEO_GENERATION) {
            console.log(`    FORCE_SEO_GENERATION is set. Forcing SEO generation for doc ${doc.id}.`);
          }
          
          try {
            const originalPageTitle = doc.meta?.title || doc.title || '';
            const simplifiedTitleForPrompt = simplifyPageTitle(originalPageTitle, textContent);
            const descriptionForPrompt = doc.meta?.description || '';

            const generatedSeo = await generateSeoDataWithGemini(
              textContent,
              simplifiedTitleForPrompt, // Pass the programmatically simplified title
              descriptionForPrompt,
              doc.slug 
            );

            const updatedMeta = { ...(doc.meta || {}) }; 
            let changed = false;

            if (generatedSeo.seo_metadata) {
              if (generatedSeo.seo_metadata.title) {
                updatedMeta.title = generatedSeo.seo_metadata.title;
                changed = true;
              }
              if (generatedSeo.seo_metadata.description) {
                updatedMeta.description = generatedSeo.seo_metadata.description;
                changed = true;
              }
              if (generatedSeo.seo_metadata.keywords && generatedSeo.seo_metadata.keywords.length > 0) {
                updatedMeta.keywords = generatedSeo.seo_metadata.keywords.join(', ');
                changed = true;
              }
            }
            
            // The old prompt asked for schemaType directly, new one nests it in schema_markup
            if (generatedSeo.schema_markup && generatedSeo.schema_markup['@type']) {
              updatedMeta.schemaType = generatedSeo.schema_markup['@type'];
              changed = true;
            }
            
            // If you add a jsonLD field to your seoField definition, you can save the full schema_markup:
            if (generatedSeo.schema_markup) {
              updatedMeta.jsonLD = generatedSeo.schema_markup; // Save the full schema_markup object
              changed = true;
            }

            if (changed) {
              await payload.update({
                collection: collectionSlug as any, // Using 'as any' for collectionSlug
                id: doc.id,
                data: {
                  meta: updatedMeta,
                },
              });
              console.log(`    Successfully generated and updated SEO for doc ${doc.id}.`);
            } else {
              console.log(`    No new SEO data to update for doc ${doc.id}.`);
            }
          } catch (genError) {
            console.error(`    Error generating/updating SEO for doc ${doc.id}:`, genError);
          }
        }
      } catch (collectionError) {
        console.error(`Error processing collection ${collectionSlug}:`, collectionError);
      }
    }
  } catch (initError) {
    console.error('Error initializing Payload:', initError);
  } finally {
    console.log('\nBulk SEO generation process finished.');
    process.exit(0);
  }
};

run();

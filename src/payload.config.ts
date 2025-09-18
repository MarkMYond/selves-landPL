import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, type Payload } from 'payload' // Added Payload type
import type { PayloadRequest } from 'payload/types'; 
import { fileURLToPath } from 'url'
// Removed Express types as Payload CMS 3.x endpoints don't use Express res/next
import sharp from 'sharp'
// import { Endpoint } from 'payload/config'; // Not used directly, but for type reference

import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { createDigitalOceanAdapter } from './lib/digitalOceanAdapter'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Hotels from './collections/Hotels'
import Restaurants from './collections/Restaurants'
import Experiences from './collections/Experiences'
import Categories from './collections/Categories'
import WebPages from './collections/WebPages'
import WikiPages from './collections/WikiPages'
import RegistryPages from './collections/RegistryPages'
import NavigationCache from './collections/NavigationCache'
import PageTemplate from './collections/PageTemplate'

import Footer from './globals/Footer'

import { generateSeoEndpoint } from './endpoints/generate-seo'; // Import the new endpoint
import roomEndpoint from './endpoints/room'; // Import the room endpoint

import ContentBlock from './blocks/ContentBlock';
import { FeatureSectionBlock } from './blocks/FeatureSectionBlock';
import { PricingPlansBlock } from './blocks/PricingPlansBlock';
import { BrandLogos } from './blocks/BrandLogos';
import { FaqSectionBlock } from './blocks/FaqSection';
import { DashboardSectionBlock } from './blocks/DashboardSection';
import { IntegrationsSection } from './blocks/IntegrationsSection';
import { TestimonialsSection } from './blocks/TestimonialsSection';
import { FeaturesWithIntroSectionBlock } from './blocks/FeaturesWithIntroSectionBlock';
import { Hero02Block } from './blocks/Hero02Block';
import { WhyChooseUsSectionBlock } from './blocks/WhyChooseUsSectionBlock';
import { RecentArticlesBlock } from './blocks/RecentArticlesBlock';
import { ContactFormBlock } from './blocks/ContactFormBlock';

const AllBlocks = [
  ContentBlock,
  FeatureSectionBlock,
  PricingPlansBlock,
  BrandLogos,
  FaqSectionBlock,
  DashboardSectionBlock, // Changed DashboardSection to DashboardSectionBlock
  IntegrationsSection,
  TestimonialsSection,
  FeaturesWithIntroSectionBlock,
  Hero02Block,
  WhyChooseUsSectionBlock,
  RecentArticlesBlock,
  ContactFormBlock,
];

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Hotels, Restaurants, Experiences, Categories, WebPages, WikiPages, RegistryPages, NavigationCache, PageTemplate],
  globals: [Footer],
  editor: lexicalEditor(),
  blocks: AllBlocks,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    // Generate types locally for Payload to avoid pulling the frontend types into Next's TS program
    outputFile: path.resolve(dirname, './payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: createDigitalOceanAdapter({
            region: 'ams3',
            endpoint: 'ams3.digitaloceanspaces.com',
            bucket: 'yond',
            prefix: 'tash-payload',
          }),
          disableLocalStorage: true,
        },
      },
    }),
  ],
  endpoints: [
    {
      path: '/get-wiki-nav-tree',
      method: 'get',
      handler: async (req: PayloadRequest): Promise<Response> => {
        try {
          const navCache = await req.payload.find({
            collection: 'navigation-cache',
            where: { section: { equals: 'wiki' } },
            limit: 1,
            depth: 0,
          });

          if (navCache.docs.length > 0 && navCache.docs[0].navigationData) {
            return new Response(JSON.stringify(navCache.docs[0].navigationData), {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
              },
            });
          }
          
          return new Response(
            JSON.stringify({ error: 'Wiki navigation cache not found or data is empty.' }),
            {
              status: 404,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        } catch (err) {
          let errorMessage = 'An unknown error occurred while fetching navigation cache.';
          let errorDetails: any = err;

          if (err instanceof Error) {
            errorMessage = err.message;
            errorDetails = { name: err.name, message: err.message, stack: err.stack };
          } else if (typeof err === 'string') {
            errorMessage = err;
          }

          if (req.payload && req.payload.logger) {
            req.payload.logger.error({
              msg: `Error in /get-wiki-nav-tree endpoint: ${errorMessage}`,
              error: errorDetails,
            });
          } else {
            console.error(`Error in /get-wiki-nav-tree endpoint: ${errorMessage}`, errorDetails);
          }
          
          return new Response(
            JSON.stringify({ 
              error: 'Internal server error while fetching navigation.', 
              details: errorMessage 
            }),
            {
              status: 500,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        }
      },
    },
    generateSeoEndpoint, // Add the new endpoint here
    roomEndpoint, // Add the room endpoint
  ],
  cors: (
    process.env.PAYLOAD_ALLOWED_ORIGINS
      ? process.env.PAYLOAD_ALLOWED_ORIGINS.split(',').map(o => o.trim()).filter(Boolean)
      : [
          'http://localhost:3000',
          'http://localhost:3001',
          'https://selves.uk',
          'https://www.selves.uk',
          process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3333',
        ]
  ),
  csrf: (
    process.env.PAYLOAD_CSRF_ORIGINS
      ? process.env.PAYLOAD_CSRF_ORIGINS.split(',').map(o => o.trim()).filter(Boolean)
      : [
          'http://localhost:3000',
          'http://localhost:3001',
          'https://selves.uk',
          'https://www.selves.uk',
          process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3333',
        ]
  ),
})

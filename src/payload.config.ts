import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { createDigitalOceanAdapter } from './lib/digitalOceanAdapter'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Categories from './collections/Categories'
import WebPages from './collections/WebPages'
import WikiPages from './collections/WikiPages'
import RegistryPages from './collections/RegistryPages'
import NavigationCache from './collections/NavigationCache'

import Footer from './globals/Footer'

import ContentBlock from './blocks/ContentBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { FeatureSectionBlock } from './blocks/FeatureSectionBlock';
import { ClientLogosBlock } from './blocks/ClientLogosBlock';
import { SolutionsListBlock } from './blocks/SolutionsListBlock';
import { AiSupportSectionBlock } from './blocks/AiSupportSectionBlock';
import { SupportNinjaSectionBlock } from './blocks/SupportNinjaSectionBlock';
import { TextImageSectionBlock } from './blocks/TextImageSectionBlock';
import { ApproachTabsBlock } from './blocks/ApproachTabsBlock';
import { CustomizedApproachBlock } from './blocks/CustomizedApproachBlock';
import { CaseStudySectionBlock } from './blocks/CaseStudySectionBlock';
import { CtaSectionBlock } from './blocks/CtaSectionBlock';
import { ProductFeaturesBlock } from './blocks/ProductFeaturesBlock';
import { SectorsSectionBlock } from './blocks/SectorsSectionBlock';
import { ScheduleCallBlock } from './blocks/ScheduleCallBlock';
import { PricingPlansBlock } from './blocks/PricingPlansBlock';
import { Home03Hero } from './blocks/Home03Hero';
import { BrandLogos } from './blocks/BrandLogos';
import { BenefitsSectionBlock } from './blocks/BenefitsSection';
import { FaqSectionBlock } from './blocks/FaqSection';
import { DashboardSectionBlock } from './blocks/DashboardSection';
import { WhatMakesUsDifferentSection } from './blocks/WhatMakesUsDifferentSection';
import { IntegrationsSection } from './blocks/IntegrationsSection';
import { TestimonialsSection } from './blocks/TestimonialsSection';
import { FeaturesWithIntroSectionBlock } from './blocks/FeaturesWithIntroSectionBlock';
import { Hero02Block } from './blocks/Hero02Block';
import { WhyChooseUsSectionBlock } from './blocks/WhyChooseUsSectionBlock';
import { HeroBlogCardBlock } from './blocks/HeroBlogCardBlock';
import { RecentArticlesBlock } from './blocks/RecentArticlesBlock';
import { ContactFormBlock } from './blocks/ContactFormBlock';

const AllBlocks = [
  ContentBlock,
  ImageBlock,
  FeatureSectionBlock,
  ClientLogosBlock,
  SolutionsListBlock,
  AiSupportSectionBlock,
  SupportNinjaSectionBlock,
  TextImageSectionBlock,
  ApproachTabsBlock,
  CustomizedApproachBlock,
  CaseStudySectionBlock,
  CtaSectionBlock,
  ProductFeaturesBlock,
  SectorsSectionBlock,
  ScheduleCallBlock,
  PricingPlansBlock,
  Home03Hero,
  BrandLogos,
  BenefitsSectionBlock,
  FaqSectionBlock,
  DashboardSectionBlock, // Changed DashboardSection to DashboardSectionBlock
  WhatMakesUsDifferentSection,
  IntegrationsSection,
  TestimonialsSection,
  FeaturesWithIntroSectionBlock,
  Hero02Block,
  WhyChooseUsSectionBlock,
  HeroBlogCardBlock,
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
  collections: [Users, Media, Categories, WebPages, WikiPages, RegistryPages, NavigationCache],
  globals: [Footer],
  editor: lexicalEditor(),
  blocks: AllBlocks,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, '../../frontend/src/payload-types.ts'),
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
  cors: [
    'http://localhost:3000',
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3333',
    'https://taash-payld.vercel.app',
    'https://fetest-bay.vercel.app',
    'https://frontend-cyan-nine-80.vercel.app',
    'https://taash.ai',
    '*',
  ],
  csrf: [
    'http://localhost:3000',
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3333',
    'https://taash-payld.vercel.app',
    'https://fetest-bay.vercel.app',
    'https://frontend-cyan-nine-80.vercel.app',
    'https://taash.ai',
  ],
})

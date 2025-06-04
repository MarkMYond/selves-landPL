import type { CollectionConfig } from 'payload';
import { slugField } from '../fields/slug';
import { seoField } from '../fields/seo';

// Import Blocks
import ContentBlock from '../blocks/ContentBlock'; // Default import
import { ImageBlock } from '../blocks/ImageBlock';
import { FeatureSectionBlock } from '../blocks/FeatureSectionBlock';
import { ClientLogosBlock } from '../blocks/ClientLogosBlock';
import { SolutionsListBlock } from '../blocks/SolutionsListBlock';
import { AiSupportSectionBlock } from '../blocks/AiSupportSectionBlock';
import { SupportNinjaSectionBlock } from '../blocks/SupportNinjaSectionBlock';
import { TextImageSectionBlock } from '../blocks/TextImageSectionBlock';
import { ApproachTabsBlock } from '../blocks/ApproachTabsBlock';
import { CustomizedApproachBlock } from '../blocks/CustomizedApproachBlock';
import { CaseStudySectionBlock } from '../blocks/CaseStudySectionBlock';
import { TemplateSectionBlock } from '../blocks/TemplateSectionBlock';
import { RelatedTemplateSectionBlock } from '../blocks/RelatedTemplateSectionBlock';
import { CtaSectionBlock } from '../blocks/CtaSectionBlock';
import { NewTemplatesSectionBlock } from '../blocks/NewTemplatesSectionBlock';
import { ProductFeaturesBlock } from '../blocks/ProductFeaturesBlock';
import { SectorsSectionBlock } from '../blocks/SectorsSectionBlock';
import { ScheduleCallBlock } from '../blocks/ScheduleCallBlock';
import { PricingPlansBlock } from '../blocks/PricingPlansBlock';
import { TravelersBlock } from '../blocks/TravelersBlock';
import { Home03Hero } from '../blocks/Home03Hero';
import { BrandLogos } from '../blocks/BrandLogos';
import { BenefitsSectionBlock } from '../blocks/BenefitsSection';
import { FaqSectionBlock } from '../blocks/FaqSection';
import { DashboardSectionBlock } from '../blocks/DashboardSection';
import { WhatMakesUsDifferentSection } from '../blocks/WhatMakesUsDifferentSection';
import { IntegrationsSection } from '../blocks/IntegrationsSection';
import { TestimonialsSection } from '../blocks/TestimonialsSection';
import { FeaturesWithIntroSectionBlock } from '../blocks/FeaturesWithIntroSectionBlock';
import { Hero02Block } from '../blocks/Hero02Block'; // Added import
import { WhyChooseUsSectionBlock } from '../blocks/WhyChooseUsSectionBlock';
import { HeroBlogCardBlock } from '../blocks/HeroBlogCardBlock';
import { RecentArticlesBlock } from '../blocks/RecentArticlesBlock';
import { ContactFormBlock } from '../blocks/ContactFormBlock'; // Added import

const AllWebPageBlocks = [
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
  TemplateSectionBlock,
  RelatedTemplateSectionBlock,
  CtaSectionBlock,
  NewTemplatesSectionBlock,
  ProductFeaturesBlock,
  SectorsSectionBlock,
  ScheduleCallBlock,
  PricingPlansBlock,
  TravelersBlock,
  Home03Hero,
  BrandLogos,
  BenefitsSectionBlock,
  FaqSectionBlock,
  DashboardSectionBlock,
  WhatMakesUsDifferentSection,
  IntegrationsSection,
  TestimonialsSection,
  FeaturesWithIntroSectionBlock,
  Hero02Block, // Added block
  WhyChooseUsSectionBlock,
  HeroBlogCardBlock,
  RecentArticlesBlock,
  ContactFormBlock, // Added to this specific list for WebPages
];

const WebPages: CollectionConfig = {
  slug: 'web-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'General website pages (e.g., Homepage).',
    group: 'Content Management',
    preview: (doc: any) => { 
      // Basic preview link, assuming slug is used directly.
      // This might need adjustment based on frontend routing.
      const baseUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'; // Default to common dev port
      if (doc?.slug === 'home') {
        return baseUrl;
      }
      return doc?.slug ? `${baseUrl}/${doc.slug}` : null;
    },
  },
  access: {
    read: () => true, 
  },
  fields: [
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
    },
    slugField('title'), // Uses the title field to generate the slug
    seoField(), // Adds SEO metadata group
    {
      name: 'layout',
      label: 'Page Layout',
      type: 'blocks',
      minRows: 1,
      blocks: AllWebPageBlocks,
      required: true,
    },
  ],
  timestamps: true,
  versions: false, // Keep versions disabled
};

export default WebPages;

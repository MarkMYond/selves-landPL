import type { CollectionConfig } from 'payload';
// import { generateSeoDataHook } from '../hooks/generateSeoData'; // Removing hook
// import GenerateSeoButton from '../admin/components/GenerateSeoButton'; // Removing custom button import
import { slugField } from '../fields/slug';
import { seoField } from '../fields/seo';

import ContentBlock from '../blocks/ContentBlock';
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
import { CtaSectionBlock } from '../blocks/CtaSectionBlock';
import { ProductFeaturesBlock } from '../blocks/ProductFeaturesBlock';
import { SectorsSectionBlock } from '../blocks/SectorsSectionBlock';
import { ScheduleCallBlock } from '../blocks/ScheduleCallBlock';
import { PricingPlansBlock } from '../blocks/PricingPlansBlock';
import { Home03Hero } from '../blocks/Home03Hero';
import { BrandLogos } from '../blocks/BrandLogos';
import { BenefitsSectionBlock } from '../blocks/BenefitsSection';
import { FaqSectionBlock } from '../blocks/FaqSection';
import { DashboardSectionBlock } from '../blocks/DashboardSection';
import { WhatMakesUsDifferentSection } from '../blocks/WhatMakesUsDifferentSection';
import { IntegrationsSection } from '../blocks/IntegrationsSection';
import { TestimonialsSection } from '../blocks/TestimonialsSection';
import { FeaturesWithIntroSectionBlock } from '../blocks/FeaturesWithIntroSectionBlock';
import { Hero02Block } from '../blocks/Hero02Block';
import { WhyChooseUsSectionBlock } from '../blocks/WhyChooseUsSectionBlock';
import { HeroBlogCardBlock } from '../blocks/HeroBlogCardBlock';
import { RecentArticlesBlock } from '../blocks/RecentArticlesBlock';
import { ContactFormBlock } from '../blocks/ContactFormBlock';

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
  CtaSectionBlock,
  ProductFeaturesBlock,
  SectorsSectionBlock,
  ScheduleCallBlock,
  PricingPlansBlock,
  Home03Hero,
  BrandLogos,
  BenefitsSectionBlock,
  FaqSectionBlock,
  DashboardSectionBlock,
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

const WebPages: CollectionConfig = {
  slug: 'web-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'General website pages (e.g., Homepage).',
    group: 'Content Management',
    // components: { // Removing custom button component
    //   views: {
    //     edit: { 
    //       Header: {
    //         Component: GenerateSeoButton, 
    //       },
    //     }
    //   }
    // },
    preview: (doc: any) => {
      const baseUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000';
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
    slugField('title'),
    seoField(),
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
  versions: false,
  // hooks: { // Removing hook
  //   beforeChange: [generateSeoDataHook],
  // },
};

export default WebPages;

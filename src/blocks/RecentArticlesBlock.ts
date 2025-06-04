import type { Block } from 'payload'
import { linkField } from '../fields/linkField' // Assuming linkField is in ../fields

// Define an array of color options that can be mapped to Tailwind classes in the frontend component
// Copied from TestimonialsSection.ts for consistency
const eyebrowBgColorOptions = [
  { label: 'Theme Color 1 (Purple)', value: 'theme-color-01' },
  { label: 'Theme Color 2 (Green)', value: 'theme-color-02' },
  { label: 'Theme Color 3 (Blue)', value: 'theme-color-03' },
  { label: 'Theme Color 4 (Yellow)', value: 'theme-color-04' },
  { label: 'Purple', value: 'purple' }, // Mapped to theme-color-01 in frontend
  { label: 'Green', value: 'green' },   // Mapped to theme-color-03 in frontend
  { label: 'Yellow', value: 'yellow' }, // Mapped to theme-color-04 in frontend
  { label: 'Purple Light', value: 'purple-light' }, // Mapped to theme-color-01
  { label: 'Default (Theme Color 2)', value: 'default' } // Default for eyebrows often theme-color-02
];

export const RecentArticlesBlock: Block = {
  slug: 'RecentArticles',
  interfaceName: 'RecentArticlesBlock',
  labels: {
    singular: 'Recent Articles Section',
    plural: 'Recent Articles Sections',
  },
  fields: [
    {
      name: 'eyebrowText',
      label: 'Eyebrow Text',
      type: 'text',
      defaultValue: 'Blogs & Articles',
    },
    {
      name: 'eyebrowBackgroundColor',
      label: 'Section Eyebrow Background Color',
      type: 'select',
      options: eyebrowBgColorOptions,
      defaultValue: 'default', // Will map to theme-color-02 in frontend
    },
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      required: true,
      defaultValue: 'Read our recent articles',
    },
    {
      name: 'subTitle',
      label: 'Section Subtitle',
      type: 'textarea',
      defaultValue: "For any unanswered questions, reach out to our support team via email. We'll respond as soon as possible to assist you.",
    },
    {
      name: 'articles',
      label: 'Article Cards',
      type: 'array',
      minRows: 1,
      maxRows: 3, // Based on typical "recent articles" sections, can be adjusted
      labels: {
        singular: 'Article Card',
        plural: 'Article Cards',
      },
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'eyebrowText', 
          label: 'Article Eyebrow Text', 
          type: 'text', 
          admin: {
            description: 'Small text displayed above the article title, styled as a pill (e.g., date or category).',
          }
        },
        {
          name: 'articleEyebrowBackgroundColor',
          label: 'Article Eyebrow Background Color',
          type: 'select',
          options: eyebrowBgColorOptions,
          defaultValue: 'default',
        },
        {
          name: 'articleTitle',
          label: 'Article Title',
          type: 'text',
          required: true,
        },
        {
          name: 'articleExcerpt',
          label: 'Article Excerpt',
          type: 'textarea',
          required: true,
        },
        {
          name: 'buttonText',
          label: 'Button Text',
          type: 'text',
          defaultValue: 'Read full blog',
          required: true,
        },
        linkField({ // Using the imported linkField for the button's link
          name: 'buttonLinkDetails', // Group name for link properties
          label: 'Button Link Details',
          // Make the inner 'label' field of linkField optional as buttonText is primary
          fields: [ 
            {
              name: 'type', label: 'Link Type', type: 'radio',
              options: [{ label: 'Internal Link', value: 'internal' }, { label: 'External URL', value: 'external' }],
              defaultValue: 'internal', admin: { layout: 'horizontal' },
            },
            { name: 'label', label: 'Link Accessible Name (Optional)', type: 'text', required: false },
            { 
              name: 'internalLink', label: 'Internal Link', type: 'relationship', relationTo: ['web-pages'], // or a 'blogPosts' collection if it exists
              hasMany: false, admin: { condition: (_: any, siblingData: any) => siblingData?.type === 'internal' } 
            },
            { 
              name: 'externalLink', label: 'External URL', type: 'text', 
              admin: { condition: (_: any, siblingData: any) => siblingData?.type === 'external' } 
            },
            { name: 'newTab', label: 'Open in new tab', type: 'checkbox', defaultValue: false },
          ]
        }),
      ],
    },
  ],
}

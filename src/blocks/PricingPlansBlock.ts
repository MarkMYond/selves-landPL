import type { Block, Field } from 'payload'

// Reusable color options (can be imported from a shared file if used in many blocks)
const sectionColorOptions: { label: string; value: string }[] = [
  { label: 'White', value: 'white' },
  { label: 'Light Grey', value: 'light-grey' },
  { label: 'Brand 50 (Lightest Brand)', value: 'brand-50' },
  { label: 'Brand 900 (Darkest Brand)', value: 'brand-900' },
  { label: 'Brand Primary', value: 'brand-primary' },
];

// Options for card background colors (could be text if more flexibility is needed)
const cardBgColorOptions: { label: string; value: string }[] = [
    { label: 'White', value: 'bg-white' },
    { label: 'Light Grey', value: 'bg-light-grey' },
    { label: 'Sand', value: 'bg-sand' }, // Example, assuming 'bg-sand' is a defined Tailwind class
    { label: 'Brand 50', value: 'bg-brand-50' },
];

export const PricingPlansBlock: Block = {
  slug: 'pricingPlans', 
  interfaceName: 'PricingPlansBlock', 
  fields: [
    // Top-level fields for the block (title, CTA, background, padding)
    {
      name: 'eyebrowText', // Added eyebrowText
      label: 'Section Eyebrow Text',
      type: 'text',
    },
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      defaultValue: 'Plans for every stage of your company',
    },
    {
      name: 'mainCtaText',
      label: 'Main CTA Button Text',
      type: 'text',
      defaultValue: 'Get Started',
    },
    {
      name: 'mainCtaLink',
      label: 'Main CTA Button Link',
      type: 'text',
      defaultValue: '/contact-us',
    },
    {
      name: 'mainCtaStyle',
      label: 'Main CTA Button Style',
      type: 'select',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
      ],
      defaultValue: 'primary',
    },
    {
      name: 'sectionBackgroundColor',
      label: 'Section Background Color',
      type: 'select',
      options: sectionColorOptions,
      defaultValue: 'white',
    },
    {
      name: 'removeTopPadding',
      label: 'Remove Top Padding',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'removeBottomPadding',
      label: 'Remove Bottom Padding',
      type: 'checkbox',
      defaultValue: false,
    },
    // Plans definition (up to 3 plans)
    {
      name: 'plans',
      label: 'Pricing Plans (Define up to 3)',
      type: 'array',
      minRows: 1,
      maxRows: 3, 
      fields: [
        {
          name: 'name',
          label: 'Plan Name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Plan Description',
          type: 'textarea',
        },
        {
          name: 'monthlyPrice',
          label: 'Monthly Price (e.g., $29, POA)',
          type: 'text',
        },
        {
          name: 'annualPrice',
          label: 'Annual Price (e.g., $290, Optional)',
          type: 'text',
        },
        {
          name: 'priceSuffix',
          label: 'Price Suffix (e.g., /month, /user/month)',
          type: 'text',
          defaultValue: '/month',
        },
        {
          name: 'cardBackgroundColor',
          label: 'Card Background Color',
          type: 'select', // Or 'text' if users should input Tailwind classes directly
          options: cardBgColorOptions,
          defaultValue: 'bg-white',
          admin: {
            description: 'Select a background color for this plan card. Ensure the Tailwind class exists.',
          }
        },
        {
          name: 'ctaButtonLabel',
          label: 'CTA Button Label',
          type: 'text',
          defaultValue: 'Get Started',
        },
        {
          name: 'ctaButtonLink',
          label: 'CTA Button Link URL',
          type: 'text',
          defaultValue: '/contact-us',
        },
        {
          name: 'isMostPopular',
          label: 'Is this the most popular plan?',
          type: 'checkbox',
          defaultValue: false,
        },
        // Individual features array per plan is removed from here.
      ],
    },
    // Shared features list for comparison
    {
      name: 'sharedFeatures',
      label: 'Shared Features List (for comparison table and plan cards)',
      type: 'array',
      fields: [
        {
          name: 'featureName',
          label: 'Feature Name',
          type: 'text',
          required: true,
        },
        {
          name: 'plan1Availability',
          label: 'Plan 1 Availability',
          type: 'select',
          options: [
            { label: 'Included (Checkmark)', value: 'included' },
            { label: 'Not Included (Minus/Cross)', value: 'not_included' },
            { label: 'Custom Text', value: 'custom' },
          ],
          defaultValue: 'not_included',
        },
        {
          name: 'plan1CustomText',
          label: 'Plan 1 Custom Text (if "Custom Text" selected)',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData.plan1Availability === 'custom',
          },
        },
        {
          name: 'plan2Availability',
          label: 'Plan 2 Availability',
          type: 'select',
          options: [
            { label: 'Included (Checkmark)', value: 'included' },
            { label: 'Not Included (Minus/Cross)', value: 'not_included' },
            { label: 'Custom Text', value: 'custom' },
          ],
          defaultValue: 'not_included',
        },
        {
          name: 'plan2CustomText',
          label: 'Plan 2 Custom Text',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData.plan2Availability === 'custom',
          },
        },
        {
          name: 'plan3Availability',
          label: 'Plan 3 Availability',
          type: 'select',
          options: [
            { label: 'Included (Checkmark)', value: 'included' },
            { label: 'Not Included (Minus/Cross)', value: 'not_included' },
            { label: 'Custom Text', value: 'custom' },
          ],
          defaultValue: 'not_included',
        },
        {
          name: 'plan3CustomText',
          label: 'Plan 3 Custom Text',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData.plan3Availability === 'custom',
          },
        },
        {
          name: 'tooltip',
          label: 'Tooltip/Info Text (Optional)',
          type: 'text',
          admin: {
            description: 'Short explanation for the feature, shown on hover or info icon.'
          }
        }
      ],
    },
    // Fields for the "Compare Plans" table title section (optional)
    {
      name: 'compareTableTitle',
      label: 'Compare Table Section Title',
      type: 'text',
      defaultValue: 'Compare our plans',
    },
    {
      name: 'compareTableDescription',
      label: 'Compare Table Section Description',
      type: 'textarea',
    },
  ],
};

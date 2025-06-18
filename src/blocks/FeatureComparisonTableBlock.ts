import type { Block, Field } from 'payload';

const sectionColorOptions: { label: string; value: string }[] = [
  { label: 'White', value: 'white' },
  { label: 'Light Grey', value: 'light-grey' },
  { label: 'Theme Color 1 (Lavender)', value: 'brand-50' }, // Updated label for brand-50
  { label: 'Brand 900 (Darkest Brand)', value: 'brand-900' },
  { label: 'Brand Primary', value: 'brand-primary' },
];

export const FeatureComparisonTableBlock: Block = {
  slug: 'featureComparisonTable',
  interfaceName: 'FeatureComparisonTableBlock',
  fields: [
    {
      name: 'eyebrowText',
      label: 'Section Eyebrow Text',
      type: 'text',
    },
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      defaultValue: 'Compare Our Plans',
    },
    {
      name: 'description',
      label: 'Section Description',
      type: 'textarea',
    },
    {
      name: 'headerImage',
      label: 'Header Image (Optional)',
      type: 'upload',
      relationTo: 'media',
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
    {
      name: 'planHeaders',
      label: 'Plan Headers for Table (Define up to 3)',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'name',
          label: 'Plan Name for Header',
          type: 'text',
          required: true,
        },
        {
          name: 'isMostPopular', // To allow highlighting a column
          label: 'Is this the most popular plan column?',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'sharedFeatures',
      label: 'Shared Features List',
      type: 'array',
      fields: [
        {
          name: 'featureName',
          label: 'Feature Name',
          type: 'text',
          required: true,
        },
        // Availability for up to 3 plans, matching the maxRows of planHeaders
        {
          name: 'plan1Availability',
          label: 'Plan 1 Column Availability',
          type: 'select',
          options: [
            { label: 'Included (Checkmark)', value: 'included' },
            { label: 'Not Included (Minus/Cross)', value: 'not_included' },
            { label: 'Custom Text', value: 'custom' },
          ],
          defaultValue: 'not_included',
          admin: {
            description: 'Corresponds to the first plan defined in Plan Headers.',
          },
        },
        {
          name: 'plan1CustomText',
          label: 'Plan 1 Column Custom Text',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData.plan1Availability === 'custom',
          },
        },
        {
          name: 'plan2Availability',
          label: 'Plan 2 Column Availability',
          type: 'select',
          options: [
            { label: 'Included (Checkmark)', value: 'included' },
            { label: 'Not Included (Minus/Cross)', value: 'not_included' },
            { label: 'Custom Text', value: 'custom' },
          ],
          defaultValue: 'not_included',
          admin: {
            description: 'Corresponds to the second plan defined in Plan Headers (if it exists).',
          },
        },
        {
          name: 'plan2CustomText',
          label: 'Plan 2 Column Custom Text',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData.plan2Availability === 'custom',
          },
        },
        {
          name: 'plan3Availability',
          label: 'Plan 3 Column Availability',
          type: 'select',
          options: [
            { label: 'Included (Checkmark)', value: 'included' },
            { label: 'Not Included (Minus/Cross)', value: 'not_included' },
            { label: 'Custom Text', value: 'custom' },
          ],
          defaultValue: 'not_included',
          admin: {
            description: 'Corresponds to the third plan defined in Plan Headers (if it exists).',
          },
        },
        {
          name: 'plan3CustomText',
          label: 'Plan 3 Column Custom Text',
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
            description: 'Short explanation for the feature, shown on hover or info icon.',
          },
        },
      ],
    },
  ],
};

import type { Block } from 'payload'

// Define an array of color options that can be mapped to Tailwind classes in the frontend component
const logoBgColorOptions = [
  { label: 'Theme Color 1 (Purple)', value: 'theme-color-01' }, // e.g., bg-purple-100 or a custom var
  { label: 'Theme Color 2 (Green)', value: 'theme-color-02' }, // e.g., bg-green-100
  { label: 'Theme Color 3 (Blue)', value: 'theme-color-03' },   // e.g., bg-blue-100
  { label: 'Theme Color 4 (Yellow)', value: 'theme-color-04' }, // e.g., bg-yellow-100
  { label: 'Purple', value: 'purple' },                       // e.g., bg-purple-500
  { label: 'Green', value: 'green' },                         // e.g., bg-green-500
  { label: 'Yellow', value: 'yellow' },                       // e.g., bg-yellow-500
  { label: 'Purple Light', value: 'purple-light' },           // e.g., bg-purple-200 (for bg-purple-2)
  { label: 'Default (Light Gray)', value: 'default' }
];

export const IntegrationsSection: Block = {
  slug: 'integrationsSection',
  labels: {
    singular: 'Integrations Section',
    plural: 'Integrations Sections',
  },
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow Text',
      type: 'text',
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'titleImage',
      label: 'Title Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logos',
      label: 'Integration Logos',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'logoImage',
          label: 'Logo Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'altText',
          label: 'Alt Text',
          type: 'text',
        },
        {
          name: 'backgroundColorClass',
          label: 'Logo Background Color',
          type: 'select',
          options: logoBgColorOptions,
          defaultValue: 'default',
        }
      ],
    },
    {
      name: 'button',
      label: 'Button',
      type: 'group',
      fields: [
        {
          name: 'text',
          label: 'Button Text',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'Button URL',
          type: 'text',
          required: true,
        },
        {
          name: 'variant',
          label: 'Button Variant',
          type: 'select',
          options: [
            { label: 'Border (Default)', value: 'border' },
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Tertiary', value: 'tertiary' },
          ],
          defaultValue: 'border',
        }
      ]
    },
  ],
}

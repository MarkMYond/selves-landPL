import type { Block, Field } from 'payload' // Import Field

const colorOptions: { label: string; value: string }[] = [
  { label: 'White', value: 'white' },
  { label: 'Light Grey', value: 'light-grey' },
  { label: 'Brand 50', value: 'brand-50' },
  { label: 'Brand 900', value: 'brand-900' },
  { label: 'Brand Primary', value: 'brand-primary' },
];

const containerWidthOptions: { label: string; value: string }[] = [
  { label: 'Default (1140px)', value: 'default' },
  { label: 'Medium (max-w-5xl)', value: 'medium' },
  { label: 'Wide (max-w-7xl)', value: 'wide' },
  { label: 'Full Width', value: 'full' },
];

export const SectorsSectionBlock: Block = {
  slug: 'sectorsSection',
  interfaceName: 'SectorsSectionBlockPayload', // To avoid potential conflict with Vue prop type name
  fields: [
    {
      name: 'sectionBackgroundColor',
      label: 'Section Background Color',
      type: 'select',
      options: colorOptions,
      defaultValue: 'white',
      admin: {
        description: 'Controls the overall background color of the section.',
      },
    },
    {
      name: 'contentBackgroundColor',
      label: 'Content Area Background Color',
      type: 'select',
      options: colorOptions,
      defaultValue: 'white',
      admin: {
        description: 'Controls the background color of the inner content area (within padding).',
      },
    },
    {
      name: 'containerWidth',
      label: 'Container Width',
      type: 'select',
      options: containerWidthOptions,
      defaultValue: 'default',
      admin: {
        description: 'Sets the maximum width of the content container.',
      },
    },
    {
      name: 'content',
      label: 'Header Content',
      type: 'group',
      fields: [
        { name: 'superTitle', type: 'text', label: 'Super Title (Optional)' },
        { name: 'title', type: 'text', label: 'Main Title (Optional)' },
        { name: 'description', type: 'textarea', label: 'Description (Optional)' },
        { name: 'ctaText', type: 'text', label: 'CTA Text (Optional)' },
        { name: 'ctaUrl', type: 'text', label: 'CTA URL (Optional)' },
      ],
    },
    {
      name: 'sectors',
      label: 'Sectors List',
      type: 'array',
      minRows: 0, // Allow zero sectors
      fields: [
        { name: 'title', type: 'text', label: 'Sector Title', required: true },
        { 
          name: 'image', 
          type: 'upload', 
          relationTo: 'media', // Assuming 'media' is the slug of your media collection
          label: 'Sector Image (Optional)',
        },
        { 
          name: 'iconName', 
          type: 'text', 
          label: 'Icon Name (Optional, e.g., for Phosphor icons)',
          admin: {
            description: 'Enter the name of the icon to display (if image is not used or as an overlay).'
          }
        },
        {
          name: 'backgroundColor',
          label: 'Card Background Color',
          type: 'select',
          options: [ // Options from WikiPages.ts backgroundOverlay
            { label: 'White', value: 'white' },
            { label: 'Default (Transparent/Inherit)', value: 'default' }, // Added a default
            { label: 'None / Default Gradient', value: 'default-gradient' },
            { label: 'Primary 25', value: 'primary-25' },
            { label: 'Primary 50', value: 'primary-50' },
            { label: 'Primary 100', value: 'primary-100' },
            { label: 'Primary 200', value: 'primary-200' },
            { label: 'Primary 300', value: 'primary-300' },
            { label: 'Primary 400', value: 'primary-400' },
            { label: 'Primary 500', value: 'primary-500' },
            { label: 'Primary 600', value: 'primary-600' },
            { label: 'Primary 700', value: 'primary-700' },
            { label: 'Primary 800', value: 'primary-800' },
            { label: 'Primary 900', value: 'primary-900' },
            { label: 'Primary 950', value: 'primary-950' },
            { label: 'Sand', value: 'sand' },
            { label: 'Pink', value: 'pink-light' },
            { label: 'Coral', value: 'coral-light' },
            { label: 'Pink (Mid)', value: 'pink-mid' },
            { label: 'Purple', value: 'purple-light' },
            { label: 'Blue', value: 'blue-light' },
            { label: 'Aqua', value: 'aqua-light' },
            { label: 'Green', value: 'green-light' },
            { label: 'Light Green', value: 'light-green' },
            { label: 'Grass', value: 'grass-light' },
            { label: 'Light Grey', value: 'light-grey' },
            { label: 'Navy', value: 'navy-dark' },
          ],
          defaultValue: 'default',
          admin: {
            description: 'Select a background color for the sector card.',
          },
        },
        { name: 'href', type: 'text', label: 'Link URL (Optional)', defaultValue: '#' },
      ],
    },
  ],
}

import type { Block, Field } from 'payload' // Ensure Field is imported if used for options

// Define options arrays if they are specific to this block, otherwise they could be imported
const colorOptions: { label: string; value: string }[] = [
  { label: 'White', value: 'white' },
  { label: 'Light Grey', value: 'light-grey' },
  { label: 'Brand 50 (Lightest Brand)', value: 'brand-50' },
  { label: 'Brand 900 (Darkest Brand)', value: 'brand-900' },
  { label: 'Brand Primary', value: 'brand-primary' },
];

const containerWidthOptions: { label: string; value: string }[] = [
  { label: 'Default (max-w-7xl for this block)', value: 'default' },
  { label: 'Medium (max-w-5xl)', value: 'medium' },
  { label: 'Wide (max-w-7xl)', value: 'wide' },
  { label: 'Full Width', value: 'full' }, // Changed 'max-w-none' to 'full'
];

export const ScheduleCallBlock: Block = {
  slug: 'scheduleCallSection', // Matches the slug from the error
  interfaceName: 'ScheduleCallBlockPayload', // To avoid conflict with Vue prop type
  fields: [
    {
      name: 'sectionBackgroundColor',
      label: 'Section Background Color',
      type: 'select',
      options: colorOptions,
      defaultValue: 'white',
    },
    {
      name: 'containerWidth',
      label: 'Container Width',
      type: 'select',
      options: containerWidthOptions,
      defaultValue: 'default',
    },
    {
      name: 'reduceTopPadding',
      label: 'Reduce Top Padding',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'reduceBottomPadding',
      label: 'Reduce Bottom Padding',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'infoColumn',
      label: 'Information Column Content',
      type: 'group',
      fields: [
        {
          name: 'infoColumnLogo',
          label: 'Logo',
          type: 'upload',
          relationTo: 'media', 
        },
        {
          name: 'infoColumnHeaderLink',
          label: 'Header Link (Optional)',
          type: 'group',
          fields: [
            { name: 'text', type: 'text', label: 'Link Text' }, // Changed 'label' to 'text' and added Label
            { name: 'url', type: 'text', label: 'Link URL' }, // Added Label
          ],
        },
        { name: 'infoColumnMainTitlePart1', type: 'text', label: 'Main Title - Part 1' },
        { name: 'infoColumnMainTitlePart2', type: 'text', label: 'Main Title - Part 2 (Optional)' },
        { 
          name: 'infoColumnTitleContainerDesktopHeight', 
          type: 'text', 
          label: 'Title Container Desktop Height (Optional)',
          admin: { description: 'CSS height value like "h-20", "auto", or "80px".'}
        },
        { name: 'infoColumnFooterText', type: 'textarea', label: 'Footer Text (Optional)' },
        {
          name: 'infoColumnFooterLinks',
          label: 'Footer Links (Optional)',
          type: 'array',
          fields: [
            { name: 'text', type: 'text', label: 'Link Text', required: true }, // Changed 'label' to 'text' and added Label
            { name: 'url', type: 'text', label: 'Link URL', required: true }, // Added Label
          ],
        },
      ],
    },
    {
      name: 'formColumn', 
      label: 'Form Column Content',
      type: 'group',
      fields: [
        { name: 'formTitle', type: 'text', label: 'Form Title' },
        // formFields are hardcoded in the frontend, so no Payload field needed here for them.
      ],
    },
  ],
}

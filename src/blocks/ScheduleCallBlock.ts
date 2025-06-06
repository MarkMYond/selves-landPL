import type { Block, Field } from 'payload'

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
  { label: 'Full Width', value: 'full' },
];

export const ScheduleCallBlock: Block = {
  slug: 'scheduleCallSection',
  interfaceName: 'ScheduleCallBlockPayload',
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
            { name: 'text', type: 'text', label: 'Link Text' },
            { name: 'url', type: 'text', label: 'Link URL' },
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
            { name: 'text', type: 'text', label: 'Link Text', required: true },
            { name: 'url', type: 'text', label: 'Link URL', required: true },
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
      ],
    },
  ],
}

import type { Block } from 'payload';

const colorOptions = [
  { label: 'Theme Light Purple', value: 'bg-brandTheme-01' },
  { label: 'Theme Light Blue', value: 'bg-brandTheme-02' },
  { label: 'Theme Light Green', value: 'bg-brandTheme-03' },
  { label: 'Theme Light Yellow', value: 'bg-brandTheme-04' },
  { label: 'Pink Light', value: 'bg-pink-light' },
  { label: 'Purple Light', value: 'bg-purple-light' },
  { label: 'None', value: 'none' },
];

export const RegCalloutBlock: Block = {
  slug: 'regCallout',
  labels: {
    singular: 'Registry Callout',
    plural: 'Registry Callouts',
  },
  fields: [
    {
      name: 'content',
      label: 'Callout Content',
      type: 'richText',
      required: true,
    },
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      options: colorOptions,
      defaultValue: 'bg-brandTheme-01',
    },
    {
      name: 'icon',
      label: 'Phosphor Icon Name',
      type: 'text',
      admin: {
        description: 'Enter the Phosphor icon name, e.g., ph:info, ph:warning, ph:lightbulb',
      },
    },
  ],
};

export default RegCalloutBlock;

import type { Block } from 'payload';

export const RegCodeBlock: Block = {
  slug: 'regCode',
  labels: {
    singular: 'Registry Code',
    plural: 'Registry Codes',
  },
  fields: [
    {
      name: 'title',
      label: 'Title (Optional)',
      type: 'text',
      required: false,
    },
    {
      name: 'code',
      label: 'Code (JSON)',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Paste JSON or technical content here.',
      },
    },
    {
      name: 'showBorder',
      label: 'Show Border/Frame',
      type: 'checkbox',
      defaultValue: false,
      required: false,
    },
  ],
};

export default RegCodeBlock;

import type { Block } from 'payload';

export const RegFramedCodeBlock: Block = {
  slug: 'regFramedCode',
  labels: {
    singular: 'Registry Framed Code',
    plural: 'Registry Framed Codes',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
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
      defaultValue: true,
      required: false,
    },
  ],
};

export default RegFramedCodeBlock;

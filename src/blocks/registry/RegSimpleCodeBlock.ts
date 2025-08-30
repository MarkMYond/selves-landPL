import type { Block } from 'payload';

export const RegSimpleCodeBlock: Block = {
  slug: 'regSimpleCode',
  labels: {
    singular: 'Registry Simple Code',
    plural: 'Registry Simple Codes',
  },
  fields: [
    {
      name: 'code',
      label: 'Code (JSON)',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Paste JSON or technical content here.',
      },
    },
  ],
};

export default RegSimpleCodeBlock;

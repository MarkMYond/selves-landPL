import type { Block } from 'payload';

export const RegRichTextBlock: Block = {
  slug: 'regRichText',
  labels: {
    singular: 'Registry Rich Text',
    plural: 'Registry Rich Text Blocks',
  },
  fields: [
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      required: true,
      admin: {
        // Add custom editor config here if needed
      },
    },
  ],
};

export default RegRichTextBlock;

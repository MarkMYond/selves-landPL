import type { Block } from 'payload';

export const WikiRichTextBlock: Block = {
  slug: 'wikiRichText',
  labels: {
    singular: 'Wiki Rich Text',
    plural: 'Wiki Rich Text Blocks',
  },
  fields: [
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      required: true,
      admin: {
        // You can add custom editor config here, e.g.:
        // editor: { ...customToolbarOptions }
      },
    },
  ],
};

export default WikiRichTextBlock;

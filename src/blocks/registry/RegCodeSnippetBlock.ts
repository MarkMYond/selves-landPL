import type { Block } from 'payload';

export const RegCodeSnippetBlock: Block = {
  slug: 'regCodeSnippet',
  labels: {
    singular: 'Registry Code Snippet',
    plural: 'Registry Code Snippets',
  },
  fields: [
    {
      name: 'label',
      label: 'Description (Optional)',
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
  ],
};

export default RegCodeSnippetBlock;

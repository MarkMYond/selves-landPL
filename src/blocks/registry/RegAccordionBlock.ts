import type { Block } from 'payload';
import RegRichTextBlock from './RegRichTextBlock';

export const RegAccordionBlock: Block = {
  slug: 'regAccordion',
  labels: {
    singular: 'Registry Accordion',
    plural: 'Registry Accordions',
  },
  fields: [
    {
      name: 'items',
      label: 'Accordion Items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          label: 'Item Title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          label: 'Item Content',
          type: 'richText',
          required: true,
        },
      ],
    },
  ],
};

export default RegAccordionBlock;

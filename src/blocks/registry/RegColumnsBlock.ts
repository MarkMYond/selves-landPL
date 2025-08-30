import type { Block } from 'payload';
import RegRichTextBlock from './RegRichTextBlock';
import RegCalloutBlock from './RegCalloutBlock';
import RegCodeBlock from './RegCodeBlock';
import RegImageCarouselBlock from './RegImageCarouselBlock';

export const RegColumnsBlock: Block = {
  slug: 'regColumns',
  labels: {
    singular: 'Registry Columns',
    plural: 'Registry Columns Blocks',
  },
  fields: [
    {
      name: 'columns',
      label: 'Columns',
      type: 'array',
      minRows: 2,
      maxRows: 4,
      fields: [
        {
          name: 'blocks',
          label: 'Column Content',
          type: 'blocks',
          blocks: [
            RegRichTextBlock,
            RegCalloutBlock,
            RegCodeBlock,
            RegImageCarouselBlock,
          ],
        },
      ],
    },
  ],
};

export default RegColumnsBlock;

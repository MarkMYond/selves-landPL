import { CollectionConfig } from 'payload';
import RegRichTextBlock from '../blocks/registry/RegRichTextBlock';
import RegCalloutBlock from '../blocks/registry/RegCalloutBlock';
import RegCodeBlock from '../blocks/registry/RegCodeBlock';
import RegImageCarouselBlock from '../blocks/registry/RegImageCarouselBlock';
import RegColumnsBlock from '../blocks/registry/RegColumnsBlock';
import RegAccordionBlock from '../blocks/registry/RegAccordionBlock';
import RegTableBlock from '../blocks/registry/RegTableBlock';
// Import other block types as needed

export const PageTemplate: CollectionConfig = {
  slug: 'page-templates',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        RegRichTextBlock,
        RegCalloutBlock,
        RegImageCarouselBlock,
        RegColumnsBlock,
        RegAccordionBlock,
        RegTableBlock,
        RegCodeBlock,
        // Add other block types here
      ],
    },
  ],
};

export default PageTemplate;

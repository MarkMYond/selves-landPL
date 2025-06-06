import type { Block, Field } from 'payload';
import { createBackgroundColorField } from '../fields/backgroundColor';
import { containerWidthField } from '../fields/containerWidth';
import { ApproachTabsBlock } from './ApproachTabsBlock';

export const CustomizedApproachBlock: Block = {
  slug: 'customizedApproach',
  labels: {
    singular: 'Customized Approach',
    plural: 'Customized Approach Sections',
  },
  fields: [
    createBackgroundColorField('sectionBackgroundColor', 'Section Background Color'),
    createBackgroundColorField('contentBackgroundColor', 'Content Background Color'),
    containerWidthField,
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description Text',
      type: 'textarea',
    },
    {
      name: 'approachTabsData',
      label: 'Approach Tabs Configuration',
      type: 'blocks',
      blocks: [ApproachTabsBlock],
      required: true,
      maxRows: 1,
    },
  ],
};

export default CustomizedApproachBlock;

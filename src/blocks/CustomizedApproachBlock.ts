import type { Block, Field } from 'payload'; // Corrected import path & Added Field
import { createBackgroundColorField } from '../fields/backgroundColor'; // Import reusable background color field
import { containerWidthField } from '../fields/containerWidth'; // Import reusable container width field
// import { internalName } from '../fields/internalName'; // Removed import
// import { backgroundColor } from '../fields/backgroundColor'; // Removed import
import { ApproachTabsBlock } from './ApproachTabsBlock'; // Import the field definition

export const CustomizedApproachBlock: Block = {
  slug: 'customizedApproach',
  labels: {
    singular: 'Customized Approach',
    plural: 'Customized Approach Sections',
  },
  fields: [
    // Removed internalName field
    // Use reusable background color fields
    createBackgroundColorField('sectionBackgroundColor', 'Section Background Color'),
    createBackgroundColorField('contentBackgroundColor', 'Content Background Color'),
    // Add container width field
    containerWidthField,
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      // Example: "Our customized approach"
    },
    {
      name: 'description',
      label: 'Description Text',
      type: 'textarea',
    },
    {
      name: 'approachTabsData', // This name must match the property in the Vue component type
      label: 'Approach Tabs Configuration',
      type: 'blocks', // Corrected typo: should be plural 'blocks'
      blocks: [ApproachTabsBlock], // Only allow the ApproachTabsBlock here
      required: true,
      maxRows: 1, // Only one nested tabs block makes sense here
    },
  ],
};

export default CustomizedApproachBlock;

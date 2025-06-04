import type { Block, Field } from 'payload'; // Corrected import path & Added Field
import { createBackgroundColorField } from '../fields/backgroundColor'; // Import reusable background color field
import { containerWidthField } from '../fields/containerWidth'; // Import reusable container width field

// Removed internalName import

export const ApproachTabsBlock: Block = {
  slug: 'approachTabs',
  labels: {
    singular: 'Approach Tabs',
    plural: 'Approach Tabs Sections',
  },
  fields: [
    // Removed internalName field
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      // Example: "Get set up in 5 easy steps"
    },
    {
      name: 'tabs',
      label: 'Tabs Content',
      type: 'array',
      minRows: 1,
      maxRows: 2, // Based on current component structure
      fields: [
        {
          name: 'tabTitle',
          label: 'Tab Title',
          type: 'text',
          required: true,
        },
        {
          name: 'steps',
          label: 'Steps (One per line)',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Enter each step on a new line.',
          },
        },
      ],
    },
    {
      name: 'link',
      label: 'Details Link',
      type: 'group',
      fields: [
        {
          name: 'text',
          label: 'Link Text',
          type: 'text',
          defaultValue: 'View details',
        },
        {
          name: 'url',
          label: 'Link URL',
          type: 'text',
        },
      ],
    },
    // Use reusable background color fields
    createBackgroundColorField('sectionBackgroundColor', 'Section Background Color'),
    createBackgroundColorField('contentBackgroundColor', 'Content Background Color'),
    // Add container width field
    containerWidthField,
  ],
};

export default ApproachTabsBlock;

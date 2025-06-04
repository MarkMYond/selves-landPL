import type { Block, Field } from 'payload'; // Added Field
import { createBackgroundColorField } from '../fields/backgroundColor'; // Import reusable background color field
import { containerWidthField } from '../fields/containerWidth'; // Import reusable container width field

export const CaseStudySectionBlock: Block = {
  slug: 'caseStudySection',
  labels: {
    singular: 'Case Study Section',
    plural: 'Case Study Sections',
  },
  fields: [
    {
      name: 'title',
      label: 'Section Title (Optional)',
      type: 'text',
    },
    {
      name: 'caseStudies',
      label: 'Case Studies',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media', // Assuming 'media' is your collection slug
          required: true,
        },
        {
          name: 'title',
          label: 'Card Title',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          label: 'Card Link URL',
          type: 'text',
          required: true,
        },
        { // NEW bgColor field for individual cards
          name: 'bgColor',
          label: 'Card Background Color (Tailwind Class)',
          type: 'text',
          admin: {
              description: 'Optional: e.g., bg-blue-100. Leave blank for default (white).',
          },
        },
      ],
    },
    // Use reusable background color field (only section needed here)
    createBackgroundColorField('sectionBackgroundColor', 'Section Background Color'),
    // Add container width field
    containerWidthField,
    {
      name: 'removeTopPadding',
      type: 'checkbox',
      label: 'Remove Top Padding',
      defaultValue: false,
    },
    {
      name: 'removeBottomPadding',
      type: 'checkbox',
      label: 'Remove Bottom Padding',
      defaultValue: false,
    },
  ],
};

import type { Block, Field } from 'payload';
import { createBackgroundColorField } from '../fields/backgroundColor'; // Import reusable background color field
import { containerWidthField } from '../fields/containerWidth'; // Import reusable container width field

// Reusable Link field group
const linkFields: Field[] = [
  {
    name: 'text',
    type: 'text',
    label: 'Link Text',
  },
  {
    name: 'url',
    type: 'text',
    label: 'Link URL',
  },
];

export const TemplateSectionBlock: Block = {
  slug: 'templateSection',
  labels: {
    singular: 'Template Section',
    plural: 'Template Sections',
  },
  fields: [
    {
      name: 'title',
      label: 'Section Title (Optional)',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description (Optional)',
      type: 'textarea',
    },
    {
      name: 'topLink',
      label: 'Top Right Link (Optional)',
      type: 'group',
      fields: linkFields,
    },
    {
      name: 'templates',
      label: 'Templates',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
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
        {
          name: 'bgColor',
          label: 'Card Background Color (Tailwind Class)',
          type: 'text',
          admin: {
              description: 'e.g., bg-red-100, bg-blue-100. Use light shades.',
          },
          defaultValue: 'bg-gray-100',
        },
      ],
    },
    // Use reusable background color field (only section needed here)
    createBackgroundColorField('sectionBackgroundColor', 'Section Background Color'),
    // Add container width field
    containerWidthField,
  ],
};

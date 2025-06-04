import type { Block, Field } from 'payload';
import { createBackgroundColorField } from '../fields/backgroundColor'; // Import reusable background color field
import { containerWidthField } from '../fields/containerWidth'; // Import reusable container width field

export const CtaSectionBlock: Block = {
  slug: 'ctaSection', // Renamed slug
  labels: {
    singular: 'CTA Section', // Renamed label
    plural: 'CTA Sections',  // Renamed label
  },
  fields: [
    // --- CTA Fields (previously in a tab) ---
    {
      name: 'ctaSubTitle',
      label: 'Subtitle (Top Text)',
      type: 'text',
    },
    {
      name: 'ctaTitle',
      label: 'Main Title',
      type: 'text',
    },
    {
      name: 'ctaButtons',
      label: 'Buttons',
      type: 'array',
      minRows: 0,
      maxRows: 2,
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Button URL',
          required: true,
        },
        {
          name: 'style',
          label: 'Button Style',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
          defaultValue: 'primary',
        },
      ],
    },
    // Use reusable background color fields
    createBackgroundColorField('sectionBackgroundColor', 'Section Background Color'),
    createBackgroundColorField('contentBackgroundColor', 'Content Background Color (If Applicable)'),
    // Add container width field
    containerWidthField,
  ],
};

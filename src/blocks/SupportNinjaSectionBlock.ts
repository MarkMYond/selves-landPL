import type { Block, Field } from 'payload' // Correct import path & Added Field
import { createBackgroundColorField } from '../fields/backgroundColor' // Import reusable background color field
import { containerWidthField } from '../fields/containerWidth' // Import reusable container width field

export const SupportNinjaSectionBlock: Block = {
  slug: 'supportNinjaSection',
  interfaceName: 'SupportNinjaSectionBlock',
  fields: [
    // Use reusable background color fields
    createBackgroundColorField('sectionBackgroundColor', 'Section Background Color'),
    createBackgroundColorField('contentBackgroundColor', 'Content Background Color'),
    // Add container width field
    containerWidthField,
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // Assuming 'media' collection slug
      label: 'Image',
      required: true,
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'CTA Button',
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
          type: 'select',
          label: 'Button Style',
          options: [
            { label: 'Primary (Solid Background)', value: 'primary' },
            { label: 'Secondary (Outline)', value: 'secondary' },
          ],
          defaultValue: 'primary',
          required: true,
        },
      ],
    },
  ],
}

export default SupportNinjaSectionBlock;

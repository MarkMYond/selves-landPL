import type { Block, Field } from 'payload'
import { createBackgroundColorField } from '../fields/backgroundColor'
import { containerWidthField } from '../fields/containerWidth'

export const FeatureSectionBlock: Block = {
  slug: 'featureSection',
  interfaceName: 'FeatureSection',
  labels: {
    singular: 'Feature Section',
    plural: 'Feature Sections',
  },
  fields: [
    createBackgroundColorField('sectionBackgroundColor', 'Section Background Color'),
    createBackgroundColorField('contentBackgroundColor', 'Content Background Color'),
    containerWidthField,
    {
      name: 'superTitle',
      label: 'Super Title (Optional)',
      type: 'text',
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'titleStyle',
      type: 'select',
      label: 'Title Style',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Large (Homepage Style)', value: 'large' },
      ],
      defaultValue: 'standard',
      admin: {
        description: 'Select the display style for the title. "Large" matches the homepage hero title size.',
      },
    },
    {
      name: 'description',
      label: 'Description (Optional)',
      type: 'textarea',
    },
    {
      name: 'image',
      label: 'Image (Optional)',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'button',
      label: 'Button (Optional)',
      type: 'group',
      admin: {
        condition: (_, siblingData: any) => siblingData.includeButton,
      },
      fields: [
        { name: 'text', type: 'text', required: true },
        { name: 'url', type: 'text', label: 'URL', required: true },
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
      ]
    },
    {
      name: 'includeButton',
      label: 'Include Button?',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'removeBottomPadding',
      label: 'Remove Bottom Padding?',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Check this to remove the default bottom padding from this section.',
      }
    }
  ],
}

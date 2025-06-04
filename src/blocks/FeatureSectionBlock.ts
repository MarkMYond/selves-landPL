import type { Block, Field } from 'payload' // Added Field
import { createBackgroundColorField } from '../fields/backgroundColor' // Import reusable background color field
import { containerWidthField } from '../fields/containerWidth' // Import reusable container width field

export const FeatureSectionBlock: Block = {
  slug: 'featureSection',
  interfaceName: 'FeatureSection',
  labels: {
    singular: 'Feature Section',
    plural: 'Feature Sections',
  },
  fields: [
    // Use reusable background color fields
    createBackgroundColorField('sectionBackgroundColor', 'Section Background Color'),
    createBackgroundColorField('contentBackgroundColor', 'Content Background Color'),
    // Add container width field
    containerWidthField,
    // Image Position field removed
    {
      name: 'superTitle', // Added superTitle field
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
      name: 'description', // Renamed back from subtitle
      label: 'Description (Optional)',
      type: 'textarea',
    },
    {
      name: 'image',
      label: 'Image (Optional)', // Made optional
      type: 'upload',
      relationTo: 'media',
      required: false, // Changed to false
    },
    {
      name: 'button',
      label: 'Button (Optional)',
      type: 'group',
      admin: {
        condition: (_, siblingData: any) => siblingData.includeButton, // Added type, Only show if checkbox is checked
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
        // Ensuring buttonPosition field is definitely removed
      ]
    },
    {
      name: 'includeButton', // Checkbox to conditionally show the button group
      label: 'Include Button?',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar', // Place checkbox in sidebar for cleaner layout
      }
    },
    {
      name: 'removeBottomPadding', // New checkbox field
      label: 'Remove Bottom Padding?',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Check this to remove the default bottom padding from this section.',
      }
    }
    // Optional: Add layout options (e.g., image left/right) if needed
  ],
}

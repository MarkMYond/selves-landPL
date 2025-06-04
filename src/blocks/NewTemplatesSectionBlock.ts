import type { Block, Condition, Field } from 'payload' // Reverted import path & Added Field
import { createBackgroundColorField } from '../fields/backgroundColor' // Import reusable background color field
import { containerWidthField } from '../fields/containerWidth' // Import reusable container width field

// Removed local backgroundColorOptions definition

export const NewTemplatesSectionBlock: Block = {
  slug: 'newTemplatesSection', // Must match the slug used in BlockRenderer.vue
  interfaceName: 'NewTemplatesSectionBlock',
  fields: [
    // Group for content fields
    {
      type: 'group',
      name: 'content',
      label: 'Content',
      fields: [
        {
          name: 'superTitle', // Added superTitle
          type: 'text',
          label: 'Super Title (Optional)',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea', // Use textarea for potentially longer content
          label: 'Description',
          localized: true, // Assuming description might need localization
          required: true, // Making description required, adjust if optional
        },
        {
          name: 'ctaText',
          type: 'text',
          label: 'CTA Button Text (Optional)',
        },
        {
          name: 'ctaUrl',
          type: 'text',
          label: 'CTA Button URL (Optional)',
          admin: {
            condition: (_: any, siblingData: any): boolean => siblingData.ctaText, // Explicitly type parameters as any
          },
        },
      ]
    },
    // Relationship to Templates
    {
      name: 'templates',
      type: 'relationship',
      relationTo: 'templates', // Relates to the Templates collection
      hasMany: true,
      required: true,
      label: 'Templates to Display',
      admin: {
        description: 'Select the templates to show in this section.',
      },
    },
    // Use reusable background color fields
    createBackgroundColorField('sectionBackgroundColor', 'Section Background Color'),
    createBackgroundColorField('contentBackgroundColor', 'Content Background Color'),
    // Add container width field
    containerWidthField,
  ],
}

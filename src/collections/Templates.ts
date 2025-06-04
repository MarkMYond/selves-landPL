import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug' // Assuming shared slug field

export const Templates: CollectionConfig = {
  slug: 'templates',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'updatedAt'],
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Template Title',
    },
    slugField('title'), // Generate slug from title
    {
      name: 'href',
      type: 'text',
      label: 'Template URL/Link',
    },
    {
      name: 'category', // Simple text category for now, could be a relationship later
      type: 'text',
      label: 'Category',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // Assuming 'media' is your media collection slug
      label: 'Image (Optional)',
      required: false,
    },
    {
      name: 'iconName',
      type: 'text',
      label: 'Phosphor Icon Name (Optional)',
      admin: {
        description: 'E.g., "FileText", "ChartLineUp". Used if no image is provided or as an alternative display.',
      },
    },
    // Optional fields corresponding to props in NewTemplatesSection.vue
    {
      name: 'backgroundColor',
      type: 'text', // Store Tailwind class like 'bg-red-200' or hex code if preferred
      label: 'Background Color (Tailwind Class)',
      admin: {
        description: 'e.g., bg-red-200, bg-white. Default is bg-white.',
      }
    },
    {
      name: 'hasBorder',
      type: 'checkbox',
      label: 'Has Border?',
      defaultValue: false,
    },
  ],
  // Disable versions to prevent document locking issues
  versions: false,
}

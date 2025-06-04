import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug' 

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'parent', 'updatedAt'],
    description: 'Organize pages into hierarchical categories.',
    group: 'Content Management', // Optional: Group in admin UI
  },
  access: {
    read: () => true, 
  },
  fields: [
    {
      name: 'name',
      label: 'Category Name',
      type: 'text',
      required: true,
    },
    slugField('name'),
    {
      name: 'parent',
      label: 'Parent Category',
      type: 'relationship',
      relationTo: 'categories', 
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sort', // Optional: for manual sorting if needed
      label: 'Sort Order',
      type: 'number',
      admin: {
        position: 'sidebar',
        step: 1,
      },
      index: true,
    },
  ],
  timestamps: true,
  versions: false, // Keep versions disabled as per original
}

export default Categories;

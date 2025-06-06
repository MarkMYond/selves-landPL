import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug' 

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'parent', 'updatedAt'],
    description: 'Organize pages into hierarchical categories.',
    group: 'Content Management',
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
      name: 'sort',
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
  versions: false,
}

export default Categories;

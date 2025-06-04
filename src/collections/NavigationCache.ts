import type { CollectionConfig } from 'payload';

/**
 * Collection for caching navigation structures
 * This replaces the static JSON files with a MongoDB-based solution
 * that works well with serverless environments like Vercel
 */
const NavigationCache: CollectionConfig = {
  slug: 'navigation-cache',
  admin: {
    useAsTitle: 'section',
    defaultColumns: ['section', 'updatedAt'],
    description: 'Navigation data cache for different sections of the site.',
    group: 'System',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'section',
      label: 'Section',
      type: 'select',
      options: [
        { label: 'Wiki', value: 'wiki' },
        { label: 'Registry', value: 'registry' },
        // Add more sections as needed
      ],
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'navigationData',
      label: 'Navigation Data',
      type: 'json',
      required: true,
      admin: {
        description: 'JSON structure of the navigation (automatically generated)',
      },
    },
    {
      name: 'lastGenerated',
      label: 'Last Generated',
      type: 'date',
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Set the lastGenerated date to now
        return {
          ...data,
          lastGenerated: new Date(),
        };
      },
    ],
  },
};

export default NavigationCache;

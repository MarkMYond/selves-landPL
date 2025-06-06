import type { CollectionConfig } from 'payload';

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
        return {
          ...data,
          lastGenerated: new Date(),
        };
      },
    ],
  },
};

export default NavigationCache;

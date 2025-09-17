type CollectionConfig = any;

const Hotels: CollectionConfig = {
  slug: 'hotels',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hotel',
          fields: [
            { name: 'name', type: 'text' },
            { name: 'registryId', type: 'text' },
            { name: 'mainDetails', type: 'json' },
            { name: 'description', type: 'text' },
            { name: 'media', type: 'json' },
            { name: 'facts', type: 'json' },
            { name: 'vibe', type: 'json' },
            { name: 'facilities', type: 'json' },
            { name: 'references', type: 'json' },
            { name: 'reviews', type: 'json' },
            { name: 'walkScore', type: 'number' },
            { name: 'poi', type: 'json' },
          ],
        },
        {
          label: 'Rooms',
          fields: [
            {
              name: 'rooms',
              type: 'array',
              fields: [
                {
                  name: 'roomId',
                  type: 'number',
                  required: true,
                  admin: {
                    position: 'sidebar',
                  },
                  unique: false,
                },
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'basics',
                  type: 'json',
                },
                {
                  name: 'description',
                  type: 'text',
                },
                {
                  name: 'uniqueFeatures',
                  type: 'json',
                },
                {
                  name: 'idealFor',
                  type: 'json',
                },
                {
                  name: 'notBestFor',
                  type: 'json',
                },
                {
                  name: 'searchQueries',
                  type: 'json',
                },
                {
                  name: 'grade',
                  type: 'json',
                },
                {
                  name: 'amenities',
                  type: 'json',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default Hotels;

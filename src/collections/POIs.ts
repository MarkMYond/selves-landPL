type CollectionConfig = any;

const POIs: CollectionConfig = {
  slug: 'pois',
  admin: {
    useAsTitle: 'name',
    group: 'Guide',
    defaultColumns: ['name', 'poiId', 'lastUpdated'],
  },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'poiId', type: 'text', required: true, unique: true },
    { name: 'lastUpdated', type: 'date', required: true },
    {
      name: 'identity',
      type: 'group',
      fields: [
        { name: 'category', type: 'text' },
        { name: 'descriptionShort', type: 'textarea' },
      ],
    },
    {
      name: 'visitInfo',
      type: 'group',
      fields: [
        { name: 'accessCost', type: 'text' },
        { name: 'timeToExplore', type: 'text' },
        { name: 'accessibility', type: 'text' },
      ],
    },
    {
      name: 'wouldMatch',
      type: 'group',
      fields: [
        { name: 'idealFor', type: 'array', fields: [{ name: 'value', type: 'text' }] },
        { name: 'bestQueryTypes', type: 'array', fields: [{ name: 'value', type: 'text' }] },
      ],
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        { name: 'address', type: 'text' },
        {
          name: 'coordinates',
          type: 'group',
          fields: [
            { name: 'lat', type: 'number' },
            { name: 'lng', type: 'number' },
          ],
        },
        { name: 'nearestTube', type: 'text' },
        {
          name: 'nearbyAttractions',
          type: 'array',
          fields: [
            { name: 'name', type: 'text' },
            { name: 'walkTime', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'contextualInfo',
      type: 'group',
      fields: [
        { name: 'significance', type: 'text' },
        { name: 'bestTimes', type: 'text' },
        { name: 'crowdLevel', type: 'text' },
        {
          name: 'combinationSuggestions',
          type: 'array',
          fields: [{ name: 'value', type: 'text' }],
        },
      ],
    },
    {
      name: 'reviews',
      type: 'group',
      fields: [
        {
          name: 'aggregate',
          type: 'group',
          fields: [
            { name: 'score', type: 'number' },
            { name: 'count', type: 'number' },
          ],
        },
      ],
    },
  ],
};

export default POIs;

type CollectionConfig = any;

const RoomTypes: CollectionConfig = {
  slug: 'room-types',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'roomId', type: 'text', required: true, unique: true, index: true },
    { name: 'lastUpdated', type: 'date', required: true },
    {
      name: 'identity',
      type: 'group',
      fields: [
        { name: 'roomType', type: 'text', required: true },
        { name: 'sizeSqMeters', type: 'number' },
        { name: 'maxOccupancy', type: 'number', required: true },
        {
          name: 'bedConfiguration',
          type: 'select',
          options: ['Single bed', 'Double bed', 'King bed', 'Queen bed', 'Twin beds', '2 Single beds'],
        },
        {
          name: 'viewType',
          type: 'select',
          options: [
            'Cathedral',
            'City View',
            'Garden View',
            'Sea View',
            'Mountain View',
            'Courtyard View',
            'No Specific View',
          ],
        },
        { name: 'descriptionShort', type: 'textarea', required: true },
      ],
    },
    {
      name: 'hotel',
      type: 'relationship',
      relationTo: 'hotels',
      required: true,
      index: true,
    },
    {
      name: 'pricingContext',
      type: 'group',
      fields: [
        {
          name: 'priceTier',
          type: 'select',
          options: ['Budget', 'Standard', 'Premium', 'Suite'],
        },
        {
          name: 'rateVsStandardRoom',
          type: 'text',
          admin: { description: 'e.g., +35%, -10%, Base rate' },
        },
      ],
    },
    {
      name: 'categories',
      type: 'select',
      hasMany: true,
      options: [
        'Business',
        'Luxury',
        'Romantic',
        'Family',
        'Accessible',
        'View Room',
      ],
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'category',
          type: 'select',
          options: [
            'Technology',
            'Comfort',
            'Bathroom',
            'Work',
            'Entertainment',
            'Historic',
          ],
        },
      ],
    },
    {
      name: 'hierarchy',
      type: 'group',
      fields: [
        {
          name: 'tier',
          type: 'select',
          options: ['Entry', 'Mid-range', 'Premium', 'Suite'],
          required: true,
        },
        { name: 'upgradeFrom', type: 'relationship', relationTo: 'room-types' },
        { name: 'upgradeTo', type: 'relationship', relationTo: 'room-types' },
      ],
    },
    {
      name: 'suitability',
      type: 'group',
      fields: [
        {
          name: 'idealFor',
          type: 'array',
          fields: [
            { name: 'description', type: 'text', required: true },
          ],
        },
        {
          name: 'considerations',
          type: 'array',
          fields: [
            { name: 'warning', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'alt', type: 'text', required: true },
        { name: 'isPrimary', type: 'checkbox' },
      ],
    },
    {
      name: 'featuredReview',
      type: 'group',
      fields: [
        { name: 'quote', type: 'textarea' },
        { name: 'source', type: 'text' },
        { name: 'date', type: 'date' },
        {
          name: 'guestType',
          type: 'select',
          options: ['Couple', 'Business', 'Family', 'Solo', 'Group'],
        },
      ],
    },
    {
      name: 'specialNotes',
      type: 'array',
      fields: [
        { name: 'note', type: 'text', required: true },
        { name: 'type', type: 'select', options: ['Info', 'Warning', 'Highlight'], defaultValue: 'Info' },
      ],
    },
  ],
};

export default RoomTypes;

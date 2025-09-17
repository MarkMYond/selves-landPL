type CollectionConfig = any;

const Restaurants: CollectionConfig = {
  slug: 'restaurants',
  admin: {
    useAsTitle: 'name',
    group: 'Guide',
    defaultColumns: ['name', 'restaurantId', 'lastUpdated'],
  },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'restaurantId', type: 'text', required: true, unique: true },
    { name: 'lastUpdated', type: 'date', required: true },
    {
      name: 'identity', type: 'json'
    },
    {
      name: 'hierarchy', type: 'group', fields: [
        { name: 'details', type: 'json' }, // for tier, competitiveSet, alternativeTo
      ]
    },
    {
      name: 'pricingContext', type: 'group', fields: [
        { name: 'details', type: 'json' }, // for averageMealCost, priceVsLocalAverage, valuePerception
      ]
    },
    {
      name: 'wouldMatch', type: 'group', fields: [
        { name: 'details', type: 'json' }, // for idealFor, notIdealFor, bestQueryTypes
      ]
    },
    {
      name: 'media', type: 'group', fields: [
        { name: 'details', type: 'json' }, // for primaryImageUrl, gallery, photoCount
      ]
    },
    {
      name: 'culinaryDetails', type: 'group', fields: [
        { name: 'details', type: 'json' }, // for chefInfo, menuStructure, signatureDishes, wineProgram
      ]
    },
    {
      name: 'operationalDetails', type: 'group', fields: [
        { name: 'details', type: 'json' }, // for openingHours, reservationPolicy, serviceDetails
      ]
    },
    {
      name: 'capacity', type: 'group', fields: [
        { name: 'details', type: 'json' }, // for totalSeats, tableConfiguration, privateRooms
      ]
    },
    {
      name: 'features', type: 'group', fields: [
        { name: 'details', type: 'json' }, // for restaurantAmenities, accessibility, uniqueFeatures
      ]
    },
    { name: 'awards', type: 'json' },
    { name: 'reviewSnippets', type: 'json' },
    {
      name: 'location', type: 'group', fields: [
        { name: 'details', type: 'json' }, // for address, neighborhood, walkabilityScore, parkingOptions, publicTransport, pointsOfInterest
      ]
    },
    {
      name: 'businessInfo', type: 'group', fields: [
        { name: 'details', type: 'json' }, // for contact, ownership
      ]
    },
    {
      name: 'reviews', type: 'group', fields: [
        { name: 'details', type: 'json' }, // for aggregate, breakdown
      ]
    },
    {
      name: 'contextualInfo', type: 'group', fields: [
        { name: 'details', type: 'json' }, // for seasonalConsiderations, bookingTips, localContext
      ]
    },
  ],
};

export default Restaurants;

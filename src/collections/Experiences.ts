type CollectionConfig = any;

const Experiences: CollectionConfig = {
  slug: 'experiences',
    admin: {
      useAsTitle: 'name',
      group: 'Guide',
      defaultColumns: ['name', 'identity.experienceType', 'lastUpdated'],
  },
  access: { read: () => true },
  fields: [
  { name: 'name', type: 'text', required: true },
  { name: 'experienceId', type: 'text', required: true, unique: true },
  { name: 'lastUpdated', type: 'date', required: true },
    {
      name: 'identity', type: 'group', fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'experienceType', type: 'text', required: true },
        { name: 'category', type: 'text' },
        { name: 'subCategories', type: 'array', fields: [{ name: 'subCategory', type: 'text' }] },
        {
          name: 'duration', type: 'group', fields: [
            { name: 'typical', type: 'text' },
            { name: 'minimum', type: 'text' },
            { name: 'maximum', type: 'text' },
          ]
        },
        { name: 'difficultyLevel', type: 'text' },
        { name: 'descriptionShort', type: 'textarea', required: true },
      ]
    },
    {
      name: 'hierarchy', type: 'group', fields: [
        { name: 'tier', type: 'text' },
        { name: 'upgradeFrom', type: 'text' },
        { name: 'upgradeTo', type: 'text' },
        { name: 'competitiveSet', type: 'array', fields: [{ name: 'set', type: 'text' }] },
      ]
    },
    {
      name: 'pricingContext', type: 'group', fields: [
        {
          name: 'pricing', type: 'group', fields: [
            { name: 'adult', type: 'text' },
            { name: 'senior', type: 'text' },
            { name: 'student', type: 'text' },
            { name: 'child', type: 'text' },
            { name: 'family', type: 'text' },
          ]
        },
        { name: 'priceVsStandardAdmission', type: 'text' },
        { name: 'valuePerception', type: 'text' },
      ]
    },
    {
      name: 'wouldMatch', type: 'group', fields: [
        { name: 'idealFor', type: 'array', fields: [{ name: 'description', type: 'text' }] },
        { name: 'notIdealFor', type: 'array', fields: [{ name: 'description', type: 'text' }] },
        { name: 'bestQueryTypes', type: 'array', fields: [{ name: 'query', type: 'text' }] },
      ]
    },
    {
      name: 'media', type: 'group', fields: [
        { name: 'primaryImageUrl', type: 'text' },
        {
          name: 'gallery', type: 'array', fields: [
            { name: 'url', type: 'text' },
            { name: 'caption', type: 'text' },
          ]
        },
        { name: 'videoUrl', type: 'text' },
        { name: 'photoCount', type: 'number' },
      ]
    },
    {
      name: 'experienceDetails', type: 'group', fields: [
        { name: 'highlights', type: 'array', fields: [{ name: 'highlight', type: 'text' }] },
        { name: 'inclusions', type: 'array', fields: [{ name: 'inclusion', type: 'text' }] },
        { name: 'exclusions', type: 'array', fields: [{ name: 'exclusion', type: 'text' }] },
        { name: 'meetingPoint', type: 'text' },
        { name: 'endPoint', type: 'text' },
      ]
    },
    {
      name: 'operationalDetails', type: 'group', fields: [
        {
          name: 'schedule', type: 'group', fields: [
            { name: 'availability', type: 'text' },
            { name: 'tourTimes', type: 'array', fields: [{ name: 'time', type: 'text' }] },
            {
              name: 'seasonalVariations', type: 'group', fields: [
                { name: 'summer', type: 'text' },
                { name: 'winter', type: 'text' },
              ]
            },
          ]
        },
        {
          name: 'bookingRequirements', type: 'group', fields: [
            { name: 'advanceBookingRequired', type: 'checkbox' },
            { name: 'bookingHorizon', type: 'text' },
            { name: 'cancellationPolicy', type: 'text' },
            { name: 'groupBookings', type: 'text' },
            { name: 'walkInsAvailable', type: 'text' },
          ]
        },
        {
          name: 'capacity', type: 'group', fields: [
            { name: 'maximumGroupSize', type: 'number' },
            { name: 'minimumGroupSize', type: 'number' },
            { name: 'privateBookingMinimum', type: 'number' },
          ]
        },
      ]
    },
    {
      name: 'requirements', type: 'group', fields: [
        {
          name: 'ageRestrictions', type: 'group', fields: [
            { name: 'minimumAge', type: 'text' },
            { name: 'adultSupervision', type: 'text' },
          ]
        },
        { name: 'physicalRequirements', type: 'array', fields: [{ name: 'requirement', type: 'text' }] },
        {
          name: 'accessibility', type: 'group', fields: [
            { name: 'wheelchairAccessible', type: 'text' },
            { name: 'hearingLoop', type: 'text' },
            { name: 'accessibilityNotes', type: 'text' },
          ]
        },
        { name: 'whatToBring', type: 'array', fields: [{ name: 'item', type: 'text' }] },
      ]
    },
    {
      name: 'features', type: 'group', fields: [
        { name: 'uniqueFeatures', type: 'array', fields: [{ name: 'feature', type: 'text' }] },
        {
          name: 'educationalValue', type: 'group', fields: [
            { name: 'learningOutcomes', type: 'array', fields: [{ name: 'outcome', type: 'text' }] },
            { name: 'suitableFor', type: 'array', fields: [{ name: 'group', type: 'text' }] },
          ]
        },
      ]
    },
    {
      name: 'guides', type: 'group', fields: [
        {
          name: 'guideProfile', type: 'group', fields: [
            { name: 'background', type: 'text' },
            { name: 'experience', type: 'text' },
            { name: 'languages', type: 'array', fields: [{ name: 'language', type: 'text' }] },
            { name: 'specializations', type: 'array', fields: [{ name: 'specialization', type: 'text' }] },
          ]
        },
        {
          name: 'guideRatings', type: 'group', fields: [
            { name: 'knowledgeScore', type: 'number' },
            { name: 'engagementScore', type: 'number' },
            { name: 'clarityScore', type: 'number' },
          ]
        },
      ]
    },
    {
      name: 'seasonalConsiderations', type: 'group', fields: [
        { name: 'bestTime', type: 'text' },
        { name: 'weatherImpact', type: 'text' },
        { name: 'specialEvents', type: 'array', fields: [{ name: 'event', type: 'text' }] },
        { name: 'crowdingPatterns', type: 'text' },
      ]
    },
    {
      name: 'reviewSnippets', type: 'array', fields: [
        { name: 'text', type: 'textarea', required: true },
        { name: 'source', type: 'text', required: true },
        { name: 'date', type: 'text', required: true },
        { name: 'rating', type: 'number' },
        { name: 'visitorType', type: 'text' },
      ]
    },
    {
      name: 'location', type: 'group', fields: [
        { name: 'address', type: 'text', required: true },
        { name: 'neighborhood', type: 'text' },
        { name: 'walkabilityScore', type: 'number' },
        {
          name: 'parkingOptions', type: 'array', fields: [
            { name: 'type', type: 'text' },
            { name: 'cost', type: 'text' },
            { name: 'capacity', type: 'text' },
            { name: 'walkTime', type: 'text' },
            { name: 'name', type: 'text' },
          ]
        },
        {
          name: 'publicTransport', type: 'group', fields: [
            { name: 'nearestBusStop', type: 'text' },
            { name: 'trainStation', type: 'text' },
            { name: 'busRoutes', type: 'array', fields: [{ name: 'route', type: 'text' }] },
          ]
        },
        {
          name: 'nearbyAttractions', type: 'array', fields: [
            { name: 'name', type: 'text' },
            { name: 'walkTime', type: 'text' },
            { name: 'type', type: 'text' },
          ]
        },
      ]
    },
    {
      name: 'businessInfo', type: 'group', fields: [
        { name: 'operator', type: 'text' },
        {
          name: 'contact', type: 'group', fields: [
            { name: 'phone', type: 'text' },
            { name: 'email', type: 'text' },
            { name: 'website', type: 'text' },
            { name: 'bookingPortal', type: 'text' },
          ]
        },
        { name: 'operatedBy', type: 'text' },
        { name: 'charitableStatus', type: 'text' },
      ]
    },
    {
      name: 'reviews', type: 'group', fields: [
        {
          name: 'aggregate', type: 'group', fields: [
            { name: 'score', type: 'number' },
            { name: 'count', type: 'number' },
            { name: 'source', type: 'text' },
          ]
        },
        {
          name: 'breakdown', type: 'group', fields: [
            { name: 'content', type: 'number' },
            { name: 'guide', type: 'number' },
            { name: 'value', type: 'number' },
            { name: 'organization', type: 'number' },
            { name: 'uniqueness', type: 'number' },
          ]
        },
      ]
    },
    {
      name: 'relatedExperiences', type: 'array', fields: [
        { name: 'experienceId', type: 'text' },
        { name: 'name', type: 'text' },
        { name: 'relationship', type: 'text' },
        { name: 'combinedBooking', type: 'text' },
        { name: 'duration', type: 'text' },
      ]
    },
    {
      name: 'contextualInfo', type: 'group', fields: [
        {
          name: 'localContext', type: 'group', fields: [
            { name: 'culturalSignificance', type: 'text' },
            { name: 'historicalImportance', type: 'text' },
            { name: 'touristContext', type: 'text' },
          ]
        },
        { name: 'bookingTips', type: 'array', fields: [{ name: 'tip', type: 'text' }] },
        { name: 'combinationSuggestions', type: 'array', fields: [{ name: 'suggestion', type: 'text' }] },
      ]
    },
  ],
};

export default Experiences;

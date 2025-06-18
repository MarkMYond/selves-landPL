import type { Block } from 'payload'

// Define the structure for the 'cards' array items
// This helps in typing and provides clarity for the fields within each card.
// Note: Payload generates types, but defining here can help with editor autocompletion
// and understanding the structure while coding the block.
// Actual generated type for card items would be something like WhyChooseUsSection_cards.

export const WhyChooseUsSectionBlock: Block = {
  slug: 'WhyChooseUsSection', // This slug is used to identify the block in Payload and in frontend rendering
  labels: {
    singular: 'Why Choose Us Section',
    plural: 'Why Choose Us Sections',
  },
  fields: [
    // animationIdTitle field removed
    // animationIdCards field removed
    {
      name: 'eyebrowText',
      label: 'Eyebrow Text',
      type: 'text',
      defaultValue: 'Why choose us',
      admin: {
        description: 'Small text appearing above the main title, often styled as a tag.',
      },
    },
    {
      name: 'eyebrowBackgroundColor',
      label: 'Eyebrow Background Color',
      type: 'select',
      options: [
        { label: 'Theme Color 1 (Lavender)', value: 'bg-brandTheme-01' },
        { label: 'Theme Color 2 (Light Blue)', value: 'bg-brandTheme-02' },
        { label: 'Theme Color 3 (Teal/Mint)', value: 'bg-brandTheme-03' },
        { label: 'Theme Color 4 (Yellow/Cream)', value: 'bg-brandTheme-04' },
        // Add other brandNeutral or theme colors if desired for eyebrow backgrounds
        { label: 'Neutral 01 (White/Lightest)', value: 'bg-brandNeutral-01' },
        { label: 'Neutral 02 (Light Grey)', value: 'bg-brandNeutral-02' },
      ],
      defaultValue: 'bg-brandTheme-02', // Default to current light blue/greenish
      admin: {
        description: 'Select a background color for the eyebrow text pill.',
      },
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      defaultValue: 'A smarter way to work',
    },
    {
      name: 'subTitle', // Changed from subTitle to match Vue component's expectation if needed, or ensure consistency
      label: 'Subtitle',
      type: 'textarea',
      defaultValue: 'Simplify project planning, streamline collaboration, and boost productivity all with TaskHub task management solution',
    },
    {
      name: 'titleImage',
      label: 'Image to Right of Title (Desktop Only)',
      type: 'upload',
      relationTo: 'media', // Ensure 'media' is your media collection slug
      required: false, // Optional image
      admin: {
        description: 'This image will appear to the right of the title and subtitle on medium screens and up. It will be hidden on mobile.'
      }
    },
    {
      name: 'cards',
      label: 'Feature Cards',
      type: 'array',
      minRows: 1,
      maxRows: 3, // Based on the home-02.vue example showing 3 cards
      fields: [
        {
          name: 'icon',
          label: 'Icon',
          type: 'upload',
          relationTo: 'media', // Ensure 'media' is your media collection slug
          required: true,
        },
        {
            name: 'iconBackgroundColor',
            label: 'Icon Background Color',
            type: 'select',
            admin: {
                description: 'Select a theme color for the icon background.'
            },
            options: [
                { label: 'Brand Theme 1 (Lavender)', value: 'bg-brandTheme-01' },
                { label: 'Brand Theme 2 (Light Blue)', value: 'bg-brandTheme-02' },
                { label: 'Brand Theme 3 (Teal/Mint)', value: 'bg-brandTheme-03' },
                { label: 'Brand Theme 4 (Yellow/Cream)', value: 'bg-brandTheme-04' },
            ],
            defaultValue: 'bg-brandTheme-01', // Default to Lavender
        },
        {
          name: 'cardTitle', // Ensure this matches the Vue component prop: card.cardTitle
          label: 'Card Title',
          type: 'text',
          required: true,
        },
        {
          name: 'cardText', // Ensure this matches the Vue component prop: card.cardText
          label: 'Card Text',
          type: 'textarea',
          required: true,
        },
        {
          name: 'invertStyle',
          label: 'Invert Card Style (Colored Background, White Icon Background)',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'If checked, the card will have a colored background (using the Icon Background Color) and the icon will have a white background.',
          },
        },
      ],
    },
  ],
}

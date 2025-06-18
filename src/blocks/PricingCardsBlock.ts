import type { Block } from 'payload';

// Re-using options from the original PricingPlansBlock or define locally if preferred
const sectionColorOptions: { label: string; value: string }[] = [
  { label: 'White', value: 'white' },
  { label: 'Light Grey', value: 'light-grey' },
  { label: 'Theme Color 1 (Lavender)', value: 'brand-50' }, // Updated label for brand-50
  { label: 'Brand 900 (Darkest Brand)', value: 'brand-900' },
  { label: 'Brand Primary', value: 'brand-primary' },
];

// Card background color options to match WikiPages iconBackgroundColor selector
const cardBgColorOptions: { label: string; value: string }[] = [
  { label: 'Default (Creamy Off-White)', value: 'default' }, // Special value to trigger PlanCard default
  { label: 'None (Uses Default)', value: 'none' }, // Effectively same as default for PlanCard
  { label: 'Theme Light Purple (White)', value: 'bg-brandTheme-01' }, // #FFFFFF
  { label: 'Theme Light Blue (Light Grey)', value: 'bg-brandTheme-02' },   // #F0F2F5
  { label: 'Theme Light Green (Med Grey)', value: 'bg-brandTheme-03' },  // #E1E4E8
  { label: 'Theme Light Yellow (Dark Grey)', value: 'bg-brandTheme-04' }, // #24292E
  { label: 'Pink Light', value: 'bg-pink-light' },
  { label: 'Purple Light', value: 'bg-purple-light' },
  { label: 'Brand Primary (Theme Blue)', value: 'bg-brand-primary' }, // Added for explicit selection
];

export const PricingCardsBlock: Block = {
  slug: 'pricingCards', // New slug
  interfaceName: 'PricingCardsBlock', // New interface name
  fields: [
    {
      name: 'eyebrowText',
      label: 'Section Eyebrow Text',
      type: 'text',
    },
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      defaultValue: 'Choose Your Plan',
    },
    {
      name: 'description', // Added for more context if needed
      label: 'Section Description',
      type: 'textarea',
    },
    {
      name: 'headerImage', // New field for the header image
      label: 'Header Image (Optional)',
      type: 'upload',
      relationTo: 'media', 
    },
    {
      name: 'enableBillingToggle',
      label: 'Enable Monthly/Annual Billing Toggle',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'sectionBackgroundColor',
      label: 'Section Background Color',
      type: 'select',
      options: sectionColorOptions,
      defaultValue: 'white',
    },
    {
      name: 'removeTopPadding',
      label: 'Remove Top Padding',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'removeBottomPadding',
      label: 'Remove Bottom Padding',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'plans',
      label: 'Pricing Plans (Define up to 3)',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'name',
          label: 'Plan Name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Plan Description/Tagline',
          type: 'textarea',
        },
        {
          name: 'monthlyPrice',
          label: 'Monthly Price (e.g., $29, POA)',
          type: 'text',
        },
        {
          name: 'annualPrice',
          label: 'Annual Price (e.g., $290, Optional, shown if toggle enabled)',
          type: 'text',
        },
        {
          name: 'priceSuffix',
          label: 'Price Suffix (e.g., /month, /user/month)',
          type: 'text',
          defaultValue: '/month',
        },
        {
          name: 'cardBackgroundColor',
          label: 'Card Background Color',
          type: 'select',
          options: cardBgColorOptions,
          defaultValue: 'default', // Default to trigger PlanCard's internal default
          admin: {
            description: 'Select a background color for this plan card. Popular plans will use Brand Primary by default. "None" also uses the default creamy off-white.',
          },
        },
        {
          name: 'ctaButtonLabel',
          label: 'CTA Button Label',
          type: 'text',
          defaultValue: 'Get Started',
        },
        {
          name: 'ctaButtonLink',
          label: 'CTA Button Link URL',
          type: 'text',
          defaultValue: '/contact-us',
        },
        {
          name: 'isMostPopular',
          label: 'Is this the most popular plan?',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'planSpecificFeatures',
          label: 'Features for this Plan',
          type: 'array',
          minRows: 0,
          fields: [
            {
              name: 'featureText',
              label: 'Feature Text',
              type: 'text',
              required: true,
            },
            {
              name: 'isIncluded', // Simple boolean for card display
              label: 'Is Included (shows checkmark, otherwise dimmed/crossed)',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'tooltip', // Optional tooltip for this specific feature on the card
              label: 'Tooltip for this feature (Optional)',
              type: 'text',
            }
          ],
        }
      ],
    },
    // Optional: A section-level CTA if needed, distinct from individual plan CTAs
    {
      name: 'sectionCtaText',
      label: 'Section CTA Button Text (Optional)',
      type: 'text',
    },
    {
      name: 'sectionCtaLink',
      label: 'Section CTA Button Link (Optional)',
      type: 'text',
    },
    {
      name: 'sectionCtaStyle',
      label: 'Section CTA Button Style',
      type: 'select',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
      ],
      defaultValue: 'primary',
      admin: {
        condition: (_, siblingData) => !!siblingData.sectionCtaText,
      }
    },
  ],
};

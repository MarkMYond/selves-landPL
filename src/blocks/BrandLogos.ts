import type { Block } from 'payload'

export const BrandLogos: Block = {
  slug: 'brandLogos',
  interfaceName: 'BrandLogosBlock',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional title to display above the logos.',
      },
    },
    {
      name: 'logos',
      label: 'Logos',
      type: 'array',
      minRows: 1,
      maxRows: 20, // Adjust as needed
      fields: [
        {
          name: 'logoImage',
          label: 'Logo Image',
          type: 'upload',
          relationTo: 'media', // Assuming your media collection is named 'media'
          required: true,
        },
        {
          name: 'altText',
          label: 'Alt Text',
          type: 'text',
          admin: {
            description: 'Descriptive text for the logo image (for accessibility).',
          },
        },
      ],
    },
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      options: [
        { label: 'Dark (Neutral 04)', value: 'dark' },
        { label: 'Light (Neutral 02)', value: 'light' },
        { label: 'Transparent', value: 'transparent' },
      ],
      defaultValue: 'dark',
      admin: {
        description: 'Select the background color for the logo section.',
      },
    },
    {
      name: 'paddingTop',
      label: 'Padding Top',
      type: 'select',
      options: [
        { label: 'None', value: 'none'},
        { label: 'Small', value: 'small'},
        { label: 'Medium', value: 'medium'},
        { label: 'Large', value: 'large'}
      ],
      defaultValue: 'medium',
    },
    {
      name: 'paddingBottom',
      label: 'Padding Bottom',
      type: 'select',
      options: [
        { label: 'None', value: 'none'},
        { label: 'Small', value: 'small'},
        { label: 'Medium', value: 'medium'},
        { label: 'Large', value: 'large'}
      ],
      defaultValue: 'medium',
    }
  ],
}

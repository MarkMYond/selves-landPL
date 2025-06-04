import type { Block } from 'payload'

export const WhatMakesUsDifferentSection: Block = {
  slug: 'whatMakesUsDifferentSection',
  labels: {
    singular: 'What Makes Us Different Section',
    plural: 'What Makes Us Different Sections',
  },
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow Text',
      type: 'text',
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text', // Using text for simplicity, can be richText if complex formatting is needed
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'cards',
      label: 'Benefit Cards',
      type: 'array',
      minRows: 1,
      maxRows: 3, // Based on the example from home-01 which has 3 cards
      fields: [
        {
          name: 'icon',
          label: 'Icon',
          type: 'upload',
          relationTo: 'media', // Assuming you have a 'media' collection
          required: true,
        },
        {
          name: 'iconBackgroundColor',
          label: 'Icon Background Color',
          type: 'select',
          options: [
            { label: 'Theme Color 1 (Purple)', value: 'theme-color-01' },
            { label: 'Theme Color 2 (Green)', value: 'theme-color-02' },
            { label: 'Theme Color 3 (Blue)', value: 'theme-color-03' },
            { label: 'Theme Color 4 (Yellow)', value: 'theme-color-04' },
            { label: 'Neutral 01 (White)', value: 'neutral-01' },
            { label: 'Neutral 04 (Dark)', value: 'neutral-04' },
          ],
          defaultValue: 'theme-color-04',
        },
        {
          name: 'cardTitle',
          label: 'Card Title',
          type: 'text',
          required: true,
        },
        {
          name: 'cardDescription',
          label: 'Card Description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'additionalCardImages',
          label: 'Additional Card Images',
          type: 'array',
          fields: [
            {
              name: 'imageFile',
              label: 'Image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'altText',
              label: 'Alt Text',
              type: 'text',
            },
          ],
        },
        // Note: The complex decorative images within cards from the Webflow example
        // (e.g., card-img-1, card-img-2) are not included as individual fields here.
        // They would typically be handled by static styling within the Vue component,
        // possibly varied by card index or a 'styleVariant' field if needed.
      ],
    },
  ],
}

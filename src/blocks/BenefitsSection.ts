import type { Block } from 'payload'

export const BenefitsSectionBlock: Block = {
  slug: 'benefitsSection',
  interfaceName: 'BenefitsSectionBlock',
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow Text',
      type: 'text',
      defaultValue: 'Benefits',
    },
    {
      name: 'title',
      label: 'Title',
      type: 'textarea', // Using textarea to allow for <br> if needed, or use RichText
      required: true,
      defaultValue: 'What makes us unique',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      defaultValue: 'Discover our innovative features, user-friendly design, and unmatched support that set us apart from the competition.',
    },
    {
      name: 'benefitCards',
      label: 'Benefit Cards',
      type: 'array',
      minRows: 1,
      maxRows: 4, // Typically 4 cards in this design
      fields: [
        {
          name: 'cardType',
          label: 'Card Type',
          type: 'radio',
          options: [
            { label: 'Content Card', value: 'content' },
            { label: 'Counter Card', value: 'counter' },
          ],
          defaultValue: 'content',
          required: true,
        },
        // Fields for Content Card
        {
          name: 'contentTitle',
          label: 'Content Card Title',
          type: 'text',
          admin: {
            condition: (_, siblingData: { cardType?: string }) => siblingData.cardType === 'content',
          },
        },
        {
          name: 'contentDescription',
          label: 'Content Card Description',
          type: 'textarea',
          admin: {
            condition: (_, siblingData: { cardType?: string }) => siblingData.cardType === 'content',
          },
        },
        {
          name: 'contentImages',
          label: 'Content Card Images (Max 2)',
          type: 'array',
          maxRows: 2,
          fields: [
            {
              name: 'image',
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
          admin: {
            condition: (_, siblingData: { cardType?: string }) => siblingData.cardType === 'content',
          },
        },
        // Fields for Counter Card
        {
          name: 'counterValue', // e.g., "25%"
          label: 'Counter Value (e.g., 25%)',
          type: 'text',
          admin: {
            condition: (_, siblingData: { cardType?: string }) => siblingData.cardType === 'counter',
          },
        },
        {
          name: 'counterText', // e.g., "Increase in Productivity"
          label: 'Counter Text',
          type: 'text',
          admin: {
            condition: (_, siblingData: { cardType?: string }) => siblingData.cardType === 'counter',
          },
        },
        {
          name: 'counterDescription',
          label: 'Counter Card Description',
          type: 'textarea',
          admin: {
            condition: (_, siblingData: { cardType?: string }) => siblingData.cardType === 'counter',
          },
        },
      ],
    },
  ],
}

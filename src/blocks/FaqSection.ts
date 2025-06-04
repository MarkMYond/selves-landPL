import type { Block } from 'payload'

export const FaqSectionBlock: Block = {
  slug: 'faqSection',
  interfaceName: 'FaqSectionBlock',
  fields: [
    {
      name: 'eyebrow', // Optional, based on "plans" text in Webflow, can be ignored if not needed
      label: 'Eyebrow Text (Optional)',
      type: 'text',
    },
    {
      name: 'eyebrowBackgroundColor',
      label: 'Eyebrow Background Color',
      type: 'select',
      required: false,
      defaultValue: 'bg-brandTheme-02', // Default consistent with SectionHeader
      options: [
        { label: 'Theme Color 1', value: 'bg-brandTheme-01' },
        { label: 'Theme Color 2 (Default)', value: 'bg-brandTheme-02' },
        { label: 'Theme Color 3', value: 'bg-brandTheme-03' },
        { label: 'Theme Color 4', value: 'bg-brandTheme-04' },
        { label: 'Neutral Light', value: 'bg-brandNeutral-01' },
        { label: 'Neutral Dark', value: 'bg-brandNeutral-04' },
      ],
      admin: {
        description: 'Select a background color for the eyebrow. Defaults to Theme Color 2.',
      },
    },
    {
      name: 'titleImage',
      label: 'Title Image (Optional)',
      type: 'upload',
      relationTo: 'media', 
      required: false,
      admin: {
        description: 'Optional image to display next to the title/subtitle (on larger screens).',
      },
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      defaultValue: 'Frequently asked questions',
    },
    {
      name: 'description',
      label: 'Description (Optional)',
      type: 'textarea',
    },
    {
      name: 'faqs',
      label: 'FAQ Items',
      type: 'array',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'question',
          label: 'Question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          label: 'Answer',
          type: 'textarea', // Or RichText for more formatting options
          required: true,
        },
      ],
    },
  ],
}

import type { Block } from 'payload'

const logoBgColorOptions = [
  { label: 'Theme Color 1 (Purple)', value: 'theme-color-01' },
  { label: 'Theme Color 2 (Green)', value: 'theme-color-02' },
  { label: 'Theme Color 3 (Blue)', value: 'theme-color-03' },
  { label: 'Theme Color 4 (Yellow)', value: 'theme-color-04' },
  { label: 'Purple', value: 'purple' },
  { label: 'Green', value: 'green' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Purple Light', value: 'purple-light' },
  { label: 'Default (Light Gray)', value: 'default' }
];

export const TestimonialsSection: Block = {
  slug: 'testimonialsSection',
  interfaceName: 'TestimonialsSectionBlock',
  fields: [
    {
      name: 'eyebrowText',
      label: 'Eyebrow Text',
      type: 'text',
    },
    {
      name: 'titleImage',
      label: 'Title Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      defaultValue: 'Our Case Studies',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      defaultValue:
        'Discover how our clients have leveraged our solution to achieve their goals.',
    },
    {
      name: 'caseStudies',
      label: 'Case Studies',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'quoteTitle',
          label: 'Quote Title',
          type: 'text',
          required: false,
        },
        {
          name: 'quote',
          label: 'Quote / Summary',
          type: 'textarea',
          required: true,
        },
        {
          name: 'authorName',
          label: 'Company Name / Author',
          type: 'text',
          required: true,
        },
        {
          name: 'authorImage',
          label: 'Author Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Upload a square image for the author/person.',
          },
        },
        {
          name: 'authorRole',
          label: 'Industry / Author Role',
          type: 'text',
        },
        {
          name: 'companyLogo',
          label: 'Company Logo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Upload a square company logo for the top of the card.',
          },
        },
        {
          name: 'companyLogoBackgroundColor',
          label: 'Company Logo Background Color',
          type: 'select',
          options: logoBgColorOptions,
          defaultValue: 'default',
        },
        {
          name: 'readMoreLink',
          label: 'Read More Link (URL)',
          type: 'text',
          admin: {
            description: 'Enter the full URL for the case study.',
          },
        },
      ],
    },
  ],
}

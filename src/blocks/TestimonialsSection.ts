import type { Block } from 'payload'

// Define an array of color options that can be mapped to Tailwind classes in the frontend component
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
      defaultValue: 'Our Case Studies', // Updated default title
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      // defaultValue can be removed or updated if a default description for case studies is desired
      defaultValue:
        'Discover how our clients have leveraged our solution to achieve their goals.', // Updated default description
    },
    {
      name: 'caseStudies', // Renamed from 'testimonials'
      label: 'Case Studies', // Updated label
      type: 'array',
      minRows: 1,
      maxRows: 6, // Adjust as needed
      fields: [
        {
          name: 'quoteTitle', // New field
          label: 'Quote Title',
          type: 'text',
          required: false, // Optional
        },
        {
          name: 'quote',
          label: 'Quote / Summary', // Updated label
          type: 'textarea',
          required: true,
        },
        {
          name: 'authorName',
          label: 'Company Name / Author', // Updated label
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
          label: 'Industry / Author Role', // Updated label
          type: 'text',
        },
        {
          name: 'companyLogo', // Renamed from authorImage
          label: 'Company Logo', // Updated label
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
          name: 'readMoreLink', // New field
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

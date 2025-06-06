import type { GlobalConfig } from 'payload'

const eyebrowBgColorOptions = [
  { label: 'Theme Color 1 (Purple)', value: 'theme-color-01' },
  { label: 'Theme Color 2 (Green)', value: 'theme-color-02' },
  { label: 'Theme Color 3 (Blue)', value: 'theme-color-03' },
  { label: 'Theme Color 4 (Yellow)', value: 'theme-color-04' },
  { label: 'Purple', value: 'purple' }, 
  { label: 'Green', value: 'green' },   
  { label: 'Yellow', value: 'yellow' }, 
  { label: 'Purple Light', value: 'purple-light' }, 
  { label: 'Default (Theme Color 2)', value: 'default' }
];

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer Content',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'ctaEnable',
      label: 'Enable CTA Section Above Footer',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'ctaPreTitle',
      label: 'CTA Pre-title (e.g., "Get Started")',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.ctaEnable,
      },
    },
    {
      name: 'ctaEyebrowBackgroundColor',
      label: 'CTA Eyebrow Background Color',
      type: 'select',
      options: eyebrowBgColorOptions,
      defaultValue: 'default', // Will map to theme-color-02 in frontend
      admin: {
        condition: (_, siblingData) => siblingData.ctaEnable,
      },
    },
    {
      name: 'ctaTitle',
      label: 'CTA Title',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.ctaEnable,
      },
    },
    {
      name: 'ctaDescription',
      label: 'CTA Description',
      type: 'textarea',
      admin: {
        condition: (_, siblingData) => siblingData.ctaEnable,
      },
    },
    {
      name: 'ctaButtonText',
      label: 'CTA Button Text',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.ctaEnable,
      },
    },
    {
      name: 'ctaButtonLink',
      label: 'CTA Button Link',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.ctaEnable,
      },
    },
    {
      name: 'ctaImage',
      label: 'CTA Decorative Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData.ctaEnable,
        description: 'Optional: Image displayed in the CTA section, typically on the right.',
      },
    },
    {
      name: 'logo',
      label: 'Footer Logo (Optional - currently hardcoded in frontend)',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tagline',
      label: 'Tagline / Strapline',
      type: 'textarea',
    },
    {
      name: 'linkColumns',
      label: 'Footer Link Columns',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          label: 'Column Title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          label: 'Links',
          type: 'array',
          fields: [
            {
              name: 'text',
              label: 'Link Text',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'subscribePlaceholder',
      label: 'Subscribe Input Placeholder Text',
      type: 'text',
      defaultValue: 'Email Address Here',
    },
    {
      name: 'newsletterTitle',
      label: 'Newsletter Section Title',
      type: 'text',
      defaultValue: 'Stay updated with our latest news and tips!',
    },
    {
      name: 'socialLinks',
      label: 'Social Media Links',
      type: 'array',
      fields: [
        {
          name: 'iconName',
          label: 'Phosphor Icon Name',
          type: 'text',
          admin: {
            description: 'Enter the Phosphor Icon name (e.g., TwitterLogo, LinkedinLogo). Do not include "Ph".',
          },
          required: true,
        },
        {
          name: 'url',
          label: 'Social Profile URL',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'copyright',
      label: 'Copyright Text (can include simple HTML)',
      type: 'textarea',
      required: true,
    },
  ],
}

export default Footer;

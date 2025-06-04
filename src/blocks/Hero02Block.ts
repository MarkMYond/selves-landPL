import type { Block } from 'payload'

export const Hero02Block: Block = {
  slug: 'heroSection02', // Corresponds to 'HeroSection02Payload' in frontend/src/payload-types.ts
  interfaceName: 'HeroSection02Payload', // This will be the generated interface name
  fields: [
    {
      name: 'eyebrowText',
      label: 'Eyebrow Text',
      type: 'text',
      admin: {
        description: 'Optional small text displayed above the main heading.',
      }
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'textarea',
      defaultValue: 'Transform the way your team works<br>',
    },
    {
      name: 'subheading',
      label: 'Subheading',
      type: 'textarea',
      defaultValue: 'Streamline your workflow, manage projects, and empower your team with task management solution.',
    },
    {
      name: 'buttons',
      label: 'Buttons',
      type: 'array',
      minRows: 0,
      maxRows: 2,
      fields: [
        {
          name: 'label',
          label: 'Button Label',
          type: 'text',
          required: true,
        },
        {
          name: 'variant',
          label: 'Button Variant',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Tertiary', value: 'tertiary' },
            { label: 'Border', value: 'border' },
          ],
          defaultValue: 'primary',
          required: true,
        },
        {
          name: 'type',
          label: 'Link Type',
          type: 'radio',
          options: [
            { label: 'Internal Link', value: 'internal' },
            { label: 'External URL', value: 'external' },
          ],
          defaultValue: 'internal',
          admin: {
            layout: 'horizontal',
          },
        },
        {
          name: 'internalLink',
          label: 'Internal Link',
          type: 'relationship',
          relationTo: 'web-pages',
          hasMany: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'internal',
          },
        },
        {
          name: 'externalLink',
          label: 'External URL',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'external',
          },
        },
        {
          name: 'newTab',
          label: 'Open in new tab',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'heroImage',
      label: 'Hero Image',
      type: 'upload',
      relationTo: 'media',
      required: false, 
      admin: {
        description: 'The main image for the hero section.',
      },
    },
    {
      name: 'arrowButtonText',
      label: 'Arrow Button Text (e.g., James)',
      type: 'text',
    },
  ],
}

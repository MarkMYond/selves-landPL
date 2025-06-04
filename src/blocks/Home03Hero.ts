import type { Block } from 'payload'

export const Home03Hero: Block = {
  slug: 'home03Hero',
  interfaceName: 'Home03HeroBlock',
  fields: [
    {
      name: 'taglinePrefix',
      label: 'Tagline Prefix',
      type: 'text',
      required: false,
    },
    {
      name: 'taglineSuffix',
      label: 'Tagline Suffix',
      type: 'text',
      required: false,
    },
    {
      name: 'headline',
      label: 'Headline',
      type: 'text',
      required: true,
    },
    {
      name: 'subheadline',
      label: 'Subheadline',
      type: 'textarea',
      required: false,
    },
    {
      name: 'formPlaceholder',
      label: 'Form Placeholder Text',
      type: 'text',
      defaultValue: 'Enter your email',
    },
    {
      name: 'formButtonText',
      label: 'Form Button Text',
      type: 'text',
      defaultValue: 'Get Started for free',
    },
    {
      name: 'imageTopLeft',
      label: 'Image Top Left',
      type: 'upload',
      relationTo: 'media', // Assuming you have a 'media' collection in Payload
      required: false,
    },
    {
      name: 'imageTopRight',
      label: 'Image Top Right',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'imageCenter',
      label: 'Image Center',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'imageBottom',
      label: 'Image Bottom',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}

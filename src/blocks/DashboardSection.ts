import type { Block } from 'payload'

export const DashboardSectionBlock: Block = {
  slug: 'dashboardSection', // Keeping the slug the same
  interfaceName: 'DashboardSectionBlockV2', // Changed interface name to reflect new structure
  fields: [
    {
      name: 'eyebrowText',
      label: 'Eyebrow Text',
      type: 'text',
      required: false,
    },
    {
      name: 'eyebrowBackgroundColor',
      label: 'Eyebrow Background Color',
      type: 'select',
      required: false,
      defaultValue: 'bg-brandTheme-02',
      options: [
        { label: 'Theme Color 1', value: 'bg-brandTheme-01' },
        { label: 'Theme Color 2 (Default)', value: 'bg-brandTheme-02' },
        { label: 'Theme Color 3', value: 'bg-brandTheme-03' },
        { label: 'Theme Color 4', value: 'bg-brandTheme-04' },
        { label: 'Neutral Light', value: 'bg-brandNeutral-01' }, // Assuming brandNeutral-01 is light
        { label: 'Neutral Dark', value: 'bg-brandNeutral-04' }, // Assuming brandNeutral-04 is dark
      ],
      admin: {
        description: 'Select a background color for the eyebrow. Defaults to Theme Color 2.',
      },
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      defaultValue: 'Get organized with TaskHub: your dashboard overview',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      defaultValue: 'TaskHub’s dashboard is designed to give you everything you need at a glance. With a clean, modern interface, you can monitor. Streamline your workflow, manage projects.',
    },
    {
      name: 'primaryButton',
      label: 'Primary Button',
      type: 'group',
      fields: [
        {
          name: 'text',
          label: 'Button Text',
          type: 'text',
          required: true,
          defaultValue: 'Book a Demo',
        },
        {
          name: 'url',
          label: 'Button URL',
          type: 'text',
          required: true,
          defaultValue: '/book-a-demo',
        },
      ],
    },
    {
      name: 'image',
      label: 'Main Image',
      type: 'upload',
      relationTo: 'media', // Assuming 'media' collection
      required: true,
    },
    {
      name: 'stats',
      label: 'Statistics',
      type: 'array',
      minRows: 1,
      maxRows: 3, // Based on current HTML
      fields: [
        // { // Removed 'value' field
        //   name: 'value',
        //   label: 'Stat Value (e.g., 5/5, 92/100)',
        //   type: 'text',
        //   required: true,
        // },
        {
          name: 'icon',
          label: 'Stat Icon',
          type: 'upload',
          relationTo: 'media',
          required: false, // Assuming icon is optional
        },
        {
          name: 'label',
          label: 'Stat Label',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Stat Description',
          type: 'textarea',
        },
      ],
    },
  ],
}

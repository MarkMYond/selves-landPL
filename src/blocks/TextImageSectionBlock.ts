import type { Block, Field } from 'payload'
import { backgroundColorOptions, createBackgroundColorField } from '../fields/backgroundColor' // Import options and helper
// import { containerWidthField } from '../fields/containerWidth' // Removed import

export const TextImageSectionBlock: Block = {
  slug: 'textImageSection',
  interfaceName: 'TextImageSectionBlock',
  fields: [
    { // Inlined definition for sectionBackgroundColor
      name: 'sectionBackgroundColor',
      label: 'Section Background Color',
      type: 'select',
      options: backgroundColorOptions,
      defaultValue: 'white',
      admin: {
        description: 'Select the background color.',
      },
    },
    createBackgroundColorField('contentBackgroundColor', 'Content Background Color'), // Keep other as helper for now
    // containerWidthField removed
     {
       name: 'removeTopPadding',
       type: 'checkbox',
       label: 'Remove Top Padding',
       defaultValue: false,
     },
     {
       name: 'removeBottomPadding',
       type: 'checkbox',
       label: 'Remove Bottom Padding',
       defaultValue: false,
     },
     {
       name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'titleStyle',
      type: 'select',
      label: 'Title Style',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Large (Homepage Style)', value: 'large' },
      ],
      defaultValue: 'standard',
      admin: {
        description: 'Select the display style for the title. "Large" matches the homepage hero title size.',
      },
    },
    {
      name: 'description',
      type: 'textarea', // Using textarea for consistency, can be richText if needed
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      required: false, // Making image optional as CareerSection didn't require it
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Image Position',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'right', // Default to image on the right (like PeopleSection)
      required: true,
    },
    {
      name: 'imageBackgroundColor',
      label: 'Image Background Color',
      type: 'select',
      required: false,
      defaultValue: 'none', // Default to transparent
      options: [
        { label: 'None (Transparent)', value: 'none' },
        { label: 'Theme Color 1', value: 'brandTheme-01' }, // Values should be 'brandTheme-01', not 'bg-brandTheme-01' if used with 'bg-' prefix in component
        { label: 'Theme Color 2', value: 'brandTheme-02' },
        { label: 'Theme Color 3', value: 'brandTheme-03' },
        { label: 'Theme Color 4', value: 'brandTheme-04' },
        { label: 'Neutral 01 (Lightest)', value: 'brandNeutral-01' },
        { label: 'Neutral 02 (Light)', value: 'brandNeutral-02' },
        { label: 'Neutral 03 (Mid)', value: 'brandNeutral-03' },
        { label: 'Neutral 04 (Dark)', value: 'brandNeutral-04' },
        { label: 'White', value: 'white' },
      ],
      admin: {
        description: 'Select a background color for the image container. Defaults to None (Transparent).',
      },
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Buttons',
      minRows: 0,
      maxRows: 2,
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Button URL',
          required: true,
        },
        {
          name: 'style',
          type: 'select',
          label: 'Button Style',
          options: [
            { label: 'Primary (Solid Background)', value: 'primary' },
            { label: 'Secondary (Outline)', value: 'secondary' },
          ],
          defaultValue: 'primary',
          required: true,
        },
      ],
    },
  ],
}

export default TextImageSectionBlock

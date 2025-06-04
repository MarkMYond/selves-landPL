import type { Block, Field } from 'payload' // Correct import path & Added Field
import { createBackgroundColorField } from '../fields/backgroundColor' // Fix: use .ts extension
import { containerWidthField } from '../fields/containerWidth' // Fix: use .ts extension

export const AiSupportSectionBlock: Block = {
  slug: 'aiSupportSection',
  interfaceName: 'AiSupportSectionBlock', // Optional: Ensure this name is unique
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea', // Or 'richText' if complex formatting is needed
      label: 'Description',
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits List',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Benefit Title',
          required: true,
        },
        {
          name: 'description',
          type: 'text', // Or 'textarea'
          label: 'Benefit Description',
        },
      ],
    },
    {
      name: 'link',
      type: 'group',
      label: 'CTA Link',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Link Text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link URL',
          required: true,
        },
        {
          name: 'style',
          type: 'select',
          label: 'Link Style',
          options: [
            { label: 'Primary (Solid Background)', value: 'primary' },
            { label: 'Secondary (Outline)', value: 'secondary' },
          ],
          defaultValue: 'primary',
          required: true,
        },
      ],
    },
    {
      name: 'checkmarkIconName', // Changed from checkmarkImage (upload) to icon name (text)
      label: 'Checkmark Phosphor Icon Name',
      type: 'text',
      defaultValue: 'CheckCircle', // Sensible default
      admin: {
        description: 'Optional. Enter the exact name of a Phosphor icon (e.g., CheckCircle, Check). See phosphoricons.com.',
      }
    },
    {
      name: 'characterImage',
      label: 'Character Illustration',
      type: 'upload',
      relationTo: 'media',
    },
    // Removed backgroundImage field
    // Use reusable background color fields
    createBackgroundColorField('sectionBackgroundColor', 'Section Background Color'),
    createBackgroundColorField('contentBackgroundColor', 'Content Background Color'),
    // Add container width field
    containerWidthField,
    // Add image position field
    {
      name: 'imagePosition',
      label: 'Image Position',
      type: 'select',
      options: [
        { label: 'Right (Default)', value: 'right' },
        { label: 'Left', value: 'left' },
      ],
      defaultValue: 'right',
      admin: {
        description: 'Determines if the character illustration appears on the left or right of the text content.',
      }
    },
    // Add padding control fields
    {
      name: 'reduceTopPadding',
      label: 'Reduce Top Padding',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Reduces the standard top padding for this section by half.',
      }
    },
    {
      name: 'reduceBottomPadding',
      label: 'Reduce Bottom Padding',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Reduces the standard bottom padding for this section by half.',
      }
    },
  ],
}

export default AiSupportSectionBlock;

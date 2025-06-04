import type { Block } from 'payload'
import { linkField } from '../fields/linkField' // Import the linkField helper

export const HeroBlogCardBlock: Block = {
  slug: 'HeroBlogCard',
  interfaceName: 'HeroBlogCardBlock',
  labels: {
    singular: 'Hero Blog Card',
    plural: 'Hero Blog Cards',
  },
  fields: [
    {
      name: 'animationId',
      label: 'Animation ID for Card',
      type: 'text',
      admin: {
        description: "Optional Webflow animation ID for the main card element (e.g., 504b0f0e-891f-785a-1291-8c4be535afcc)"
      }
    },
    {
      name: 'categoryText',
      label: 'Category Text',
      type: 'text',
      required: true,
      defaultValue: 'Innovation',
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      label: 'Excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'buttonText',
      label: 'Button Text',
      type: 'text',
      required: true,
      defaultValue: 'read more',
    },
    // Use the linkField helper, overriding the name and label for the group
    linkField({ 
      name: 'buttonLinkDetails', // This will be the group name, e.g., props.block.buttonLinkDetails.type
      label: 'Button Link Details', 
      // The 'label' field within this group (for link's text) might be less relevant if buttonText is always used.
      // We can hide it or make it optional if not needed by customizing the linkField further or its sub-fields.
      // For now, we'll keep the default linkField structure.
      // The 'label' field inside linkField is required by default.
      // We might need to make it not required if 'buttonText' is the primary source.
      // To do this, we'd need to modify linkField or pass specific overrides for its 'label' sub-field.
      // For now, let's assume it can be filled or we adjust linkField later if needed.
      // A quick way to make the inner label optional for this specific use:
      fields: [ // Overriding fields within the linkField
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
          name: 'label', // This is the label from the original linkField
          label: 'Link Accessible Name (Optional)', // Make it optional for this use case
          type: 'text',
          required: false, // Make it not required
        },
        { // Re-include internalLinkField, externalLinkField, newTabField from linkField definition
          name: 'internalLink',
          label: 'Internal Link',
          type: 'relationship',
          relationTo: ['web-pages'], 
          hasMany: false,
          admin: {
            condition: (_: any, siblingData: any) => siblingData?.type === 'internal',
          },
        },
        {
          name: 'externalLink',
          label: 'External URL',
          type: 'text',
          admin: {
            condition: (_: any, siblingData: any) => siblingData?.type === 'external',
          },
        },
        {
          name: 'newTab',
          label: 'Open in new tab',
          type: 'checkbox',
          defaultValue: false,
        },
      ]
    }),
    // Add other fields like background color, padding, etc., if this block needs to be generic
    // For now, sticking to the elements in the provided HTML.
  ],
}

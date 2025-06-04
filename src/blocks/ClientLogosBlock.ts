import type { Block, Field } from 'payload' // Added Field
import { createBackgroundColorField } from '../fields/backgroundColor' // Import reusable background color field
import { containerWidthField } from '../fields/containerWidth' // Import reusable container width field

export const ClientLogosBlock: Block = {
  slug: 'clientLogos', // required
  labels: {
    singular: 'Client Logos',
    plural: 'Client Logos Blocks',
  },
  interfaceName: 'ClientLogosBlock', // optional
  fields: [
    // Use reusable background color fields
    createBackgroundColorField('sectionBackgroundColor', 'Section Background Color'),
    createBackgroundColorField('contentBackgroundColor', 'Content Background Color'),
    // Add container width field
    containerWidthField,
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'logos',
      label: 'Logos',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'logo',
          label: 'Logo Image',
          type: 'upload',
          relationTo: 'media', // Assuming 'media' is the collection slug for images
          required: true,
        },
        // Removed altText field as it should come from the media library
      ],
    },
  ],
}

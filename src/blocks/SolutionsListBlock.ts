import type { Block, Field } from 'payload' // Added Field
import { createBackgroundColorField } from '../fields/backgroundColor' // Import reusable background color field
import { containerWidthField } from '../fields/containerWidth' // Import reusable container width field

export const SolutionsListBlock: Block = {
  slug: 'solutionsList', // required
  labels: {
    singular: 'Solutions List',
    plural: 'Solutions Lists',
  },
  interfaceName: 'SolutionsListBlock', // optional
  fields: [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      required: false, // Assuming title might be optional
    },
    {
      name: 'description',
      label: 'Section Description',
      type: 'textarea',
    },
    {
      name: 'sectionImage', // New field for the top-right image
      label: 'Section Image (Top Right)',
      type: 'upload',
      relationTo: 'media', // Assuming 'media' collection
      required: false, // Making it optional
      admin: {
        description: 'Optional image displayed at the top right of the section.',
      },
    },
    {
      name: 'solutions',
      label: 'Solutions',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'iconName',
          label: 'Phosphor Icon Name',
          type: 'text',
          required: true,
          admin: {
            description: 'Enter the exact name of a Phosphor icon (e.g., UsersThree, ChartLineUp). See phosphoricons.com for names. Case matters.',
          },
        },
        // REMOVED the per-item 'image' field here
        {
          name: 'solutionTitle',
          label: 'Solution Title',
          type: 'text',
          required: true,
        },
        {
          name: 'solutionDescription', // Renamed
          label: 'Solution Description',
          type: 'textarea',
          required: true,
        },
         {
          name: 'link',
          label: 'Link (Optional)',
          type: 'group',
          fields: [
              {
                  name: 'text',
                  label: 'Link Text',
                  type: 'text',
                  required: true,
              },
              {
                  name: 'url',
                  label: 'Link URL',
                  type: 'text',
                  required: true,
              }
          ]
        }
      ],
    },
    // Use reusable background color fields
    createBackgroundColorField('sectionBackgroundColor', 'Section Background Color'),
    createBackgroundColorField('contentBackgroundColor', 'Content Background Color'),
    // Add container width field
    containerWidthField,
    // Add padding control fields for "remove" functionality
    {
      name: 'removeTopPadding',
      label: 'Remove Top Padding',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Removes all top padding for this section.',
      }
    },
    {
      name: 'removeBottomPadding',
      label: 'Remove Bottom Padding',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Removes all bottom padding for this section.',
      }
    },
  ],
}

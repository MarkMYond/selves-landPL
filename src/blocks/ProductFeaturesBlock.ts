import type { Block } from 'payload';
import { createBackgroundColorField } from '../fields/backgroundColor'; // Import the function
import { containerWidthField } from '../fields/containerWidth'; // Import the field object

export const ProductFeaturesBlock: Block = {
  slug: 'productFeatures',
  interfaceName: 'ProductFeaturesBlock', // Ensure this is unique
  labels: {
    singular: 'Product Features',
    plural: 'Product Features Blocks',
  },
  fields: [
    createBackgroundColorField('sectionBackgroundColor', 'Section Background Color'), // Call the function
    createBackgroundColorField('imageColumnBackgroundColor', 'Image Column Background Color'), // Add this line
    containerWidthField, // Use the imported field object directly
    {
      name: 'features',
      label: 'Features',
      type: 'array',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea', // Or 'richText' if you need formatting
        },
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media', // Ensure 'media' is your media collection slug
          required: true,
          admin: {
            description: 'Image displayed when this feature is selected.',
          },
        },
      ],
    },
    {
      name: 'defaultImage',
      label: 'Default Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Image displayed initially before any feature is selected.',
      },
    },
  ],
};

// It's often good practice to have a default export if you might import it directly elsewhere,
// but the primary use is often via the index.
// export default ProductFeaturesBlock;

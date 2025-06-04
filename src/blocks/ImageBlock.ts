// Simplified version of the ImageBlock for PayloadCMS 3.33.0
import type { CollectionConfig } from 'payload';

type BlockConfig = {
  slug: string;
  labels: {
    singular: string;
    plural: string;
  };
  fields: Array<any>;
};

export const ImageBlock: BlockConfig = {
  slug: 'imageBlock',
  labels: {
    singular: 'Image Block',
    plural: 'Image Blocks',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
    },
    {
      name: 'width',
      type: 'select',
      label: 'Width',
      defaultValue: '100',
      options: [
        {
          label: 'Full width (100%)',
          value: '100',
        },
        {
          label: 'Three quarters width (75%)',
          value: '75',
        },
        {
          label: 'Half width (50%)',
          value: '50',
        },
        {
          label: 'One quarter width (25%)',
          value: '25',
        },
      ],
    },
    {
      name: 'alignment',
      type: 'select',
      label: 'Alignment',
      defaultValue: 'center',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
  ],
};

export default ImageBlock;

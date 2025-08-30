import type { Block } from 'payload';

export const RegImageCarouselBlock: Block = {
  slug: 'regImageCarousel',
  labels: {
    singular: 'Registry Image Carousel',
    plural: 'Registry Image Carousels',
  },
  fields: [
    {
      name: 'images',
      label: 'Images',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'visibleThumbnails',
      label: 'Number of Visible Thumbnails',
      type: 'number',
      required: false,
      min: 1,
      defaultValue: 4,
      admin: {
        description: 'Set how many thumbnails are visible in the carousel.',
      },
    },
  ],
};

export default RegImageCarouselBlock;

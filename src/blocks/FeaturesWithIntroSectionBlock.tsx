import type { Block } from 'payload'
import { TextImageSectionBlock } from './TextImageSectionBlock'

export const FeaturesWithIntroSectionBlock: Block = {
  slug: 'featuresWithIntroSection',
  interfaceName: 'FeaturesWithIntroSectionBlock',
  labels: {
    singular: 'Features with Intro Section',
    plural: 'Features with Intro Sections',
  },
  fields: [
    {
      name: 'sectionBackgroundColor',
      label: 'Section Background Color',
      type: 'select',
      options: [
        { label: 'None (Transparent)', value: 'none' },
        { label: 'White', value: 'white' },
        { label: 'Theme Color 1 (Lavender)', value: 'brand-50' }, // Updated label for brand-50
        { label: 'Gradient', value: 'gradient' },
      ],
      defaultValue: 'none',
      admin: {
        description: 'Select the background color for the entire section.',
      },
    },
    {
      name: 'contentBackgroundColor',
      label: 'Content Background Color',
      type: 'select',
      options: [
        { label: 'None (Transparent)', value: 'none' },
        { label: 'White', value: 'white' },
        { label: 'Theme Color 1 (Lavender)', value: 'brand-50' }, // Updated label for brand-50
      ],
      defaultValue: 'none',
      admin: {
        description: 'Select the background color for the content area within the section padding.',
      },
    },
    {
      name: 'removeTopPadding',
      label: 'Remove Top Padding',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'removeBottomPadding',
      label: 'Remove Bottom Padding',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      type: 'group',
      name: 'introContent',
      label: 'Introductory Content',
      fields: [
        {
          name: 'superTitle',
          label: 'Super Title (Optional Badge Text)',
          type: 'text',
        },
        {
          name: 'eyebrowBackgroundColor',
          label: 'Super Title Background Color',
          type: 'select',
          required: false,
          defaultValue: 'bg-brandTheme-02',
          options: [
            { label: 'Theme Color 1', value: 'bg-brandTheme-01' },
            { label: 'Theme Color 2 (Default)', value: 'bg-brandTheme-02' },
            { label: 'Theme Color 3', value: 'bg-brandTheme-03' },
            { label: 'Theme Color 4', value: 'bg-brandTheme-04' },
            { label: 'Neutral Light', value: 'bg-brandNeutral-01' },
            { label: 'Neutral Dark', value: 'bg-brandNeutral-04' },
          ],
        },
        {
          name: 'title',
          label: 'Main Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Main Description',
          type: 'textarea',
        },
        {
          name: 'titleImage',
          label: 'Intro Title Image (Optional)',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            description: 'Optional image for the introductory header section.',
          },
        },
      ],
    },
    {
      name: 'featureItems',
      label: 'Feature Items (Text-Image Sections)',
      type: 'array',
      minRows: 1,
      fields: TextImageSectionBlock.fields.filter(field => 
        'name' in field && 
        typeof field.name === 'string' && 
        ![
          'sectionBackgroundColor', 
          'contentBackgroundColor', 
          'containerWidth',
          'removeTopPadding',
          'removeBottomPadding'
        ].includes(field.name)
      ),
      admin: {
        components: {
          RowLabel: '@/admin/customComponents/FeatureItemRowLabel',
        },
      },
    },
  ],
}

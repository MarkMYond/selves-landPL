import type { Field } from 'payload';

export const seoField = (): Field => {
  return {
    name: 'meta',
    label: 'SEO Metadata',
    type: 'group',
    admin: {
      description: 'Optimize your page for search engines and social sharing.',
      position: 'sidebar',
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'title',
            label: 'Meta Title',
            type: 'text',
            admin: {
              description: 'Custom title for search engines. If blank, the page title will be used.',
              width: '100%',
            },
          },
        ],
      },
      {
        name: 'description',
        label: 'Meta Description',
        type: 'textarea',
        admin: {
          description: 'Brief description of this page for search results and social sharing.',
        },
      },
      {
        name: 'image',
        label: 'Social Sharing Image',
        type: 'upload',
        relationTo: 'media', // Assumes 'media' collection exists
        admin: {
          description: 'Image used when sharing this page on social media (1200×630px recommended).',
        },
      },
      {
        name: 'noIndex',
        label: 'No Index',
        type: 'checkbox',
        admin: {
          description: 'If checked, this page will not be indexed by search engines.',
        },
      },
      {
        name: 'schemaType',
        label: 'Schema.org Type',
        type: 'select',
        admin: {
          description: 'The type of content this page represents (for structured data).',
          isClearable: true,
        },
        options: [
          {
            label: 'Article',
            value: 'Article',
          },
          {
            label: 'WebPage',
            value: 'WebPage',
          },
          {
            label: 'FAQ Page',
            value: 'FAQPage',
          },
          {
            label: 'Product',
            value: 'Product',
          },
          {
            label: 'Service',
            value: 'Service',
          },
          {
            label: 'Organization',
            value: 'Organization',
          },
        ],
      },
      {
        name: 'keywords',
        label: 'Keywords',
        type: 'text',
        admin: {
          description: 'Comma-separated keywords (optional).',
        },
      },
    ],
  };
};

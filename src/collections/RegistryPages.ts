import type { CollectionConfig, CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';
import { generateRegistryNavigation } from '../hooks/generateRegistryNavigation';
import { slugField } from '../fields/slug';
import { seoField } from '../fields/seo';
import ContentBlock from '../blocks/ContentBlock';
import RegRichTextBlock from '../blocks/registry/RegRichTextBlock';
import RegCalloutBlock from '../blocks/registry/RegCalloutBlock';
import RegImageCarouselBlock from '../blocks/registry/RegImageCarouselBlock';
import RegColumnsBlock from '../blocks/registry/RegColumnsBlock';
import RegAccordionBlock from '../blocks/registry/RegAccordionBlock';
import RegTableBlock from '../blocks/registry/RegTableBlock';
import RegCodeBlock from '../blocks/registry/RegCodeBlock';

const afterChangeHook: CollectionAfterChangeHook = async ({ req }) => {
  console.log('Registry page changed, regenerating navigation...');
  try {
    await generateRegistryNavigation(req.payload);
  } catch (error) {
    console.error('Error regenerating registry navigation after change:', error);
  }
};

const afterDeleteHook: CollectionAfterDeleteHook = async ({ req }) => {
  console.log('Registry page deleted, regenerating navigation...');
  try {
    await generateRegistryNavigation(req.payload);
  } catch (error) {
    console.error('Error regenerating registry navigation after delete:', error);
  }
};

const RegistryPages: CollectionConfig = {
  slug: 'registry-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'slug', 'status', 'updatedAt'],
    description: 'Pages for the registry section.',
    group: 'Wiki & Registry',
    preview: (doc: any) => {
      const baseUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      return doc?.slug ? `${baseUrl}/registry/${doc.slug}` : null;
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
    },
    slugField('title'),
    {
      name: 'category',
      label: 'Category',
      type: 'relationship',
      relationTo: 'categories',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'template',
      label: 'Page Template',
      type: 'relationship',
  relationTo: 'page-templates',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Select a template to use for this page.'
      }
    },
    {
      name: 'pageBuilder',
      label: 'Page Content',
      type: 'blocks',
      minRows: 1,
      blocks: [
        ContentBlock,
        RegRichTextBlock,
        RegCalloutBlock,
        RegImageCarouselBlock,
        RegColumnsBlock,
        RegAccordionBlock,
        RegTableBlock,
        RegCodeBlock,
      ],
      required: true,
      defaultValue: [
  { blockType: 'regRichText', content: { root: { type: 'root', children: [{ type: 'paragraph', children: [] }] } } },
  { blockType: 'regCallout', type: 'regCallout', callout: '' },
  { blockType: 'regImageCarousel', type: 'regImageCarousel', images: [] },
  { blockType: 'regColumns', type: 'regColumns', columns: [] },
  { blockType: 'regAccordion', type: 'regAccordion', items: [] },
  { blockType: 'regTable', type: 'regTable', rows: [] },
  { blockType: 'regCode', type: 'regCode', code: '' },
      ],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
      index: true,
    },
    {
      name: 'sort',
      label: 'Sort Order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Order in navigation (lower numbers appear first).',
        step: 1,
      },
      index: true,
    },
    {
      name: 'isSectionHomepage',
      label: 'Is Section Homepage?',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'If true, this page acts as the main page for its category/section.',
      },
    },
    {
      name: 'parent',
      label: 'Parent Page',
      type: 'relationship',
      relationTo: 'registry-pages',
      admin: {
        position: 'sidebar',
      },
      index: true,
    },
    {
      name: 'icon',
      label: 'Icon (e.g., Phosphor Icon name)',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Optional icon name for navigation display.',
      },
    },
    {
      name: 'iconBackgroundColor',
      label: 'Icon Background Color',
      type: 'select',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Theme Light Purple', value: 'bg-brandTheme-01' },
        { label: 'Theme Light Blue', value: 'bg-brandTheme-02' },
        { label: 'Theme Light Green', value: 'bg-brandTheme-03' },
        { label: 'Theme Light Yellow', value: 'bg-brandTheme-04' },
        { label: 'Pink Light', value: 'bg-pink-light' },
        { label: 'Purple Light', value: 'bg-purple-light' },
      ],
      defaultValue: 'none',
      admin: {
        position: 'sidebar',
        description: 'Background color for the icon circle. Select "None" for no background.',
      },
    },
    {
      name: 'backgroundSettings',
      label: 'Micro Header',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'backgroundImage',
          label: 'Background Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional background image for the page.',
          },
        },
        {
          name: 'backgroundOverlay',
          label: 'Background Overlay',
          type: 'select',
          options: [
            { label: 'None / Default Gradient', value: 'default-gradient' },
            { label: 'Theme Light Purple', value: 'brandTheme-01' },
            { label: 'Theme Light Blue', value: 'brandTheme-02' },
            { label: 'Theme Light Green', value: 'brandTheme-03' },
            { label: 'Theme Light Yellow', value: 'brandTheme-04' },
            { label: 'Neutral White', value: 'brandNeutral-01' },
            { label: 'Neutral Off-White', value: 'brandNeutral-02' },
            { label: 'Neutral Dark Grey', value: 'brandNeutral-03' },
            { label: 'Neutral Near Black', value: 'brandNeutral-04' },
            { label: 'Neutral Light Grey (F1)', value: 'light-grey' },
          ],
          defaultValue: 'default-gradient',
          admin: {
            description: 'Select a background color for the header area.',
          },
        },
      ],
    },
    seoField(),
  ],
  timestamps: true,
  versions: false,
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create' && (!data.pageBuilder || data.pageBuilder.length === 0)) {
          if (data.template) {
            let templateId;
            if (typeof data.template === 'string') {
              templateId = data.template;
            } else if (typeof data.template === 'object' && data.template.id) {
              templateId = data.template.id;
            } else {
              console.log('[RegistryPages beforeChange] Could not determine template ID:', data.template);
              return data;
            }
            try {
              const templateDoc = await req.payload.findByID({
                collection: 'page-templates',
                id: templateId,
              });
              if (templateDoc && Array.isArray(templateDoc.blocks)) {
                // Ensure every block has a valid blockType matching the block slug
                data.pageBuilder = templateDoc.blocks.map((block: any) => ({
                  ...block,
                  blockType: block.blockType || block.slug || block.type,
                }));
                console.log('[RegistryPages beforeChange] Auto-populated pageBuilder from template:', templateId);
              } else {
                console.log('[RegistryPages beforeChange] Template found but no blocks:', templateDoc);
              }
            } catch (err) {
              console.error('[RegistryPages beforeChange] Error fetching template:', err);
            }
          } else {
            // No template selected, auto-populate with all registry blocks
            data.pageBuilder = [
              { blockType: 'regRichText', content: '' },
              { blockType: 'regCallout', callout: '' },
              { blockType: 'regImageCarousel', images: [] },
              { blockType: 'regColumns', columns: [] },
              { blockType: 'regAccordion', items: [] },
              { blockType: 'regTable', rows: [] },
              { blockType: 'regCode', code: '' },
            ];
            console.log('[RegistryPages beforeChange] Auto-populated pageBuilder with default registry blocks and minimal values');
          }
        }
        return data;
      },
    ],
    afterChange: [afterChangeHook],
    afterDelete: [afterDeleteHook],
  },
};

export default RegistryPages;

import type { CollectionConfig, CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';
import { generateWikiNavigation } from '../hooks/generateWikiNavigation';
import { slugField } from '../fields/slug';
import { seoField } from '../fields/seo';
import ContentBlock from '../blocks/ContentBlock';

const afterChangeHook: CollectionAfterChangeHook = async ({ req }) => {
  try {
    await generateWikiNavigation(req.payload);
  } catch (error) {
    // console.error('Error regenerating wiki navigation after change:', error);
  }
};

const afterDeleteHook: CollectionAfterDeleteHook = async ({ req }) => {
  try {
    await generateWikiNavigation(req.payload);
  } catch (error) {
    // console.error('Error regenerating wiki navigation after delete:', error);
  }
};

const WikiPages: CollectionConfig = {
  slug: 'wiki-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'updatedAt'],
    description: 'Pages for the wiki section.',
    group: 'Wiki & Registry',
    preview: (doc: any) => {
      const baseUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      return doc?.slug ? `${baseUrl}/wiki/${doc.slug}` : null;
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
      name: 'pageBuilder',
      label: 'Page Content',
      type: 'blocks',
      minRows: 1,
      blocks: [ContentBlock],
      required: true,
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
      relationTo: 'wiki-pages',
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
    afterChange: [afterChangeHook],
    afterDelete: [afterDeleteHook],
  },
};

export default WikiPages;

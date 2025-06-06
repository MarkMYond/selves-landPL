import type { Field } from 'payload'

export const internalLinkField = (overrides: Partial<Field> = {}): Field => ({
  name: 'internalLink',
  label: 'Internal Link',
  type: 'relationship',
  relationTo: 'web-pages', 
  hasMany: false,
  admin: {
    condition: (_: any, siblingData: any) => siblingData?.type === 'internal',
  },
})

export const externalLinkField = (overrides: Partial<Field> = {}): Field => ({
  name: 'externalLink',
  label: 'External URL',
  type: 'text',
  admin: {
    condition: (_: any, siblingData: any) => siblingData?.type === 'external',
  },
})

export const linkField = (overrides: Partial<Field> = {}): Field => ({
  name: 'link',
  label: 'Link',
  type: 'group',
  fields: [
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
      name: 'label',
      label: 'Label',
      type: 'text',
      required: true,
    },
    internalLinkField(), 
    externalLinkField(),
    {
      name: 'newTab',
      label: 'Open in new tab',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
})

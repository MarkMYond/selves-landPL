import type { FieldHook } from 'payload'
import type { Field } from 'payload'
import deepMerge from '../utils/deepMerge' 
import formatSlug from '../utils/formatSlug' 

// Hook to format the slug from the source field
const format =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }
    const fallbackData = data?.[fallback] || originalDoc?.[fallback]

    if (fallbackData && typeof fallbackData === 'string') {
      return formatSlug(fallbackData)
    }

    return value
  }

// Define the slug field configuration
type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      index: true, 
      required: true,
      admin: {
        position: 'sidebar',
        description: 'A unique identifier for the page, used in the URL.',
      },
      hooks: {
        beforeValidate: [format(fieldToUse)],
      },
      unique: true, 
      validate: (val: unknown) => {
        if (typeof val === 'string' && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val)) {
          return 'Slug can only contain lowercase letters, numbers, and hyphens.'
        }
        return true;
      },
    },
    overrides,
  )

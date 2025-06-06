import type { Field } from 'payload'

export const backgroundColorOptions = [
  { label: 'None', value: 'none' },
  { label: 'White', value: 'white' },
  { label: 'Primary Light', value: 'brand-50' },
  { label: 'Gradient', value: 'gradient' },
]

export const createBackgroundColorField = (name: string, label: string): Field => ({
  name: name,
  label: label,
  type: 'select',
  options: backgroundColorOptions,
  defaultValue: 'none',
  admin: {
    description: 'Select the background color.',
  },
})

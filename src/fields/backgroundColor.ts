import type { Field } from 'payload'

// Define standard background color options
export const backgroundColorOptions = [
  { label: 'None', value: 'none' },
  { label: 'White', value: 'white' },
  // { label: 'Light Grey', value: 'light-grey' }, // Maps to bg-light-grey or bg-gray-100 in Tailwind
  { label: 'Primary Light', value: 'brand-50' }, // Maps to bg-brand-50
  { label: 'Gradient', value: 'gradient' }, // Maps to bg-brand-50
  // { label: 'Primary Dark', value: 'brand-900' }, // Maps to bg-brand-900
  // { label: 'Brand Primary', value: 'brand-primary' }, // Maps to bg-brand-primary
]

// Reusable Background Color Field Function
// Allows specifying field name (e.g., 'sectionBackgroundColor', 'contentBackgroundColor') and label
export const createBackgroundColorField = (name: string, label: string): Field => ({
  name: name,
  label: label,
  type: 'select',
  options: backgroundColorOptions,
  defaultValue: 'none', // Default to white if not specified
  admin: {
    description: 'Select the background color.',
  },
})

// Example Usage (Import and call createBackgroundColorField in your block/collection):
// import { createBackgroundColorField } from '../fields/backgroundColor';
//
// fields: [
//   createBackgroundColorField('sectionBackgroundColor', 'Section Background Color'),
//   createBackgroundColorField('contentBackgroundColor', 'Content Background Color'),
//   // ... other fields
// ]

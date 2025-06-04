import type { Field } from 'payload';

// Define standard container width options
export const containerWidthOptions: { label: string; value: string }[] = [
  { label: 'Default', value: 'default' }, // Component decides its default width
  { label: 'Medium', value: 'medium' }, // Maps to a medium max-width class (e.g., max-w-4xl or max-w-5xl)
  { label: 'Wide', value: 'wide' },     // Maps to a wide max-width class (e.g., max-w-7xl or similar)
  { label: 'Full Width', value: 'full' }, // Maps to max-w-none or similar to remove constraints
];

// Reusable Container Width Field
export const containerWidthField: Field = {
  name: 'containerWidth',
  label: 'Container Width',
  type: 'select',
  options: containerWidthOptions,
  defaultValue: 'default', // Default to component's inherent width
  admin: {
    description: 'Select the maximum width for the content container within this block.',
    width: '50%', // Use half width in the admin UI
  },
};

// Example Usage (Import and add containerWidthField to your block's fields array):
// import { containerWidthField } from '../fields/containerWidth';
//
// fields: [
//   // ... other fields
//   containerWidthField,
//   // ... other fields
// ]

import type { Field } from 'payload';

export const containerWidthOptions: { label: string; value: string }[] = [
  { label: 'Default', value: 'default' },
  { label: 'Medium', value: 'medium' },
  { label: 'Wide', value: 'wide' },
  { label: 'Full Width', value: 'full' },
];

export const containerWidthField: Field = {
  name: 'containerWidth',
  label: 'Container Width',
  type: 'select',
  options: containerWidthOptions,
  defaultValue: 'default',
  admin: {
    description: 'Select the maximum width for the content container within this block.',
    width: '50%',
  },
};

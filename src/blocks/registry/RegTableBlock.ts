import type { Block } from 'payload';

export const RegTableBlock: Block = {
  slug: 'regTable',
  labels: {
    singular: 'Registry Table',
    plural: 'Registry Tables',
  },
  fields: [
    {
      name: 'rows',
      label: 'Table Rows',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'cells',
          label: 'Cells',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'value',
              label: 'Cell Value',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export default RegTableBlock;

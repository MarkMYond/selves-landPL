import type { Block } from 'payload';

export const ContentBlock: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
      // The editor will be configured globally in payload.config.ts
      // No specific editor config needed here unless overriding globals.
    },
    // Optionally, add other simple fields to this content block if needed later,
    // for example, a field for background color or layout adjustments.
    // For now, keeping it minimal as requested.
  ],
};

export default ContentBlock;

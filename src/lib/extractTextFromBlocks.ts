import type { Block } from 'payload';

// Helper function to extract text from a single block
function extractTextFromBlock(block: any): string {
  let text = '';
  if (!block) return text;

  // Check for common text-containing properties
  if (typeof block.text === 'string') text += block.text + ' ';
  if (typeof block.title === 'string') text += block.title + ' ';
  if (typeof block.heading === 'string') text += block.heading + ' ';
  if (typeof block.content === 'string') text += block.content + ' ';
  if (typeof block.caption === 'string') text += block.caption + ' ';
  if (typeof block.label === 'string') text += block.label + ' ';
  if (typeof block.name === 'string') text += block.name + ' '; // For user names, etc.

  // Handle rich text (Lexical)
  if (block.richText && Array.isArray(block.richText.root?.children)) {
    block.richText.root.children.forEach((child: any) => {
      if (child.type === 'paragraph' && Array.isArray(child.children)) {
        child.children.forEach((textNode: any) => {
          if (textNode.type === 'text' && typeof textNode.text === 'string') {
            text += textNode.text + ' ';
          }
        });
      }
      // Add more specific lexical node handlers if needed (e.g., headings, lists)
    });
  }
  
  // Recursively extract from nested blocks or fields
  for (const key in block) {
    if (typeof block[key] === 'object' && block[key] !== null) {
      if (Array.isArray(block[key])) {
        block[key].forEach((item: any) => {
          text += extractTextFromBlock(item) + ' ';
        });
      } else {
        text += extractTextFromBlock(block[key]) + ' ';
      }
    }
  }
  return text.trim();
}

// Main function to extract all text content from an array of blocks
export function extractTextFromBlocks(blocks: any[] | undefined | null): string {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return '';
  }

  let allText = '';
  blocks.forEach(block => {
    // The actual content of a block is usually within a property named after its 'blockType'
    // or sometimes directly in the block if it's a simple structure.
    // We'll try to be somewhat generic here.
    const blockType = (block as any).blockType;
    if (blockType && block[blockType]) {
      allText += extractTextFromBlock(block[blockType]) + ' ';
    } else {
      // Fallback for blocks that might not follow the blockType convention
      allText += extractTextFromBlock(block) + ' ';
    }
  });

  // Clean up extra spaces
  return allText.replace(/\s+/g, ' ').trim();
}

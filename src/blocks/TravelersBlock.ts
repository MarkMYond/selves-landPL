import type { Block } from 'payload'
import { createBackgroundColorField } from '../fields/backgroundColor'
import { containerWidthField } from '../fields/containerWidth'

export const TravelersBlock: Block = {
  slug: 'travelers',
  interfaceName: 'TravelersBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '⚙️ Layout Settings',
          fields: [
            createBackgroundColorField('sectionBackgroundColor', 'Section Background Color'),
            createBackgroundColorField('contentBackgroundColor', 'Content Background Color'),
            containerWidthField,
            {
              name: 'removeTopPadding',
              type: 'checkbox',
              label: 'Remove Top Padding',
              defaultValue: false,
            },
            {
              name: 'removeBottomPadding',
              type: 'checkbox',
              label: 'Remove Bottom Padding',
              defaultValue: false,
            },
          ],
        },
        {
          label: '📝 Left Side Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
            },
            {
              name: 'titleStyle',
              type: 'select',
              label: 'Title Style',
              options: [
                { label: 'Standard', value: 'standard' },
                { label: 'Large (Homepage Style)', value: 'large' },
              ],
              defaultValue: 'standard',
              admin: {
                description: 'Select the display style for the title. "Large" matches the homepage hero title size.',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
            },
            {
              name: 'buttons',
              type: 'array',
              label: 'Buttons',
              minRows: 0,
              maxRows: 2,
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  label: 'Button Text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'Button URL',
                  required: true,
                },
                {
                  name: 'style',
                  type: 'select',
                  label: 'Button Style',
                  options: [
                    { label: 'Primary (Solid Background)', value: 'primary' },
                    { label: 'Secondary (Outline)', value: 'secondary' },
                  ],
                  defaultValue: 'primary',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: '💬 Chat Feature',
          fields: [
            {
              name: 'defaultConversationStarter',
              label: 'Default Conversation Starter',
              type: 'text',
              defaultValue: 'I want a city break to london as a couple looking at the Royal Family',
              admin: {
                description: 'This text will be suggested as a starting prompt across all tabs',
              },
            },
            {
              name: 'tabsFeature',
              label: 'Conversation Tabs',
              type: 'array',
              minRows: 1,
              maxRows: 5,
              admin: {
                description: 'Add up to 5 conversation tabs',
              },
              fields: [
                {
                  name: 'tabTitle',
                  type: 'text',
                  label: 'Tab Title',
                  required: true,
                },
                {
                  name: 'tabImage',
                  type: 'upload',
                  label: 'Tab Image',
                  relationTo: 'media',
                  admin: {
                    description: 'Image to display with the tab description (before chat is activated)',
                  },
                },
                {
                  name: 'tabContent',
                  type: 'textarea',
                  label: 'Tab Content (Introduction)',
                  required: true,
                  admin: {
                    description: 'Introductory text displayed at the top of the tab',
                  },
                },
                {
                  name: 'initialUserMessage',
                  label: 'Initial User Message',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'This will appear as if the user has already asked this question',
                  },
                  defaultValue: 'I want a city break to London as a couple looking at the Royal Family',
                },
                {
                  name: 'initialAIResponse',
                  label: 'Initial AI Response',
                  type: 'textarea',
                  required: true,
                  admin: {
                    description: 'This will appear as the AI\'s response to the initial user message',
                  },
                  defaultValue: 'I\'d be happy to help you plan a Royal Family-focused city break to London! The British monarchy is a fascinating institution with a rich history. Here are some key attractions you might want to include:\n\n- Buckingham Palace (try to catch the Changing of the Guard)\n- Kensington Palace (former home of Princess Diana)\n- Windsor Castle (a short trip from central London)\n- Westminster Abbey (site of royal weddings and coronations)\n\nWhen would you like to visit, and how many days are you planning to stay?',
                },
                {
                  name: 'modelName',
                  label: 'AI Model',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Gemini Flash 2.0 (Standard)', value: 'gemini-flash-2.0' },
                    { label: 'Gemini 2.5 Flash Preview (Feature-rich)', value: 'gemini-2.5-flash-preview-04-17' },
                  ],
                  defaultValue: 'gemini-flash-2.0',
                  admin: {
                    description: 'Which AI model to use for this tab',
                  },
                },
                {
                  name: 'systemPrompt',
                  label: 'System Prompt',
                  type: 'textarea',
                  required: true,
                  admin: {
                    description: 'Instructions for how the AI should behave in this tab (not visible to users)',
                  },
                  defaultValue: 'You are a knowledgeable travel assistant helping users with trip planning and advice. Be friendly, concise, and provide specific recommendations.',
                },
                {
                  name: 'avatarName',
                  label: 'AI Assistant Name',
                  type: 'text',
                  defaultValue: 'Travel Assistant',
                  admin: {
                    description: 'Name of the AI assistant in this tab',
                  },
                },
                {
                  name: 'avatarImage',
                  type: 'upload',
                  label: 'Avatar Image',
                  relationTo: 'media',
                  admin: {
                    description: 'Optional profile image for the AI assistant',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default TravelersBlock;

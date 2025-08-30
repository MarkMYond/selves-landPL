import type { Block } from 'payload';
import { linkField } from '../fields/linkField'; // Assuming you want to reuse your linkField for privacy policy
import type { Media } from '../../../frontend/src/payload-types'; // For contentImage type

export const ContactFormBlock: Block = {
  slug: 'ContactForm',
  interfaceName: 'ContactFormBlock',
  labels: {
    singular: 'Contact Form with Content',
    plural: 'Contact Forms with Content',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Left Content',
          fields: [
            {
              name: 'contentEyebrow',
              label: 'Content Eyebrow Text',
              type: 'text',
            },
            {
              name: 'contentTitle',
              label: 'Content Title',
              type: 'text',
            },
            {
              name: 'contentDescription',
              label: 'Content Description',
              type: 'textarea',
            },
            {
              name: 'contentImage',
              label: 'Content Image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'contentImagePosition',
              label: 'Image Position Relative to Text',
              type: 'select',
              options: [
                { label: 'Image Above Text', value: 'above' },
                { label: 'Image Below Text', value: 'below' },
              ],
              defaultValue: 'above',
            },
          ],
        },
        // Form Configuration Tab
        {
          label: 'Form Settings',
          fields: [
            {
              name: 'formTitle',
              label: 'Form Title (Optional, above form fields)',
              type: 'text',
              admin: {
                description: 'Optional title displayed directly above the form fields.',
              },
            },
            {
              name: 'recipientEmail',
              label: 'Recipient Email Address',
              type: 'email',
              required: true,
              admin: {
                description: 'Email address where form submissions will be sent.',
              },
            },
            {
              name: 'submitButtonText',
              label: 'Submit Button Text',
              type: 'text',
              defaultValue: 'Send Message',
            },
            {
              name: 'showNameField',
              label: 'Show Name Field',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'requireNameField',
              label: 'Require Name Field',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                condition: (_, siblingData) => siblingData.showNameField,
              },
            },
            {
              name: 'showCompanyField',
              label: 'Show Company Field',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'requireCompanyField',
              label: 'Require Company Field',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                condition: (_, siblingData) => siblingData.showCompanyField,
              },
            },
            {
              name: 'showSubjectField',
              label: 'Show Subject Field',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'requireSubjectField',
              label: 'Require Subject Field',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                condition: (_, siblingData) => siblingData.showSubjectField,
              },
            },
            {
              name: 'showMessageField',
              label: 'Show Message Field',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'requireMessageField',
              label: 'Require Message Field',
              type: 'checkbox',
              defaultValue: true, 
              admin: {
                condition: (_, siblingData) => siblingData.showMessageField,
              },
            },
            {
              name: 'messageFieldLabel',
              label: 'Message Field Label',
              type: 'text',
              defaultValue: 'Your Message',
              admin: {
                condition: (_, siblingData) => siblingData.showMessageField,
              }
            },
            {
              name: 'privacyPolicyText',
              label: 'Privacy Policy Agreement Text',
              type: 'text',
              defaultValue: 'By reaching out to us, you agree to our',
              admin: {
                description: 'Text that appears before the privacy policy link. The link itself is configured below.',
              }
            },
            linkField({ 
              name: 'privacyPolicyLinkDetails', 
              label: 'Privacy Policy Link',
              fields: [ 
                {
                  name: 'type', label: 'Link Type', type: 'radio',
                  options: [{ label: 'Internal Link', value: 'internal' }, { label: 'External URL', value: 'external' }],
                  defaultValue: 'internal', admin: { layout: 'horizontal' },
                },
                { name: 'label', label: 'Link Text (e.g., Privacy Policy)', type: 'text', defaultValue: 'Privacy Policy.', required: true },
                { 
                  name: 'internalLink', label: 'Internal Page', type: 'relationship', relationTo: ['web-pages'],
                  hasMany: false, admin: { condition: (_: any, siblingData: any) => siblingData?.type === 'internal' } 
                },
                { 
                  name: 'externalLink', label: 'External URL', type: 'text', 
                  admin: { condition: (_: any, siblingData: any) => siblingData?.type === 'external' } 
                },
                { name: 'newTab', label: 'Open in new tab', type: 'checkbox', defaultValue: false },
              ]
            }),
          ]
        }
      ]
    }
  ],
};

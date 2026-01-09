import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const ScheduledEmails: CollectionConfig = {
  slug: 'scheduled-emails',
  labels: {
    singular: {
      pl: 'Zaplanowana Wiadomość',
      en: 'Scheduled Email',
    },
    plural: {
      pl: 'Zaplanowane Wiadomości',
      en: 'Scheduled Emails',
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'orderId',
    defaultColumns: ['orderId', 'customerEmail', 'status', 'scheduledAt'],
    components: {
      afterListTable: ['@/components/TriggerSendingScheduledEmails'],
    },
  },
  fields: [
    {
      name: 'orderId',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'scheduledAt',
      type: 'date',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'expiresAt',
      type: 'date',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Sent', value: 'sent' },
        { label: 'Failed', value: 'failed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
    {
      name: 'emailType',
      type: 'select',
      required: true,
      defaultValue: 'post_purchase_questions',
      admin: {
        readOnly: true,
      },
      options: [{ label: 'Post purchase questions', value: 'post_purchase_questions' }],
    },
    {
      name: 'token',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'isSurveyCompleted',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        readOnly: true,
      },
    },
  ],
}

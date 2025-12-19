import type { CollectionConfig } from 'payload'

export const ScheduledEmails: CollectionConfig = {
  slug: 'scheduled-emails',
  admin: {
    useAsTitle: 'orderId',
    components: {
      afterListTable: ['@/components/TriggerSendingScheduledEmails'],
    },
  },
  fields: [
    {
      name: 'orderId',
      type: 'text',
      required: true,
    },
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'scheduledAt',
      type: 'date',
      required: true,
    },
    {
      name: 'expiresAt',
      type: 'date',
      required: true,
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
      options: [{ label: 'Post purchase questions', value: 'post_purchase_questions' }],
    },
    {
      name: 'token',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}

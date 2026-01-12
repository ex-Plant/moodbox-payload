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
    defaultColumns: ['linkedOrder', 'customerEmail', 'status', 'scheduledAt'],
    components: {
      afterListTable: ['@/components/TriggerSendingScheduledEmails'],
    },
  },
  fields: [
    {
      name: 'linkedOrder',
      type: 'relationship',
      label: {
        pl: 'Powiązane zamówienie',
        en: 'Linked Order',
      },
      relationTo: 'orders',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        components: {
          Cell: '@/components/OrderLinkCell',
        },
      },
    },
    {
      name: 'orderId',
      type: 'text',
      label: {
        pl: 'ID zamówienia',
        en: 'Order ID',
      },
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'customerEmail',
      type: 'email',
      label: {
        pl: 'Email klienta',
        en: 'Customer Email',
      },
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'scheduledAt',
      type: 'date',
      label: {
        pl: 'Zaplanowane na',
        en: 'Scheduled At',
      },
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'expiresAt',
      type: 'date',
      label: {
        pl: 'Wygasa',
        en: 'Expires At',
      },
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      label: {
        pl: 'Status',
        en: 'Status',
      },
      required: true,
      defaultValue: 'pending',
      options: [
        { label: { pl: 'Oczekujący', en: 'Pending' }, value: 'pending' },
        { label: { pl: 'Wysłany', en: 'Sent' }, value: 'sent' },
        { label: { pl: 'Niepowodzenie', en: 'Failed' }, value: 'failed' },
        { label: { pl: 'Anulowany', en: 'Cancelled' }, value: 'cancelled' },
      ],
    },
    {
      name: 'emailType',
      type: 'select',
      label: {
        pl: 'Typ wiadomości',
        en: 'Email Type',
      },
      required: true,
      defaultValue: 'post_purchase_questions',
      admin: {
        readOnly: true,
      },
      options: [
        {
          label: { pl: 'Pytania po zakupie', en: 'Post purchase questions' },
          value: 'post_purchase_questions',
        },
      ],
    },
    {
      name: 'token',
      type: 'text',
      label: {
        pl: 'Token',
        en: 'Token',
      },
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'isSurveyCompleted',
      type: 'checkbox',
      label: {
        pl: 'Ankieta wypełniona',
        en: 'Survey Completed',
      },
      defaultValue: false,
      admin: {
        readOnly: true,
      },
    },
  ],
}

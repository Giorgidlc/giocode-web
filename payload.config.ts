import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { Leads } from './src/collections/Leads'
import { Services } from './src/collections/Services'

export default buildConfig({

  email: nodemailerAdapter({
    defaultFromAddress: 'noreply@giocode.dev',
    defaultFromName: 'Giocode',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),

  secret: process.env.PAYLOAD_SECRET || '',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  editor: lexicalEditor(),

  collections: [Leads, Services],

  plugins: [
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        select: true,
        radio: true,
        email: true,
        checkbox: true,
        number: true,
        date: false,
        payment: false,
      },
      defaultToEmail: 'gio@giocode.dev',
    }),
  ],
})
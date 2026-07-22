import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

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

  collections: [
    {
      slug: 'leads',
      fields: [
        { name: 'nombre', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'telefono', type: 'text' },
        { name: 'mensaje', type: 'textarea' },
        {
          name: 'servicio',
          type: 'select',
          options: [
            { label: 'Desarrollo Web', value: 'web' },
            { label: 'App Móvil', value: 'mobile' },
            { label: 'Diseño UI/UX', value: 'uiux' },
            { label: 'Consultoría', value: 'consulting' },
          ],
        },
        {
          name: 'estado',
          type: 'select',
          options: [
            { label: 'Nuevo', value: 'new' },
            { label: 'Contactado', value: 'contacted' },
            { label: 'Convertido', value: 'converted' },
            { label: 'Perdido', value: 'lost' },
          ],
          defaultValue: 'new',
        },
      ],
      admin: {
        useAsTitle: 'nombre',
        defaultColumns: ['nombre', 'email', 'servicio', 'estado'],
      },
    },
    {
      slug: 'services',
      fields: [
        { name: 'titulo', type: 'text', required: true },
        { name: 'descripcion', type: 'textarea' },
        { name: 'precio', type: 'number' },
        { name: 'activo', type: 'checkbox', defaultValue: true },
        { name: 'icono', type: 'text' },
      ],
      admin: {
        useAsTitle: 'titulo',
      },
    },
  ],

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
import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  fields: [
    { name: 'titulo', type: 'text', required: true },
    {
      name: 'value',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description:
          'Identificador único del servicio que usa el formulario de contacto (ej. web, mobile, uiux).',
      },
    },
    { name: 'descripcion', type: 'textarea' },
    { name: 'precio', type: 'number' },
    { name: 'activo', type: 'checkbox', defaultValue: true },
    { name: 'icono', type: 'text' },
  ],
  admin: {
    useAsTitle: 'titulo',
  },
}

import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
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
}

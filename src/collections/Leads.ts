import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
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
}

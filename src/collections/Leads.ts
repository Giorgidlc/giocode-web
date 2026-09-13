import type { CollectionConfig, TextFieldSingleValidation } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation !== 'create' || !data?.fecha_cita) return data

        const payload = req.payload
        const fecha = new Date(data.fecha_cita).toISOString()

        const existente = await payload.find({
          collection: 'leads',
          where: {
            and: [
              { fecha_cita: { equals: fecha } },
              { estado_cita: { not_equals: 'cancelled' } },
            ],
          },
          overrideAccess: true,
        })

        if (existente.docs.length > 0) {
          throw new Error('Ese horario ya está reservado. Por favor, elige otro.')
        }

        return data
      },
    ],
  },
  fields: [
    { name: 'nombre', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'telefono', type: 'text' },
    { name: 'mensaje', type: 'textarea' },
    {
      name: 'servicio',
      type: 'text',
      validate: (async (value, { req }) => {
        const servicio = typeof value === 'string' ? value.trim() : ''
        if (!servicio) return true

        const services = await req.payload.find({
          collection: 'services',
          limit: 0,
          overrideAccess: true,
        })

        if (services.docs.some((s) => s.value === servicio)) return true
        return 'El servicio seleccionado no existe.'
      }) as TextFieldSingleValidation,
      admin: {
        description:
          'Debe coincidir con el campo value de un servicio existente.',
      },
    },
    {
      name: 'fecha_cita',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'yyyy-MM-dd HH:mm',
          timeIntervals: 30,
        },
      },
    },
    {
      name: 'duracion',
      type: 'number',
      defaultValue: 30,
      admin: { hidden: true },
    },
    {
      name: 'estado_cita',
      type: 'select',
      options: [
        { label: 'Pendiente', value: 'pending' },
        { label: 'Confirmada', value: 'confirmed' },
        { label: 'Cancelada', value: 'cancelled' },
        { label: 'Completada', value: 'completed' },
      ],
      defaultValue: 'pending',
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
    defaultColumns: ['nombre', 'email', 'servicio', 'fecha_cita', 'estado_cita', 'estado'],
  },
}

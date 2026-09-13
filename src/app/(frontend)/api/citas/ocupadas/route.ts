import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  const payload = await getPayload({ config })

  const citas = await payload.find({
    collection: 'leads',
    where: {
      and: [
        { fecha_cita: { exists: true } },
        { estado_cita: { not_equals: 'cancelled' } },
      ],
    },
    select: { fecha_cita: true, duracion: true },
    overrideAccess: true,
    limit: 100,
  })

  const fechasOcupadas: string[] = []

  for (const cita of citas.docs) {
    const inicio = new Date(cita.fecha_cita as string)
    const duracion = (cita.duracion as number) || 30

    for (let i = 0; i < duracion; i += 30) {
      const slot = new Date(inicio.getTime() + i * 60000)
      slot.setSeconds(0, 0)
      const iso = slot.toISOString()
      if (!fechasOcupadas.includes(iso)) {
        fechasOcupadas.push(iso)
      }
    }
  }

  return NextResponse.json({ fechasOcupadas })
}

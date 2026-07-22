import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
  const payload = await getPayload({ config })

  try {
    const data = await req.json()

    const lead = await payload.create({
      collection: 'leads',
      data: {
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono || '',
        mensaje: data.mensaje || '',
        servicio: data.servicio || '',
        estado: 'new',
      },
    })

    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Error al crear el lead' },
      { status: 500 },
    )
  }
}

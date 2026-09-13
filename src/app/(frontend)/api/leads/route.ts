import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
const MADRID = 'Europe/Madrid'

const ADMIN_EMAIL = 'gio@giocode.dev'
const SITE_URL = process.env.SITE_URL || 'https://giocode.dev'

function isSlotConflict(error: unknown) {
  const e = error as { message?: string; name?: string }
  if (!e || !e.message) return false
  return (
    e.message.includes('horario ya está reservado') ||
    e.name === 'DuplicateArgument' ||
    /E11000/.test(e.message)
  )
}

interface LeadData {
  nombre: string
  email: string
  telefono: string
  mensaje: string
  servicio: string
  fecha_cita?: string | null
}

function formatDateMadrid(iso: string): string {
  const parts = new Intl.DateTimeFormat('es-ES', {
    timeZone: MADRID,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).formatToParts(new Date(iso))
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  return `${get('weekday')} ${get('day')} de ${get('month')} ${get('year')}, a las ${get('hour')}:${get('minute')}`
}

function buildAdminEmail(data: LeadData, leadId: string) {
  const hasCita = Boolean(data.fecha_cita)
  const madridFormated = data.fecha_cita ? formatDateMadrid(data.fecha_cita) : null

  const rows: Array<[string, string]> = [
    ['Nombre', data.nombre || '—'],
    ['Email', data.email || '—'],
    ['Teléfono', data.telefono || '—'],
    ['Servicio', data.servicio || '—'],
  ]
  if (madridFormated) rows.push(['Fecha de cita (Madrid)', madridFormated])

  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px 8px 0;color:#FFF0EB;font-weight:600;">${esc(k)}</td><td style="padding:8px 0;color:#FFF0EB;">${esc(v)}</td></tr>`,
    )
    .join('')

  const adminUrl = `${SITE_URL}/admin/collections/leads?where=(id,equals,"${leadId}")`

  const subject = hasCita ? 'Nueva cita reservada — Giocode' : 'Nuevo lead — Giocode'

  const text = [
    hasCita ? 'Nueva cita reservada' : 'Nuevo lead recibido',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Mensaje:',
    data.mensaje,
    '',
    `Gestionar en: ${adminUrl}`,
  ].join('\n')

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#160000;color:#FFF0EB;font-family:Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#540000;border-radius:11px;padding:24px;">
    <h1 style="margin:0 0 8px;font-size:20px;color:#32FFAB;">${hasCita ? 'Nueva cita reservada' : 'Nuevo lead'}</h1>
    <p style="margin:0 0 16px;">${hasCita ? 'Un cliente ha reservado una cita desde el sitio.' : 'Un cliente ha enviado el formulario de contacto.'}</p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">${rowsHtml}</table>
    <div style="background:#160000;border-radius:11px;padding:16px;border-left:4px solid #F40C3F;">
      <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#F40C3F;">Mensaje del cliente</p>
      <p style="margin:0;white-space:pre-wrap;">${esc(data.mensaje)}</p>
    </div>
    <a href="${adminUrl}" style="display:inline-block;margin-top:20px;padding:12px 16px;background:#32FFAB;color:#160000;text-decoration:none;border-radius:11px;font-weight:600;">Ver en /admin</a>
  </div>
</body></html>`

  return { subject, text, html }
}

function buildClientEmail(data: LeadData) {
  const madridFormated = formatDateMadrid(data.fecha_cita as string)

  const subject = 'Cita confirmada — Giocode'
  const text = [
    `Hola ${data.nombre},`,
    '',
    'Hemos recibido tu solicitud y tu cita está confirmada para:',
    '',
    `  Fecha: ${madridFormated}`,
    '',
    'Si necesitas cambiar la hora, respóndenos a este email.',
    '',
    '— El equipo de Giocode',
  ].join('\n')

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#160000;color:#FFF0EB;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#540000;border-radius:11px;padding:32px;">
    <h1 style="margin:0 0 16px;font-size:22px;color:#32FFAB;">¡Cita confirmada!</h1>
    <p style="margin:0 0 12px;">Hola <strong>${esc(data.nombre)}</strong>,</p>
    <p style="margin:0 0 16px;">Tu cita está agendada para:</p>
    <div style="background:#160000;border-radius:11px;padding:20px;margin-bottom:24px;border:1px solid #F40C3F;">
      <p style="margin:0;font-size:18px;">Fecha: ${esc(madridFormated)}</p>
      <p style="margin:8px 0 0;font-size:13px;opacity:0.7;">Horario local de Madrid</p>
    </div>
    <p style="margin:0 0 24px;">Si necesitas mover o cancelar, respóndenos a este email.</p>
    <p style="margin:0;">— El equipo de Giocode</p>
  </div>
</body></html>`

  return { subject, text, html }
}

function esc(s: string) {
  return (s || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[c]!)
}

export async function POST(req: NextRequest) {
  const payload = await getPayload({ config })

  let data: Record<string, unknown>
  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const leadData: LeadData = {
    nombre: (data.nombre as string) ?? '',
    email: (data.email as string) ?? '',
    telefono: (data.telefono as string) ?? '',
    mensaje: (data.mensaje as string) ?? '',
    servicio: (data.servicio as string) ?? '',
    fecha_cita: (data.fecha_cita as string) ?? null,
  }

  if (!leadData.nombre || !leadData.email) {
    return NextResponse.json({ error: 'Nombre y email son obligatorios' }, { status: 400 })
  }
  if (!leadData.mensaje) {
    return NextResponse.json({ error: 'El mensaje es obligatorio' }, { status: 400 })
  }

  try {
    const lead = await payload.create({
      collection: 'leads',
      data: {
        nombre: leadData.nombre,
        email: leadData.email,
        telefono: leadData.telefono || '',
        mensaje: leadData.mensaje || '',
        estado: 'new',
        ...(leadData.servicio ? { servicio: leadData.servicio.trim() } : {}),
        ...(leadData.fecha_cita
          ? { fecha_cita: leadData.fecha_cita, duracion: 30, estado_cita: 'confirmed' as const }
          : {}),
      },
    })

    const leadId = String(lead.id)

    try {
      const admin = buildAdminEmail(leadData, leadId)
      await payload.sendEmail({
        from: 'Giocode <noreply@giocode.dev>',
        to: ADMIN_EMAIL,
        subject: admin.subject,
        text: admin.text,
        html: admin.html,
      })
    } catch (e) {
      console.error('Error enviando email admin:', e)
    }

    if (leadData.fecha_cita) {
      try {
        const client = buildClientEmail(leadData)
        await payload.sendEmail({
          from: 'Giocode <noreply@giocode.dev>',
          to: leadData.email,
          subject: client.subject,
          text: client.text,
          html: client.html,
        })
      } catch (e) {
        console.error('Error enviando email cliente:', e)
      }
    }

    return NextResponse.json(
      {
        id: leadId,
        message: leadData.fecha_cita
          ? 'Cita reservada. Te hemos enviado una confirmación por email.'
          : 'Mensaje enviado. Te contactaremos pronto.',
      },
      { status: 201 },
    )
  } catch (error) {
    if (isSlotConflict(error)) {
      return NextResponse.json(
        { error: 'Ese horario ya está reservado. Por favor, elige otro.' },
        { status: 409 },
      )
    }
    console.error('Error creating lead:', error)
    return NextResponse.json({ error: 'Error al crear el lead' }, { status: 500 })
  }
}

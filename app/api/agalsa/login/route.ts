import { NextRequest, NextResponse } from 'next/server'
import {
  AGALSA_COOKIE,
  AGALSA_TTL_SECONDS,
  getAgalsaPassword,
  getAuthSecret,
  isAllowedDomain,
  signToken,
} from '@/lib/agalsa-auth'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const email = String(body.email ?? '').trim()
  const password = String(body.password ?? '')

  if (!email || !password) {
    return NextResponse.json({ error: 'Email y contraseña son obligatorios' }, { status: 400 })
  }
  if (!isAllowedDomain(email)) {
    return NextResponse.json(
      { error: 'Solo se aceptan correos @sierradelademanda.com' },
      { status: 403 },
    )
  }

  const expected = getAgalsaPassword()
  if (!expected) {
    return NextResponse.json(
      { error: 'Login no configurado (falta AGALSA_PASSWORD)' },
      { status: 500 },
    )
  }
  if (password !== expected) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
  }

  const token = await signToken(email, getAuthSecret())
  const res = NextResponse.json({ ok: true })
  res.cookies.set(AGALSA_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: AGALSA_TTL_SECONDS,
  })
  return res
}

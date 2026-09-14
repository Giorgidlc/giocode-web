import { NextResponse } from 'next/server'
import { AGALSA_COOKIE } from '@/lib/agalsa-auth'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(AGALSA_COOKIE, '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  })
  return res
}

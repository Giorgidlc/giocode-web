import { NextRequest, NextResponse } from 'next/server'
import { AGALSA_COOKIE, getAuthSecret, verifyToken } from '@/lib/agalsa-auth'

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname === '/agalsa/login' || pathname.startsWith('/agalsa/login/')) {
    return NextResponse.next()
  }
  const token = req.cookies.get(AGALSA_COOKIE)?.value
  if (token && (await verifyToken(token, getAuthSecret()))) {
    return NextResponse.next()
  }
  const url = req.nextUrl.clone()
  url.pathname = '/agalsa/login'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/agalsa', '/agalsa/:path*'],
}

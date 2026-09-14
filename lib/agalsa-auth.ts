// Auth AGALSA — email @sierradelademanda.com + password, cookie firmada (HMAC-SHA256).
// Funciona en Node (route handlers) y Edge (middleware): solo Web Crypto + btoa/atob.

export const AGALSA_DOMAIN = 'sierradelademanda.com'
export const AGALSA_COOKIE = 'agalsa_token'
export const AGALSA_TTL_SECONDS = 30 * 24 * 3600 // 30 días

export function getAuthSecret(): string {
  return process.env.AGALSA_SECRET || process.env.PAYLOAD_SECRET || 'dev-agalsa-secret'
}

export function getAgalsaPassword(): string | undefined {
  return process.env.AGALSA_PASSWORD
}

export function isAllowedDomain(email: string): boolean {
  return email.trim().toLowerCase().endsWith(`@${AGALSA_DOMAIN}`)
}

function b64urlEncode(bytes: Uint8Array): string {
  let s = ''
  for (const b of bytes) s += String.fromCharCode(b)
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function b64urlDecode(s: string): Uint8Array {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(b64)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

async function hmac(secret: string, data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return new Uint8Array(sig)
}

export async function signToken(email: string, secret: string): Promise<string> {
  const normalized = email.trim().toLowerCase()
  const exp = Math.floor(Date.now() / 1000) + AGALSA_TTL_SECONDS
  const payload = `${normalized}:${exp}`
  const sig = await hmac(secret, payload)
  return `${b64urlEncode(new TextEncoder().encode(payload))}.${b64urlEncode(sig)}`
}

export async function verifyToken(token: string, secret: string): Promise<string | null> {
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [p, s] = parts
  let payload: string
  try {
    payload = new TextDecoder().decode(b64urlDecode(p))
  } catch {
    return null
  }
  const idx = payload.lastIndexOf(':')
  if (idx < 0) return null
  const email = payload.slice(0, idx)
  const exp = Number(payload.slice(idx + 1))
  if (!email || !Number.isFinite(exp)) return null
  if (exp < Math.floor(Date.now() / 1000)) return null
  if (!isAllowedDomain(email)) return null
  let actual: Uint8Array
  try {
    actual = b64urlDecode(s)
  } catch {
    return null
  }
  const expected = await hmac(secret, payload)
  if (expected.length !== actual.length) return null
  let diff = 0
  for (let i = 0; i < expected.length; i++) diff |= expected[i] ^ actual[i]
  if (diff !== 0) return null
  return email
}

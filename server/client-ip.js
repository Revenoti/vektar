import { isIP } from 'node:net'

const MAX_HOPS = 16
const MAX_HEADER_LENGTH = 2048

// Canonical IP identity prevents alternate IPv6 spellings (or IPv4-mapped
// IPv6 socket addresses) from creating independent rate-limit buckets.
export function normalizeIp(value) {
  if (typeof value !== 'string' || value.includes('%') || !isIP(value)) return null
  if (isIP(value) === 4) return value
  try {
    const canonical = new URL(`http://[${value}]/`).hostname.slice(1, -1)
    const mapped = /^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/.exec(canonical)
    if (mapped) {
      const high = Number.parseInt(mapped[1], 16), low = Number.parseInt(mapped[2], 16)
      return [high >> 8, high & 255, low >> 8, low & 255].join('.')
    }
    return canonical
  } catch { return null }
}

export function parseTrustedProxyIps(value = '') {
  if (!value.trim()) return []
  if (value.length > 4096) return []
  const entries = value.split(',').map(entry => normalizeIp(entry.trim()))
  // Any malformed configuration disables all forwarding trust. No CIDRs,
  // wildcard, hostname, interface suffix, port or automatic proxy detection.
  if (entries.length > 64 || entries.some(entry => !entry)) return []
  return [...new Set(entries)]
}

export function clientIp(req, trustedProxyIps = []) {
  const peer = normalizeIp(req.socket.remoteAddress) || 'unknown'
  const trusted = new Set(trustedProxyIps.map(normalizeIp).filter(Boolean))
  if (!trusted.has(peer)) return peer
  const header = req.headers['x-forwarded-for']
  if (typeof header !== 'string' || !header || header.length > MAX_HEADER_LENGTH) return peer
  const chain = header.split(',')
  if (chain.length > MAX_HOPS) return peer
  const addresses = chain.map(address => normalizeIp(address.trim()))
  if (addresses.some(address => !address)) return peer
  let selected = peer
  // Starting at the verified socket, stop at the first untrusted address.
  // Anything to its left may have been supplied by that client and is ignored.
  for (let i = addresses.length - 1; i >= 0 && trusted.has(selected); i--) selected = addresses[i]
  return selected
}

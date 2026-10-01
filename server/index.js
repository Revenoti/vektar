import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { dirname, extname, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { callConfig, createCallService } from './calls.js'

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml' }
const defaultRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../dist')

export function createAppServer({ config = callConfig(), fetchImpl, now, staticRoot = defaultRoot } = {}) {
  const calls = createCallService({ config, fetchImpl, now })
  const server = createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('Permissions-Policy', 'camera=(), geolocation=(), microphone=(self)')
    let path, url
    try { url = new URL(req.url, 'http://localhost'); path = decodeURIComponent(url.pathname) } catch { res.writeHead(400); res.end('Invalid URL'); return }
    if (path.startsWith('/api/')) { await calls.handle(req, res, path); return }
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return }
    const redirect = { '/solutions': '/services', '/industries': '/services', '/contact': '/call' }[path.replace(/\/$/, '')]
    if (redirect) { res.writeHead(301, { Location: `${redirect}${url.search}` }); res.end(); return }
    // Serve only the built public tree, never the repository or environment.
    if (path.split('/').some(part => part.startsWith('.') || part.includes('\0')) || path.includes('\\')) { res.writeHead(404); res.end('Not found'); return }
    let target = resolve(staticRoot, `.${path}`)
    if (target !== staticRoot && !target.startsWith(`${staticRoot}${sep}`)) { res.writeHead(404); res.end('Not found'); return }
    let status = 200
    try {
      if ((await stat(target)).isDirectory()) target = resolve(target, 'index.html')
      if (!(await stat(target)).isFile()) throw new Error('Missing page')
    } catch {
      // A prerendered page owns its real route. Unknown paths get a true 404,
      // not a successful SPA shell that invents pages for crawlers.
      if (!extname(path)) {
        try {
          const routes = JSON.parse(await readFile(resolve(staticRoot, 'routes.json'), 'utf8'))
          if (Array.isArray(routes) && routes.includes(path.replace(/\/$/, '') || '/')) target = resolve(staticRoot, 'index.html')
          else throw new Error('Unknown route')
        } catch { status = 404; target = resolve(staticRoot, '404.html') }
      } else { status = 404; target = resolve(staticRoot, '404.html') }
    }
    try {
      const data = await readFile(target)
      res.writeHead(status, { 'Content-Type': MIME[extname(target)] || 'application/octet-stream', 'Cache-Control': extname(target) === '.html' ? 'no-cache' : 'public, max-age=3600' })
      res.end(req.method === 'HEAD' ? undefined : data)
    } catch { res.writeHead(status === 404 ? 404 : 503, { 'Content-Type': 'text/plain' }); res.end(status === 404 ? 'Not found' : 'Website build is not available. Run npm run build first.') }
  })
  server.requestTimeout = 15000
  server.headersTimeout = 10000
  return server
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 3001)
  const server = createAppServer()
  server.listen(port, process.env.HOST || '0.0.0.0', () => console.log(`Vektar server listening on port ${port}`))
  const shutdown = () => { server.close(() => process.exit(0)); setTimeout(() => process.exit(1), 15000).unref() }
  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
}

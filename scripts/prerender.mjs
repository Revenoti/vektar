import { readFile, writeFile, mkdir, rm, readdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'
import blogPosts from '../src/data/blogPosts.js'
import { services } from '../src/data/services.js'

// SSR renders the same route components, including lazy routes, without a browser,
// network calls, credentials, or an alternate copy of the site's content.
const root = resolve('dist')
const template = await readFile(resolve(root, 'index.html'), 'utf8')
const script = template.match(/<script[^>]+src="([^"]+)"/)?.[1]
const styles = (await readdir(resolve(root, 'assets'))).filter(file => file.endsWith('.css')).map(file => `/assets/${file}`)
if (!script || !styles.length) throw new Error('Client assets were not found; run vite build before prerendering.')
await build({ build: { ssr: 'src/entry-server.jsx', outDir: '.prerender', emptyOutDir: true } })
// Keep original source artwork in Git, but do not ship the unused multi-megabyte legacy imagery.
await Promise.all(['hero-background.png', 'logo.png', 'blog'].map(path => rm(resolve(root, path), { recursive: true, force: true })))
const { renderPage } = await import(pathToFileURL(resolve('.prerender/entry-server.js')).href)
const routes = ['/', '/services', ...services.map(service => `/services/${service.slug}`), '/work', '/about', '/call', '/privacy', '/blog', ...blogPosts.map(post => `/blog/${post.slug}`)]
try {
  for (const route of [...routes, '/404']) {
    const html = await renderPage(route, { script, styles })
    const destination = route === '/' ? resolve(root, 'index.html') : route === '/404' ? resolve(root, '404.html') : resolve(root, `.${route}`, 'index.html')
    await mkdir(dirname(destination), { recursive: true })
    await writeFile(destination, html)
  }
  await writeFile(resolve(root, 'routes.json'), `${JSON.stringify(routes, null, 2)}\n`)
  console.log(`Prerendered ${routes.length} indexable routes and a 404 page with complete HTML and metadata.`)
} finally { await rm('.prerender', { recursive: true, force: true }) }

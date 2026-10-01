import { writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import blogPosts from '../src/data/blogPosts.js'

export const corePaths = ['/', '/services', '/services/agentic-applications', '/services/workflow-automation', '/services/software-engineering', '/work', '/about', '/call', '/privacy', '/blog']
export const sitemapPaths = [...corePaths, ...blogPosts.map(post => `/blog/${post.slug}`)]

export function generateSitemap() {
  const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPaths.map(path => `  <url><loc>${escapeXml(`https://vektar.io${path}`)}</loc></url>`).join('\n')}\n</urlset>\n`
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await writeFile(new URL('../public/sitemap.xml', import.meta.url), generateSitemap())
  console.log(`Generated sitemap with ${sitemapPaths.length} URLs`)
}

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import blogPosts from '../src/data/blogPosts.js'
import { generateSitemap, corePaths, sitemapPaths } from '../scripts/generate-sitemap.mjs'

const expectedSlugs = [
  'agentic-ai-central-florida-businesses-2026',
  'autonomous-business-workflows-central-florida-2026',
  'multi-agent-systems-business-operations-2026',
  'ai-implementation-guide-orlando-2026',
  'kissimmee-businesses-cut-costs-40-percent-ai',
  'st-cloud-business-automation-roi-90-days',
  'central-florida-ai-consulting-guide',
  'machine-learning-orlando-small-business',
  'winter-park-ai-strategy-professional-services',
  'lake-mary-tech-companies-ai-integration',
  'daytona-beach-seasonal-business-ai',
  'sanford-manufacturing-logistics-ai',
  'orlando-healthcare-ai-medical-practice',
  'orlando-real-estate-ai-automation',
  'central-florida-restaurant-ai-automation',
  'orlando-retail-ai-inventory-customer-experience',
  'orlando-startups-small-business-ai-strategy',
  'ai-implementation-mistakes-central-florida',
]

test('all 18 published article slugs are preserved and unique', () => {
  assert.equal(blogPosts.length, 18)
  assert.equal(new Set(blogPosts.map(post => post.slug)).size, 18)
  assert.deepEqual(blogPosts.map(post => post.slug).sort(), expectedSlugs.sort())
})

test('every article has useful metadata and substantial educational content', () => {
  for (const post of blogPosts) {
    assert.ok(post.title.length > 15, post.slug)
    assert.ok(post.description.length > 70, post.slug)
    assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/)
    assert.ok(!Number.isNaN(Date.parse(post.date)), post.slug)
    assert.ok(post.content.split(/\s+/).length >= 300, post.slug)
    assert.match(post.content, /^## /m)
    assert.match(post.readTime, /^\d+ min read$/)
    assert.ok(['Strategy', 'Best Practices', 'Technology'].includes(post.category), post.slug)
  }
})

test('all article images exist and the fallback is lightweight', async () => {
  for (const path of new Set(blogPosts.map(post => post.image))) {
    assert.equal(path, '/blog-fallback.svg')
    const imageStat = await stat(new URL(`../public${path}`, import.meta.url))
    assert.ok(imageStat.isFile())
    assert.ok(imageStat.size < 5000)
  }
})

test('content does not imply unsupported client results or contain unsafe HTML', () => {
  const unsupported = /150\+ implementations|200\+ projects|95% client|Results after \d|Real Central Florida example|we.ve implemented|guaranteed ROI|<script|<iframe|javascript:/i
  for (const post of blogPosts) {
    assert.doesNotMatch(`${post.title} ${post.description} ${post.content}`, unsupported, post.slug)
  }
  for (const slug of ['kissimmee-businesses-cut-costs-40-percent-ai', 'orlando-startups-small-business-ai-strategy']) {
    assert.match(blogPosts.find(post => post.slug === slug).content, /illustrative(?: inputs)?, not/i)
  }
})

test('article links point to current core routes', () => {
  for (const post of blogPosts) {
    for (const match of post.content.matchAll(/\]\((\/[^)]+)\)/g)) assert.ok(corePaths.includes(match[1]), `${post.slug}: ${match[1]}`)
    assert.doesNotMatch(post.content, /calendly|\/contact-form|\]\(\/solutions\)/i)
  }
})

test('sitemap contains exactly the canonical core routes and every article', async () => {
  assert.equal(corePaths.length, 10)
  assert.equal(sitemapPaths.length, 28)
  assert.equal(new Set(sitemapPaths).size, 28)
  assert.ok(!sitemapPaths.includes('/contact'), 'Redirect-only routes should not be indexed')
  const xml = generateSitemap()
  for (const slug of expectedSlugs) assert.ok(xml.includes(`<loc>https://vektar.io/blog/${slug}</loc>`), slug)
  for (const path of corePaths) assert.ok(xml.includes(`<loc>https://vektar.io${path}</loc>`), path)
  assert.equal([...xml.matchAll(/<loc>/g)].length, 28)
  assert.equal(await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8'), xml)
  assert.ok(!xml.includes('<lastmod>'), 'Do not invent content modification dates')
})

test('blog pages use safe Markdown and do not request missing or huge legacy imagery', async () => {
  const list = await readFile(new URL('../src/pages/blog/BlogListPage.jsx', import.meta.url), 'utf8')
  const article = await readFile(new URL('../src/pages/blog/BlogPostPage.jsx', import.meta.url), 'utf8')
  assert.match(article, /skipHtml/)
  assert.doesNotMatch(article, /rehypeRaw|dangerouslySetInnerHTML/)
  assert.doesNotMatch(list + article, /src=\{post\.image\}|og-image\.png/)
  assert.match(list, /loading="lazy"/)
  assert.match(article, /navigator\.clipboard\?\.writeText/)
  assert.match(article, /catch/)
})

import { test, expect } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import blogPosts from '../../src/data/blogPosts.js'

async function expectNoOverflow(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)
  expect(overflow).toBe(false)
}

test('journal filters, search, empty recovery, pagination and history work', async ({ page }) => {
  await page.goto('/blog')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Ideas for whatcomes next.')
  await expect(page.locator('.blog-card')).toHaveCount(6)
  await page.getByRole('button', { name: 'Page 3', exact: true }).click()
  await expect(page).toHaveURL(/page=3/)
  await expect(page.getByRole('button', { name: 'Next', exact: true })).toBeDisabled()
  await page.getByRole('button', { name: 'Technology', exact: true }).click()
  await expect(page).toHaveURL(/category=Technology/)
  await expect(page).not.toHaveURL(/page=3/)
  await expect(page.locator('.blog-card-category')).toHaveText(Array(blogPosts.filter(post => post.category === 'Technology').length).fill('Technology'))
  await page.goBack()
  await expect(page).toHaveURL(/page=3/)
  await expect(page.getByRole('button', { name: 'All', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('searchbox', { name: 'Search articles' }).fill('no matching entries qzx')
  await expect(page.getByRole('heading', { name: 'No articles match just yet.' })).toBeVisible()
  await expect(page.locator('.blog-card')).toHaveCount(0)
  await page.getByRole('button', { name: 'Clear filters' }).click()
  await expect(page.getByRole('searchbox', { name: 'Search articles' })).toHaveValue('')
  await expect(page.locator('.blog-card')).toHaveCount(6)
  await page.getByRole('searchbox', { name: 'Search articles' }).fill('multi-agent')
  await expect(page.locator('.blog-card')).toHaveCount(1)
  await expect(page).toHaveURL(/q=multi-agent/)
  await page.reload()
  await expect(page.getByRole('searchbox', { name: 'Search articles' })).toHaveValue('multi-agent')
  await expect(page.locator('.blog-card')).toHaveCount(1)
  await expectNoOverflow(page)
})

test('all published article routes render complete articles with valid metadata and imagery', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  for (const post of blogPosts) {
    await page.goto(`/blog/${post.slug}`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(post.title)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://vektar.io/blog/${post.slug}`)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', post.description)
    await expect(page.locator('.blog-prose')).toContainText(post.content.split('\n')[0])
    await expect(page.getByRole('navigation', { name: 'Article contents' })).toBeVisible()
    await expect(page.locator('.blog-article-banner img')).toHaveJSProperty('naturalWidth', 960)
    await expectNoOverflow(page)
  }
  expect(errors).toEqual([])
})

test('contents links and related-article navigation preserve article state', async ({ page }) => {
  const post = blogPosts[2]
  await page.goto(`/blog/${post.slug}`)
  const contents = page.getByRole('navigation', { name: 'Article contents' })
  await contents.getByRole('link').first().click()
  await expect(page).toHaveURL(/#begin-with-the-simplest-architecture$/)
  await page.locator('.blog-related h3 a').first().click()
  await expect(page.getByRole('heading', { level: 1 })).not.toHaveText(post.title)
  await page.goBack()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(post.title)
  await page.getByRole('link', { name: 'All insights', exact: true }).first().click()
  await expect(page).toHaveURL(/\/blog$/)
})

test('copy link has success feedback and handles unavailable clipboard', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => {} } }))
  await page.goto(`/blog/${blogPosts[0].slug}`)
  await page.getByRole('button', { name: 'Copy link' }).click()
  await expect(page.locator('.blog-copy-status')).toHaveText('Link copied')
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('Permission denied') } } }))
  await page.getByRole('button', { name: 'Copy link' }).click()
  await expect(page.locator('.blog-copy-status')).toHaveText('Copy the article address from your browser')
  await expectNoOverflow(page)
})

test('unknown article has an accessible recovery and noindex metadata', async ({ page }) => {
  await page.goto('/blog/not-an-existing-article')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('This page isn’t in')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
  await page.getByRole('link', { name: 'Back to the journal' }).click()
  await expect(page).toHaveURL(/\/blog$/)
})

test('journal and article visual evidence', async ({ page }, testInfo) => {
  await mkdir('qa', { recursive: true })
  await page.goto('/blog')
  await expect(page.locator('.blog-featured')).toBeVisible()
  await expectNoOverflow(page)
  await page.screenshot({ path: `qa/blog-${testInfo.project.name}.png`, fullPage: true })
  await page.goto(`/blog/${blogPosts[2].slug}`)
  await expect(page.locator('.blog-prose h2').first()).toBeVisible()
  await expectNoOverflow(page)
  await page.screenshot({ path: `qa/blog-post-${testInfo.project.name}.png`, fullPage: true })
})

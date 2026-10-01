import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { mkdir } from 'node:fs/promises'
const routes = ['/', '/services', '/services/agentic-applications', '/services/workflow-automation', '/services/software-engineering', '/work', '/about', '/call', '/privacy', '/blog']

test('core pages render with complete SEO, no broken images or horizontal overflow', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  for (const route of routes) {
    const response = await page.goto(route)
    expect(response.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page).toHaveTitle(/Vektar/)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S+/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://vektar.io${route}`)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), route).toBeTruthy()
    expect(await page.locator('img').evaluateAll(async images => { await Promise.all(images.map(async img => { img.loading = 'eager'; try { await img.decode() } catch { /* Report broken images below. */ } })); return images.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src) }), route).toEqual([])
  }
  expect(errors).toEqual([])
})

test('navigation, legacy redirects, 404 recovery and history stay coherent', async ({ page, isMobile }) => {
  await page.goto('/')
  if (isMobile) {
    const toggle = page.locator('.menu-toggle')
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toBeFocused()
    await toggle.click()
    await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Services', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute('aria-expanded', 'false')
  } else await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Services', exact: true }).click()
  await expect(page).toHaveURL(/\/services$/)
  await page.getByRole('link', { name: /01.*Agentic Applications/ }).click()
  await expect(page.locator('h1')).toHaveText('From a good conversation to useful work.')
  await page.goBack()
  await expect(page).toHaveURL(/\/services$/)
  for (const [from, to] of [['/solutions','/services'],['/industries','/services'],['/contact','/call']]) { await page.goto(from); await expect(page).toHaveURL(new RegExp(`${to}$`)) }
  const missing = await page.goto('/not-a-page')
  expect(missing.status()).toBe(404)
  await expect(page.locator('h1')).toContainText('This page isn’t here')
  await page.getByRole('link', { name: /Back to Vektar/ }).click()
  await expect(page).toHaveURL(/\/$/)
})

test('call service fails closed, consent remains voluntary, unavailable state is clear', async ({ page }) => {
  let paidRequests = 0
  await page.route('**/api.retellai.com/**', route => { paidRequests++; return route.abort() })
  await page.goto('/call')
  await expect(page.getByText(/not available|not configured|unavailable/i).first()).toBeVisible()
  const submit = page.getByRole('button', { name: /start.*call|start.*conversation/i })
  if (await submit.count()) await expect(submit).toBeDisabled()
  await page.getByRole('button', { name: 'Call my phone' }).click()
  await expect(page.getByRole('button', { name: 'Call me with Vektar AI' })).toBeDisabled()
  expect(paidRequests).toBe(0)
})

test('core pages meet automated WCAG A/AA rules and save review screenshots', async ({ page }, testInfo) => {
  await mkdir('qa', { recursive: true })
  for (const route of ['/', '/services', '/services/agentic-applications', '/about', '/call', '/privacy']) {
    await page.goto(route)
    await page.locator('h1').waitFor()
    const results = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()
    expect(results.violations, `${route}: ${JSON.stringify(results.violations.map(v => ({ id:v.id, nodes:v.nodes.map(n=>n.target) })))}`).toEqual([])
    if (['/', '/services/agentic-applications', '/call'].includes(route)) await page.screenshot({ path: `qa/${route === '/' ? 'home' : route.split('/').at(-1)}-${testInfo.project.name}.png`, fullPage: true })
  }
})

test('home keeps the voice SDK and legacy heavy imagery off the initial request path', async ({ page }) => {
  const requests = []
  page.on('request', request => requests.push(request.url()))
  await page.goto('/', { waitUntil: 'networkidle' })
  expect(requests.filter(url => /hero-background|\/blog\/.*\.png|index\.m-/.test(url))).toEqual([])
  const bytes = await page.evaluate(() => performance.getEntriesByType('resource').filter(resource => resource.initiatorType === 'script').reduce((sum, resource) => sum + resource.decodedBodySize, 0))
  expect(bytes).toBeLessThan(400000)
})

test('all internal links on the core site resolve without errors', async ({ page, request }) => {
  const targets = new Set()
  for (const route of routes) {
    await page.goto(route)
    const links = await page.locator('a[href^="/"]').evaluateAll(anchors => anchors.map(anchor => new URL(anchor.href).pathname))
    links.forEach(link => targets.add(link))
  }
  for (const target of targets) expect((await request.get(target)).status(), target).toBe(200)
})

test('both sandbox CTAs land on their target after cold lazy chunks load', async ({ page }) => {
  await page.route(/\/(WorkPage|WorkflowSandbox)-[^/]+\.js$/, async route => {
    await new Promise(resolve => setTimeout(resolve, 200))
    await route.continue()
  })
  for (const name of ['Explore the sandbox', 'Try the workflow sandbox']) {
    await page.goto('/')
    await page.getByRole('link', { name, exact: true }).click()
    await expect(page).toHaveURL(/\/work#sandbox$/)
    await expect(page.getByRole('heading', { name: 'See the work. Keep the control.' })).toBeInViewport()
  }
})

import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const config = { web: true, callback: true, consentVersion: '2026-10-01' }
async function availability(page, value = config) {
  await page.route('**/api/voice/config', route => route.fulfill({ json: value }))
}
async function details(page) {
  await page.getByLabel('First name', { exact: true }).fill('Ada')
  await page.getByLabel('Last name', { exact: true }).fill('Lovelace')
  await page.getByLabel('Phone number', { exact: true }).fill('+13215550123')
  await page.getByRole('checkbox').check()
}

test.beforeEach(async ({ page }) => {
  // Guard against accidental live-provider calls even if implementation changes.
  await page.route('**/*retellai.com/**', route => route.abort())
})

test('unavailable calling remains honest and disabled, including callback and retry', async ({ page }) => {
  let checks = 0
  await page.route('**/api/voice/config', route => { checks++; return route.fulfill({ json: { ...config, web: false, callback: false } }) })
  let submissions = 0
  await page.route('**/api/callback', route => { submissions++; return route.abort() })
  await page.goto('/call')
  await expect(page.getByText('Browser calling is currently unavailable', { exact: true })).toBeVisible()
  await page.getByRole('checkbox').check()
  await expect(page.getByRole('button', { name: 'Start voice conversation' })).toBeDisabled()
  await page.getByRole('button', { name: 'Call my phone', exact: true }).click()
  await expect(page.getByText('Phone callbacks are currently unavailable. No request has been sent.', { exact: true })).toBeVisible()
  await details(page)
  await expect(page.getByRole('button', { name: 'Call me with Vektar AI', exact: true })).toBeDisabled()
  await page.getByRole('button', { name: 'Check availability again' }).click()
  await expect.poll(() => checks).toBe(2)
  expect(submissions).toBe(0)
})

test('callback requires consent and only acknowledges provider acceptance', async ({ page }) => {
  await availability(page)
  let submissions = 0
  await page.route('**/api/callback', async route => {
    submissions++
    const request = route.request()
    expect(request.headers()['idempotency-key']).toMatch(/^[a-zA-Z0-9_-]{16,100}$/)
    expect(request.postDataJSON()).toEqual({ firstName: 'Ada', lastName: 'Lovelace', phone: '+13215550123', consent: true, consentVersion: '2026-10-01', website: '' })
    await route.fulfill({ status: 202, json: { status: 'accepted', code: 'CALL_ACCEPTED', message: 'The calling provider accepted your request. Your phone may ring shortly; a connection is not guaranteed.' } })
  })
  await page.goto('/call')
  await page.getByRole('button', { name: 'Call my phone', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Call me with Vektar AI', exact: true })).toBeDisabled()
  await details(page)
  await page.getByRole('button', { name: 'Call me with Vektar AI', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Callback request accepted' })).toBeVisible()
  await expect(page.locator('.callback-confirmation')).toContainText('a connection is not guaranteed')
  expect(submissions).toBe(1)
  expect(await page.evaluate(() => localStorage.length)).toBe(0)
  expect(await page.evaluate(() => sessionStorage.length)).toBe(0)
})

test('unknown callback outcome is explicit and blocks a duplicate submission', async ({ page }) => {
  await availability(page)
  let submissions = 0
  await page.route('**/api/callback', route => { submissions++; return route.fulfill({ status: 502, json: { code: 'OUTCOME_UNKNOWN', message: 'Provider response unknown.' } }) })
  await page.goto('/call')
  await page.getByRole('button', { name: 'Call my phone', exact: true }).click()
  await details(page)
  await page.getByRole('button', { name: 'Call me with Vektar AI', exact: true }).click()
  await expect(page.getByRole('alert')).toContainText('A call may still arrive. Please do not submit another request.')
  await expect(page.getByRole('button', { name: 'Call me with Vektar AI', exact: true })).toBeDisabled()
  await expect(page.getByLabel('Phone number', { exact: true })).toBeDisabled()
  await expect(page.getByRole('heading', { name: 'Callback request accepted' })).toHaveCount(0)
  expect(submissions).toBe(1)
})

test('microphone denial creates no voice session and permits an explicit retry', async ({ page }) => {
  await availability(page)
  await page.addInitScript(() => Object.defineProperty(navigator, 'mediaDevices', { configurable: true, value: { getUserMedia: async () => { throw new DOMException('Test denial', 'NotAllowedError') } } }))
  let sessions = 0
  await page.route('**/api/voice/session', route => { sessions++; return route.abort() })
  await page.goto('/call')
  await page.getByRole('checkbox').check()
  await page.getByRole('button', { name: 'Start voice conversation' }).click()
  await expect(page.getByRole('alert')).toContainText('Microphone permission was not granted')
  await expect(page.getByRole('button', { name: 'Start a new call' })).toBeEnabled()
  await page.getByRole('button', { name: 'Start a new call' }).click()
  await expect(page.getByRole('alert')).toContainText('Microphone permission was not granted')
  expect(sessions).toBe(0)
})

test('call experience has accessible labels, contrast and responsive visual evidence', async ({ page }, testInfo) => {
  await availability(page, { ...config, web: false, callback: false })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/call')
  await expect(page.getByText('Browser calling is currently unavailable', { exact: true })).toBeVisible()
  await mkdir('qa', { recursive: true })
  await page.screenshot({ path: `qa/call-${testInfo.project.name}.png`, fullPage: true })
  await page.unroute('**/api/voice/config')
  await availability(page)
  await page.reload()
  await page.getByRole('button', { name: 'Call my phone', exact: true }).click()
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)).toBe(false)
  await page.screenshot({ path: `qa/callback-${testInfo.project.name}.png`, fullPage: true })
  const results = await new AxeBuilder({ page }).include('.call-experience').analyze()
  await writeFile(`qa/call-accessibility-${testInfo.project.name}.json`, JSON.stringify({ violations: results.violations }, null, 2))
  expect(results.violations).toEqual([])
  expect(errors).toEqual([])
})

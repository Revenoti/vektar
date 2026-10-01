import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

async function openSandbox(page) {
  await page.goto('/work#sandbox')
  await expect(page.getByRole('heading', { name: 'See the work. Keep the control.' })).toBeVisible()
}

async function run(page) {
  await page.getByRole('button', { name: 'Run validation', exact: true }).click()
}

async function approve(page) {
  await page.getByRole('button', { name: 'Approve simulated entry' }).click()
}

test('sandbox requires approval, blocks duplicates, and creates no workflow network traffic', async ({ page }) => {
  await openSandbox(page)
  const requests = []
  page.on('request', (request) => {
    if (['xhr', 'fetch'].includes(request.resourceType())) requests.push(request.url())
  })
  await expect(page.getByText('No connected systems', { exact: true })).toBeVisible()
  await expect(page.locator('.sandbox-ledger')).toContainText('No entries yet.')
  await run(page)
  await expect(page.getByRole('heading', { name: 'Checked. Proposed. Your call.' })).toBeFocused()
  await expect(page.getByText('HUMAN APPROVAL REQUIRED', { exact: true })).toBeVisible()
  await expect(page.locator('.sandbox-ledger')).toContainText('No entries yet.')
  await expect(page.locator('.sandbox-check-pass')).toHaveCount(3)
  await approve(page)
  await expect(page.locator('.sandbox-ledger li')).toHaveCount(1)
  await expect(page.locator('.sandbox-ledger')).toContainText('SIM-001')
  await expect(page.locator('.sandbox-outcome')).toContainText('No payment was made.')
  await page.getByRole('button', { name: 'Run duplicate check' }).click()
  await expect(page.getByRole('heading', { name: 'One invoice. One ledger entry.' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Approve simulated entry' })).toHaveCount(0)
  await page.getByRole('button', { name: 'Run duplicate check' }).click()
  await expect(page.locator('.sandbox-ledger li')).toHaveCount(1)
  await expect(page.getByText('No connected systems', { exact: true })).toBeVisible()
  expect(requests).toEqual([])
})

test('over-policy and missing-data exceptions recover through explicit correction and revalidation', async ({ page }) => {
  await openSandbox(page)
  await page.getByLabel('Choose a scenario').selectOption('over_limit')
  await run(page)
  await expect(page.getByRole('heading', { name: 'An exception needs attention.' })).toBeVisible()
  await expect(page.getByLabel('Amount (USD)')).toHaveAttribute('aria-invalid', 'true')
  await expect(page.getByRole('button', { name: 'Approve simulated entry' })).toHaveCount(0)
  await page.getByRole('button', { name: 'Use corrected fixture' }).click()
  await expect(page.getByLabel('Amount (USD)')).toHaveValue('2400')
  await run(page)
  await approve(page)
  await expect(page.locator('.sandbox-ledger li')).toHaveCount(1)

  await page.getByLabel('Choose a scenario').selectOption('missing_data')
  await run(page)
  await expect(page.getByLabel('Purchase order', { exact: true })).toHaveAttribute('aria-invalid', 'true')
  await page.getByLabel('Purchase order', { exact: true }).fill('PO-8402')
  await expect(page.getByRole('button', { name: 'Approve simulated entry' })).toHaveCount(0)
  await run(page)
  await approve(page)
  await expect(page.locator('.sandbox-ledger li')).toHaveCount(2)
  await expect(page.locator('.sandbox-ledger')).toContainText('SIM-002')
})

test('rejection, cancellation, changed inputs and reset preserve human control', async ({ page }) => {
  await openSandbox(page)
  await run(page)
  await page.getByRole('button', { name: 'Reject proposal' }).click()
  await expect(page.locator('.sandbox-outcome')).toContainText('Proposal rejected.')
  await expect(page.locator('.sandbox-ledger li')).toHaveCount(0)
  await page.getByRole('button', { name: 'Run validation again' }).click()
  await page.getByRole('button', { name: 'Cancel run' }).click()
  await expect(page.locator('.sandbox-outcome')).toContainText('Run cancelled.')
  await page.getByRole('button', { name: 'Run validation again' }).click()
  await page.getByLabel('Amount (USD)').fill('4100')
  await expect(page.getByRole('button', { name: 'Approve simulated entry' })).toHaveCount(0)
  await run(page)
  await approve(page)
  await expect(page.locator('.sandbox-ledger')).toContainText('$4,100.00')
  await page.getByRole('button', { name: 'Reset sandbox' }).click()
  await expect(page.locator('.sandbox-ledger li')).toHaveCount(0)
  await expect(page.locator('.sandbox-audit li')).toHaveCount(1)
  await expect(page.getByLabel('Amount (USD)')).toHaveValue('2400')
})

test('sandbox desktop and mobile states are accessible, readable and fit the viewport', async ({ page }, testInfo) => {
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport)
    await openSandbox(page)
    await page.locator('#sandbox').screenshot({ path: testInfo.outputPath(`sandbox-${viewport.width}-ready.png`) })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    let scan = await new AxeBuilder({ page }).include('#sandbox').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
    expect(scan.violations).toEqual([])
    await run(page)
    await expect(page.getByRole('heading', { name: 'Checked. Proposed. Your call.' })).toBeInViewport()
    await page.screenshot({ path: testInfo.outputPath(`sandbox-${viewport.width}-review-viewport.png`) })
    await page.locator('#sandbox').screenshot({ path: testInfo.outputPath(`sandbox-${viewport.width}-review.png`) })
    scan = await new AxeBuilder({ page }).include('#sandbox').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
    expect(scan.violations).toEqual([])
    await page.getByRole('button', { name: 'Reset sandbox' }).click()
  }
})

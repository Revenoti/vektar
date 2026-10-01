import { defineConfig, devices } from '@playwright/test'
import { existsSync } from 'node:fs'
const compact = process.env.SERVERLESS_CHROMIUM ? (await import('@sparticuz/chromium')).default : null
const executablePath = compact ? await compact.executablePath() : process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined)
export default defineConfig({
  testDir: './tests/e2e', fullyParallel: false, workers: 2, retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:5100', trace: 'retain-on-failure', screenshot: 'only-on-failure', launchOptions: { executablePath, args: compact ? compact.args.filter(arg => arg !== '--single-process') : ['--no-sandbox'] } },
  projects: [{ name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } }, { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } }],
  webServer: { command: 'PORT=5100 HOST=127.0.0.1 node server/index.js', url: 'http://127.0.0.1:5100', reuseExistingServer: !process.env.CI },
})

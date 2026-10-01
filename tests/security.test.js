import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const files = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)])
test('local credentials are absent and protected from Git and Docker context', () => {
  assert.equal(existsSync(new URL('../.env', import.meta.url)), false)
  for (const file of ['.gitignore', '.dockerignore']) assert.match(read(file), /^\.env$/m)
  assert.match(read('.gitignore'), /^dist\/$/m)
  const example = read('.env.example')
  assert.match(example, /^RETELL_API_KEY=$/m)
  assert.doesNotMatch(example, /VITE_.*(?:KEY|TOKEN)/)
})
test('client source never reads account credentials or embeds secret-shaped keys', () => {
  for (const path of files('src').filter(path => /\.(jsx?|css)$/.test(path))) {
    const content = readFileSync(path, 'utf8')
    assert.doesNotMatch(content, /VITE_RETELL_API_KEY|process\.env\.RETELL_API_KEY|key_[a-f0-9]{24,}/i, path)
  }
})
test('deployment starts the secure Node server rather than a static-only SPA fallback', () => {
  assert.match(read('Dockerfile'), /CMD \["node", "server\/index.js"\]/)
  assert.match(read('nixpacks.toml'), /npm start/)
  assert.doesNotMatch(read('Dockerfile'), /COPY .*\.env/)
})

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
export default [
  { ignores: ['dist/**', 'node_modules/**', 'test-results/**', 'playwright-report/**', 'coverage/**', 'attached_assets/**'] },
  { files: ['**/*.{js,jsx,mjs}'], languageOptions: { ecmaVersion: 'latest', globals: { ...globals.browser, ...globals.node }, parserOptions: { ecmaFeatures: { jsx: true }, sourceType: 'module' } }, plugins: { 'react-hooks': reactHooks }, rules: { ...js.configs.recommended.rules, ...reactHooks.configs.recommended.rules, 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }] } },
]

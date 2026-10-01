import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = <StrictMode><BrowserRouter><App/></BrowserRouter></StrictMode>
if (root.hasChildNodes() && root.dataset.route === window.location.pathname && !window.location.search) hydrateRoot(root, app)
else {
  // A static 404 or query-filtered URL may differ from its prerendered shell.
  // Remove shell metadata before rendering that route to avoid duplicate canonicals.
  document.querySelectorAll('[data-vektar-meta]').forEach(node => node.remove())
  createRoot(root).render(app)
}

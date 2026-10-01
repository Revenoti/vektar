import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import { PageIntro } from '../components/Shared.jsx'
export default function NotFoundPage() { return <><SEO title="Page not found" noindex/><PageIntro eyebrow="404 / A different direction" title="This page isn’t here." description="The link may have changed. Explore our services or head back to the home page."><Link className="button button-dark" to="/">Back to Vektar →</Link></PageIntro></> }

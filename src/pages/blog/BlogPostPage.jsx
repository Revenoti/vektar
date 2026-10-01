import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import SEO from '@/components/SEO.jsx'
import blogPosts from '@/data/blogPosts.js'
import './Blog.css'

function headingId(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
}

function plainText(children) {
  if (Array.isArray(children)) return children.map(plainText).join('')
  if (children && typeof children === 'object') return plainText(children.props?.children || '')
  return String(children ?? '')
}

function ArticleLink({ href = '', children, title }) {
  const local = href.startsWith('https://vektar.io/') ? href.slice('https://vektar.io'.length) : href
  if (local.startsWith('/') && !local.startsWith('//')) return <Link to={local} title={title}>{children}</Link>
  if (local.startsWith('#')) return <a href={local} title={title}>{children}</a>
  return <a href={href} title={title} target={href.startsWith('https://') ? '_blank' : undefined} rel="noopener noreferrer">{children}</a>
}

const markdownComponents = {
  h1: ({ children }) => <h2 id={headingId(plainText(children))}>{children}</h2>,
  h2: ({ children }) => <h2 id={headingId(plainText(children))}>{children}</h2>,
  a: ArticleLink,
  table: ({ children }) => <div className="blog-table-scroll"><table>{children}</table></div>,
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const [copyStatus, setCopyStatus] = useState({ slug: null, message: '' })
  const post = blogPosts.find(item => item.slug === slug)
  const copyMessage = copyStatus.slug === slug ? copyStatus.message : ''

  if (!post) return (
    <section className="container blog-not-found">
      <SEO title="Article not found" description="This article could not be found. Explore the Vektar journal for practical AI and software insights." canonical="https://vektar.io/blog" noindex />
      <p className="eyebrow">The Vektar journal</p><h1>This page isn’t in<br />the journal.</h1><p>The link may be incomplete. Browse all articles to find what you’re looking for.</p><Link to="/blog" className="button button-primary">Back to the journal <ArrowRight size={18} aria-hidden="true" /></Link>
    </section>
  )

  const relatedPosts = [...blogPosts.filter(item => item.slug !== slug && item.category === post.category), ...blogPosts.filter(item => item.slug !== slug && item.category !== post.category)].slice(0, 3)
  const headings = [...post.content.matchAll(/^## (.+)$/gm)].map(match => ({ title: match[1].replace(/[*_`]/g, ''), id: headingId(match[1]) }))
  const shareUrl = `https://vektar.io/blog/${post.slug}`
  const formattedDate = new Date(`${post.date}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

  async function copyLink() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(shareUrl)
      setCopyStatus({ slug, message: 'Link copied' })
    } catch {
      setCopyStatus({ slug, message: 'Copy the article address from your browser' })
    }
  }

  return (
    <div className="blog-page blog-article-page">
      <SEO title={post.title} description={post.description} canonical={shareUrl} type="article" />
      <article>
        <header className="container blog-article-header">
          <Link to="/blog" className="blog-back"><ArrowLeft size={17} aria-hidden="true" /> All insights</Link>
          <p className="eyebrow">{post.category}</p>
          <h1>{post.title}</h1>
          <p className="blog-deck">{post.description}</p>
          <div className="blog-article-meta"><div className="blog-author-mark" aria-hidden="true">V</div><div><strong>{post.author}</strong><div className="blog-meta"><time dateTime={post.date}>{formattedDate}</time><span>{post.readTime}</span></div></div><button type="button" className="blog-copy" onClick={copyLink}>{copyMessage === 'Link copied' ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}<span>Copy link</span></button></div>
          <p className="blog-copy-status" role="status">{copyMessage}</p>
        </header>
        <div className="container blog-article-banner" aria-hidden="true"><img src="/blog-fallback.svg" alt="" width="960" height="600" decoding="async" /><span>THE VEKTAR JOURNAL / IDEAS INTO ACTION</span></div>
        <div className="container blog-article-layout">
          <aside className="blog-article-aside">
            <details className="blog-toc" open><summary>In this article</summary><nav aria-label="Article contents">{headings.map(heading => <a key={heading.id} href={`#${heading.id}`}>{heading.title}</a>)}</nav></details>
            <div className="blog-aside-note"><span className="eyebrow">A practical perspective</span><p>Educational guidance. Examples are illustrative, not reported client outcomes.</p><Link className="blog-text-link" to="/services">Explore our services <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
          </aside>
          <div className="blog-prose"><ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents} skipHtml disallowedElements={['img', 'iframe', 'script', 'form', 'input', 'object', 'embed']}>{post.content}</ReactMarkdown><div className="blog-article-end"><span aria-hidden="true">↗</span><p>Have a workflow in mind?<br /><Link to="/call">Talk it through with Vektar AI</Link></p></div></div>
        </div>
      </article>
      <section className="container blog-related" aria-labelledby="related-title"><div className="blog-library-heading"><h2 id="related-title">Keep exploring</h2><Link to="/blog" className="blog-text-link">All insights <ArrowRight size={18} aria-hidden="true" /></Link></div><div className="blog-related-grid">{relatedPosts.map(related => <article key={related.slug}><span className="blog-kicker">{related.category}</span><h3><Link to={`/blog/${related.slug}`}>{related.title}</Link></h3><Link className="blog-text-link" to={`/blog/${related.slug}`}>Read article <ArrowUpRight size={17} aria-hidden="true" /><span className="blog-sr-only">: {related.title}</span></Link></article>)}</div></section>
    </div>
  )
}

import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import SEO from '@/components/SEO.jsx'
import blogPosts from '@/data/blogPosts.js'
import './Blog.css'

const POSTS_PER_PAGE = 6
const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))
const categories = ['All', ...new Set(posts.map(post => post.category))]
const dateLabel = date => new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

export default function BlogListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const requestedCategory = searchParams.get('category') || 'All'
  const category = categories.includes(requestedCategory) ? requestedCategory : 'All'
  const filteredPosts = posts.filter(post =>
    (category === 'All' || post.category === category) &&
    `${post.title} ${post.description} ${post.category}`.toLowerCase().includes(query.toLowerCase().trim())
  )
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const requestedPage = Number(searchParams.get('page'))
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? Math.min(requestedPage, totalPages) : 1
  const visiblePosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)
  const featured = posts[0]

  function updateFilters(key, value) {
    const next = new URLSearchParams(searchParams)
    if (!value || value === 'All') next.delete(key)
    else next.set(key, value)
    next.delete('page')
    setSearchParams(next, { replace: key === 'q' })
  }

  function changePage(page) {
    const next = new URLSearchParams(searchParams)
    if (page === 1) next.delete('page')
    else next.set('page', String(page))
    setSearchParams(next)
    document.getElementById('article-library')?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }

  return (
    <div className="blog-page">
      <SEO title="Insights on agentic AI & software" description="Practical notes on agentic applications, workflow automation, and building dependable software for real business operations." canonical="https://vektar.io/blog" />
      <section className="blog-intro container">
        <p className="eyebrow">The Vektar journal</p>
        <div className="blog-intro-row">
          <h1>Ideas for what<br />comes <em>next.</em></h1>
          <p>Clear thinking on AI, software, and the work between them. Written for people building better ways to do business.</p>
        </div>
      </section>

      {!query && category === 'All' && currentPage === 1 && (
        <section className="container blog-featured" aria-labelledby="featured-title">
          <div className="blog-featured-art" aria-hidden="true">
            <img src="/blog-fallback.svg" alt="" width="960" height="600" decoding="async" />
            <span className="blog-art-caption">Systems, thoughtfully connected.</span>
            <span className="blog-art-index">V / 01</span>
          </div>
          <div className="blog-featured-copy">
            <span className="blog-kicker">Featured insight / {featured.category}</span>
            <h2 id="featured-title"><Link to={`/blog/${featured.slug}`}>{featured.title}</Link></h2>
            <p>{featured.description}</p>
            <div className="blog-meta"><time dateTime={featured.date}>{dateLabel(featured.date)}</time><span>{featured.readTime}</span></div>
            <Link className="blog-text-link" to={`/blog/${featured.slug}`}>Read the article <ArrowUpRight size={19} aria-hidden="true" /></Link>
          </div>
        </section>
      )}

      <section className="container blog-library" id="article-library" aria-labelledby="library-title">
        <div className="blog-library-heading"><h2 id="library-title">The latest thinking</h2><span>{blogPosts.length} articles</span></div>
        <div className="blog-controls">
          <div className="blog-filters" aria-label="Filter articles by topic">
            {categories.map(item => <button key={item} type="button" className={category === item ? 'is-active' : ''} aria-pressed={category === item} onClick={() => updateFilters('category', item)}>{item}</button>)}
          </div>
          <label className="blog-search"><Search size={18} aria-hidden="true" /><span className="blog-sr-only">Search articles</span><input type="search" value={query} onChange={event => updateFilters('q', event.target.value)} placeholder="Search the journal" /></label>
        </div>
        <p className="blog-results" role="status">{filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}{category !== 'All' ? ` in ${category}` : ''}{query ? ` matching “${query}”` : ''}</p>
        {visiblePosts.length > 0 ? (
          <div className="blog-grid">
            {visiblePosts.map((post, index) => (
              <article className="blog-card" key={post.slug}>
                <Link to={`/blog/${post.slug}`} className={`blog-card-art blog-card-art-${index % 3}`} aria-label={`Read ${post.title}`} tabIndex={-1} aria-hidden="true">
                  <img src="/blog-fallback.svg" alt="" width="960" height="600" loading="lazy" decoding="async" />
                  <span className="blog-card-category">{post.category}</span>
                  <span className="blog-card-arrow"><ArrowUpRight size={21} /></span>
                </Link>
                <div className="blog-card-body">
                  <div className="blog-meta"><time dateTime={post.date}>{dateLabel(post.date)}</time><span>{post.readTime}</span></div>
                  <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
                  <p>{post.description}</p>
                  <Link className="blog-text-link" to={`/blog/${post.slug}`}>Read article <ArrowRight size={17} aria-hidden="true" /><span className="blog-sr-only">: {post.title}</span></Link>
                </div>
              </article>
            ))}
          </div>
        ) : <div className="blog-empty"><h3>No articles match just yet.</h3><p>Try another topic or a broader search.</p><button type="button" className="blog-text-link" onClick={() => setSearchParams({})}>Clear filters <ArrowRight size={17} aria-hidden="true" /></button></div>}
        {totalPages > 1 && (
          <nav className="blog-pagination" aria-label="Article pages">
            <button type="button" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}><ChevronLeft size={17} aria-hidden="true" /><span>Previous</span></button>
            <div>{Array.from({ length: totalPages }, (_, index) => index + 1).map(page => <button type="button" key={page} onClick={() => changePage(page)} aria-current={page === currentPage ? 'page' : undefined} aria-label={`Page ${page}`}>{page}</button>)}</div>
            <button type="button" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}><span>Next</span><ChevronRight size={17} aria-hidden="true" /></button>
          </nav>
        )}
      </section>
      <section className="container blog-cta"><div><p className="eyebrow">From idea to application</p><h2>Make it work<br />for your business.</h2></div><div><p>Have a process that should work better? Explore where an agentic application could fit.</p><Link to="/call" className="button button-primary">Talk to Vektar AI <ArrowUpRight size={19} aria-hidden="true" /></Link></div></section>
    </div>
  )
}

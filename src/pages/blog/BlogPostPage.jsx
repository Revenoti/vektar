import React, { useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import SEO from '@/components/SEO.jsx'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Twitter, 
  Linkedin, 
  Facebook,
  ArrowRight,
  BookOpen
} from 'lucide-react'
import blogPosts from '@/data/blogPosts.js'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const BlogPostPage = () => {
  const { slug } = useParams()
  
  const post = useMemo(() => {
    return blogPosts.find(p => p.slug === slug)
  }, [slug])

  const relatedPosts = useMemo(() => {
    if (!post) return []
    return blogPosts
      .filter(p => p.slug !== slug && p.category === post.category)
      .slice(0, 3)
  }, [post, slug])

  // Share functionality
  const shareUrl = `https://vektar.io/blog/${slug}`
  const shareTitle = post?.title || ''

  const handleShare = (platform) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    }
    window.open(urls[platform], '_blank', 'width=600,height=400')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    alert('Link copied to clipboard!')
  }

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={post.title}
        description={post.description}
        canonical={`https://vektar.io/blog/${post.slug}`}
        type="article"
        image={post.image ? `https://vektar.io${post.image}` : 'https://vektar.io/og-image.png'}
      />

      {/* Hero Section */}
      <article className="relative">
        {/* Header Image */}
        <div className="relative h-96 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 overflow-hidden">
          {post.image && (
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover opacity-20"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Breadcrumb */}
          <div className="absolute top-8 left-4 md:left-8">
            <Button 
              asChild 
              variant="ghost" 
              className="text-white hover:bg-white/10 gap-2"
            >
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-4 bg-blue-500 text-white text-sm px-3 py-1">
                {post.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-blue-100 text-sm md:text-base">
                <span className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          {/* Share Bar - Sticky */}
          <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-10">
            <Card className="p-3 shadow-lg">
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-blue-700" />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                </button>
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                  aria-label="Copy link"
                >
                  <Share2 className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                </button>
              </div>
            </Card>
          </div>

          {/* Mobile Share Bar */}
          <div className="lg:hidden flex gap-3 mb-8 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('twitter')}
              className="gap-2"
            >
              <Twitter className="w-4 h-4" />
              Tweet
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('linkedin')}
              className="gap-2"
            >
              <Linkedin className="w-4 h-4" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Copy Link
            </Button>
          </div>

          {/* Article Description */}
          <div className="text-xl text-gray-600 mb-8 pb-8 border-b border-gray-200 font-medium">
            {post.description}
          </div>

          {/* Article Content */}
          <div className="prose prose-lg prose-blue max-w-none mb-12">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3" {...props} />,
                h4: ({node, ...props}) => <h4 className="text-xl font-semibold text-gray-800 mt-4 mb-2" {...props} />,
                p: ({node, ...props}) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700" {...props} />,
                li: ({node, ...props}) => <li className="ml-4" {...props} />,
                a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
                code: ({node, inline, ...props}) => 
                  inline 
                    ? <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800" {...props} />
                    : <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* CTA Section */}
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 mb-12">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ready to Implement These Strategies?
              </h3>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                Let's discuss how these insights apply to your specific business. 
                Book a free strategy session with our AI experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <Link to="/call">
                    Book Free Strategy Call
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <Link to="/solutions">
                    Explore AI Solutions
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                Related Articles
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card 
                    key={relatedPost.slug}
                    className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                      {relatedPost.image && (
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <Badge className="mb-3 bg-blue-100 text-blue-700 text-xs">
                        {relatedPost.category}
                      </Badge>
                      <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {relatedPost.description}
                      </p>
                      <Button 
                        asChild 
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between group-hover:bg-blue-50 group-hover:text-blue-700"
                      >
                        <Link to={`/blog/${relatedPost.slug}`}>
                          Read More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}

export default BlogPostPage

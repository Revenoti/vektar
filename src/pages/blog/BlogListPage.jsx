import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import SEO from '@/components/SEO.jsx'
import { ArrowRight, Calendar, Clock, ChevronLeft, ChevronRight, BookOpen, Sparkles } from 'lucide-react'
import blogPosts from '@/data/blogPosts.js'

const POSTS_PER_PAGE = 6

const BlogListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(blogPosts.map(post => post.category))]
    return cats
  }, [])

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') return blogPosts
    return blogPosts.filter(post => post.category === selectedCategory)
  }, [selectedCategory])

  // Paginate posts
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  // Reset to page 1 when category changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEO 
        title="AI Insights & Best Practices"
        description="Expert guidance on AI implementation, ROI optimization, security, and real-world case studies from the Vektar team."
        canonical="https://vektar.io/blog"
      />

      {/* Hero Section with CTA */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Free AI Strategy Resources</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            AI Insights & Best Practices
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Expert guidance on implementing AI that delivers measurable ROI. Learn from our real-world experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all"
            >
              <Link to="/call">
                Get Your Free AI Strategy Session
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10"
            >
              <Link to="/solutions">
                View AI Solutions
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => handleCategoryChange(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`transition-all ${
                  selectedCategory === category 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'hover:bg-blue-50'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {paginatedPosts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No posts found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedPosts.map((post) => (
                  <Card 
                    key={post.slug}
                    className="group hover:shadow-2xl transition-all duration-300 border-gray-200 overflow-hidden flex flex-col"
                  >
                    {/* Post Image */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                      {post.image && (
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      )}
                      <Badge className="absolute top-4 right-4 bg-white text-blue-700 shadow-lg">
                        {post.category}
                      </Badge>
                    </div>

                    <CardHeader className="flex-grow">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-3">
                        {post.description}
                      </p>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <Button 
                        asChild 
                        variant="ghost" 
                        className="w-full justify-between group-hover:bg-blue-50 group-hover:text-blue-700"
                      >
                        <Link to={`/blog/${post.slug}`}>
                          Read Full Article
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-10 h-10 p-0 ${
                          currentPage === i + 1 ? 'bg-blue-600' : ''
                        }`}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build AI That Delivers ROI?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Stop reading about it. Let's build your custom AI solution together. 
            Free strategy session, no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all"
            >
              <Link to="/call">
                Book Your Free Strategy Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10"
            >
              <Link to="/work">
                View Case Studies
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup CTA */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <Sparkles className="w-12 h-12 mx-auto text-blue-600 mb-4" />
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Get AI Insights in Your Inbox
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Join 1,000+ decision-makers getting weekly AI strategy tips and case studies.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  )
}

export default BlogListPage

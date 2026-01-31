import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Link और useNavigate ऐड करें
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Calendar, 
  User, 
  ArrowRight, 
  BookOpen, 
  Search,
  Tag,
  MessageSquare,
  X,
  TrendingUp,
  TrendingDown,
  Filter
} from 'lucide-react';
import blogsData from '../data/blogs.json';

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showMobileTags, setShowMobileTags] = useState(false);
  const navigate = useNavigate(); // useNavigate हुक ऐड करें

  const blogPosts = blogsData.blogPosts;
  const popularTags = blogsData.popularTags;

  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  // Filter function
  const filteredPosts = blogPosts.filter(post => {
    // Search by title or excerpt
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by tags (if any tags are selected)
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => post.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  // Mobile में tags show/hide करने के लिए
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMobileTags(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar />

      {/* HERO SECTION - MOBILE OPTIMIZED */}
      <section className="relative pt-20 md:pt-28 px-4 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <BookOpen className="w-3 h-3 text-gold" />
            <span className="text-gold font-bold text-xs uppercase tracking-[0.2em]">
              {blogsData.hero.badge.text}
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 md:mb-6 text-black leading-tight">
            Phoenix <span className="text-gold italic">Knowledge Hub</span>
          </h1>
          
          {/* Description */}
          <p className="text-base text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
            {blogsData.hero.description}
          </p>

          {/* WORKING SEARCH BAR */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={blogsData.hero.searchPlaceholder}
                className="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gold"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Search results info */}
            {searchQuery && (
              <p className="mt-2 text-sm text-gray-500">
                Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            )}
          </div>

          {/* MOBILE TAGS TOGGLE BUTTON */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowMobileTags(!showMobileTags)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              {showMobileTags ? 'Hide Tags' : 'Show Popular Tags'}
            </button>
          </div>

          {/* MOBILE TAGS - Side में scrollable */}
          <div className={`md:hidden mb-6 overflow-x-auto pb-2 ${showMobileTags ? 'block' : 'hidden'}`}>
            <div className="flex gap-2 min-w-max">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
                    selectedTags.includes(tag)
                      ? 'bg-gold text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                  {selectedTags.includes(tag) && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG CONTENT */}
      <section className="py-8 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* DESKTOP SIDEBAR - POPULAR TAGS ONLY */}
            <div className="hidden lg:block">
              <div className="sticky top-32 space-y-8">
                {/* Popular Tags - Desktop */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-black text-black mb-6 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-gold" />
                    Popular Tags
                  </h3>
                  <div className="space-y-3">
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-gold/10 text-gold border-l-4 border-gold'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <span className="font-medium">{tag}</span>
                        {selectedTags.includes(tag) ? (
                          <TrendingDown className="w-4 h-4 text-gold" />
                        ) : (
                          <TrendingUp className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters Button - Desktop */}
                {selectedTags.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* MAIN CONTENT - BLOG POSTS */}
            <div className="lg:col-span-3">
              {/* Active Filters & Stats */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-black mb-1">
                      {searchQuery || selectedTags.length > 0
                        ? `Filtered Results (${filteredPosts.length})`
                        : 'Latest Articles'
                      }
                    </h2>
                    {searchQuery || selectedTags.length > 0 ? (
                      <p className="text-gray-600">Articles matching your criteria</p>
                    ) : (
                      <p className="text-gray-600">Expert insights on finance & business</p>
                    )}
                  </div>
                  
                  {/* Active Filters */}
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gold/10 text-gold text-xs font-medium rounded-full">
                        Search: "{searchQuery}"
                        <button onClick={() => setSearchQuery('')} className="hover:text-amber-700">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {selectedTags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-gold/10 text-gold text-xs font-medium rounded-full">
                        {tag}
                        <button onClick={() => toggleTag(tag)} className="hover:text-amber-700">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {(searchQuery || selectedTags.length > 0) && (
                      <button
                        onClick={clearFilters}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200"
                      >
                        <X className="w-3 h-3" />
                        Clear All
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Blog Grid */}
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <Link 
                      key={post.id}
                      to={`/blog/${post.id}`}
                      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 block"
                    >
                      {/* Featured Image */}
                      <div className="h-48 md:h-56 overflow-hidden bg-gray-100">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 bg-gold text-white text-xs font-bold uppercase tracking-widest rounded">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 md:p-6">
                        <div className="flex items-center flex-wrap gap-3 text-xs text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{post.date}</span>
                          </div>
                          <span>{post.readTime}</span>
                        </div>

                        <h3 className="text-lg md:text-xl font-black text-black mb-2 group-hover:text-gold transition-colors leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.map((tag) => (
                            <span 
                              key={tag}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleTag(tag);
                              }}
                              className={`px-2 py-1 text-xs font-medium rounded cursor-pointer transition-colors ${
                                selectedTags.includes(tag)
                                  ? 'bg-gold text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-gold font-bold text-sm group/btn">
                          Read Full Article
                          <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                  <Search className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-black text-gray-700 mb-2">No articles found</h3>
                  <p className="text-gray-600 mb-4 max-w-md mx-auto">
                    {searchQuery 
                      ? `No articles found for "${searchQuery}". Try different keywords.`
                      : "No articles match the selected filters."
                    }
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-5 py-2 bg-gold text-black font-bold text-sm uppercase tracking-widest rounded-lg hover:bg-amber-500 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 md:py-16 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-4 md:mb-6 text-black">
            Need Expert <span className="text-gold">Financial Advice</span>?
          </h2>
          
          <p className="text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
            {blogsData.cta.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link 
              to={blogsData.cta.buttons[0].link}
              className="px-6 md:px-8 py-3 bg-gold text-black font-bold text-sm uppercase tracking-widest rounded-lg hover:bg-amber-500 transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              {blogsData.cta.buttons[0].text}
            </Link>
            
            <Link 
              to={blogsData.cta.buttons[1].link}
              className="px-6 md:px-8 py-3 bg-white text-black font-bold text-sm uppercase tracking-widest rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              {blogsData.cta.buttons[1].text}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;
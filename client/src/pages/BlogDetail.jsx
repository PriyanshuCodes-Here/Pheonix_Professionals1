import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Calendar, 
  User, 
  Clock, 
  BookOpen, 
  ArrowLeft,
  Share2,
  Bookmark,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Tag,
  ChevronRight,
  UserCheck,
  TrendingUp
} from 'lucide-react';
import blogsData from '../data/blogs.json';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  useEffect(() => {
    // Find the blog by ID
    const foundBlog = blogsData.blogPosts.find(post => post.id.toString() === id);
    
    if (foundBlog) {
      setBlog(foundBlog);
      
      // Find related posts (same tags or category)
      const related = blogsData.blogPosts
        .filter(post => 
          post.id.toString() !== id && 
          (post.tags.some(tag => foundBlog.tags.includes(tag)) || 
           post.category === foundBlog.category)
        )
        .slice(0, 3);
      
      setRelatedPosts(related);
    } else {
      // Redirect to blogs page if blog not found
      navigate('/blogs');
    }
  }, [id, navigate]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title || '';
    const text = blog?.excerpt || '';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // You can add localStorage logic here to persist bookmarks
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar />

      {/* BREADCRUMB */}
      <div className="pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/blogs" className="hover:text-gold transition-colors">Blogs</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold font-medium truncate max-w-xs">{blog.title}</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* BACK BUTTON */}
          <button
            onClick={() => navigate('/blogs')}
            className="flex items-center gap-2 text-gray-600 hover:text-gold mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blogs
          </button>

          {/* BLOG HEADER */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-4">
              <BookOpen className="w-3 h-3 text-gold" />
              <span className="text-gold font-bold text-xs uppercase tracking-[0.2em]">
                {blog.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-black leading-tight">
              {blog.title}
            </h1>

            {/* AUTHOR AND METADATA */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                  {blog.authorImage ? (
                    <img 
                      src={blog.authorImage} 
                      alt={blog.author}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gold/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-gold" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-bold text-black">{blog.author}</p>
                  <p className="text-sm text-gray-500">Certified Financial Expert</p>
                </div>
              </div>
              
              <div className="h-4 w-px bg-gray-300 hidden md:block"></div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{blog.readTime}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <UserCheck className="w-4 h-4" />
                  <span>Expert Verified</span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => setShareModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={handleBookmark}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isBookmarked
                    ? 'bg-gold/10 text-gold border border-gold/20'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-gold' : ''}`} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>
            </div>
          </div>

          {/* FEATURED IMAGE */}
          <div className="mb-10">
            <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden">
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>

          {/* BLOG CONTENT */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
              <p className="text-blue-800 font-bold mb-2">Key Takeaways:</p>
              <ul className="text-blue-700 space-y-1">
                <li>• {blog.excerpt}</li>
                <li>• Expert insights backed by financial data</li>
                <li>• Actionable strategies for implementation</li>
              </ul>
            </div>

            {/* If you have fullContent in JSON, use this */}
            {blog.fullContent ? (
              <div className="text-gray-700 leading-relaxed">
                {blog.fullContent}
              </div>
            ) : (
              /* Sample content if fullContent doesn't exist */
              <>
                <h2 className="text-2xl font-black text-black mb-4">Introduction</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  In today's rapidly evolving financial landscape, staying compliant with regulations while optimizing your tax strategy is crucial for business success. This comprehensive guide dives deep into the latest changes and provides actionable insights for businesses of all sizes.
                </p>

                <h2 className="text-2xl font-black text-black mb-4">Core Concepts & Strategies</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Understanding the fundamental principles behind {blog.category.toLowerCase()} can transform how you approach your financial planning. We'll explore practical applications and real-world case studies that demonstrate effective implementation.
                </p>

                <div className="bg-gray-50 p-6 rounded-xl my-8 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-black mb-2">Professional Insight</h3>
                      <p className="text-gray-700">
                        "Based on our experience working with 500+ businesses, implementing these strategies typically results in 15-30% improvement in financial efficiency within the first year of adoption."
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-black text-black mb-4">Implementation Guidelines</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Step-by-step guidance on how to apply these concepts in your business, including common pitfalls to avoid and best practices to follow for maximum effectiveness.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gold/5 p-6 rounded-xl border border-gold/20">
                    <h3 className="font-bold text-black mb-3">Benefits</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gold rounded-full"></div>
                        Improved compliance rates
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gold rounded-full"></div>
                        Reduced operational costs
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gold rounded-full"></div>
                        Enhanced financial visibility
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-black mb-3">Key Requirements</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        Proper documentation
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        Regular audits
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        Expert consultation
                      </li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-black text-black mb-4">Conclusion</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Implementing these strategies requires commitment but offers substantial long-term benefits. Regular review and adaptation to changing regulations will ensure sustained success in your financial management approach.
                </p>
              </>
            )}
          </div>

          {/* TAGS */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-gold" />
              Related Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blogs?tag=${tag.toLowerCase()}`}
                  className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gold hover:text-white rounded-lg transition-colors text-sm font-medium"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* SHARE MODAL */}
          {shareModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-black">Share Article</h3>
                  <button
                    onClick={() => setShareModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex justify-center gap-4 mb-6">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={window.location.href}
                    readOnly
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* RELATED POSTS */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-black text-black mb-8">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="group bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all"
                  >
                    <div className="h-40 overflow-hidden rounded-lg mb-4">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{post.category}</div>
                    <h4 className="font-bold text-black group-hover:text-gold transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA SECTION */}
          <div className="mt-16 bg-gradient-to-r from-gold/10 to-amber-50 p-8 rounded-2xl border border-gold/20">
            <div className="text-center">
              <h3 className="text-2xl font-black text-black mb-4">
                Need Personalized Advice?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Get expert consultation tailored to your specific business needs and financial goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-gold text-black font-bold rounded-lg hover:bg-amber-500 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Schedule Free Consultation
                </Link>
                <Link
                  to="/blogs"
                  className="px-6 py-3 bg-white text-black font-bold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Explore More Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;
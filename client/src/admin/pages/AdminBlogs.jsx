import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import AdminFooter from "../components/AdminFooter";

/* ✅ STATIC JSON IMPORT (READ ONLY) */
import blogsData from "../../data/blogs.json";

/* 🔒 EMPTY BLOG TEMPLATE (FULL UNIT ONLY) */
const EMPTY_BLOG = {
  id: "",
  title: "",
  excerpt: "",
  fullContent: "",
  category: "",
  author: "",
  authorImage: "",
  date: "",
  readTime: "",
  image: "",
  tags: []
};

/* 🔒 STRICT VALIDATION */
const validateBlogs = (blogs) => {
  return blogs.every((blog) =>
    blog.id &&
    blog.title &&
    blog.excerpt &&
    blog.fullContent &&
    blog.category &&
    blog.author &&
    blog.authorImage &&
    blog.image &&
    blog.readTime &&
    Array.isArray(blog.tags) &&
    blog.tags.length > 0
  );
};

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* 🔥 LOAD EXISTING BLOG POSTS */
  useEffect(() => {
    const existing = Array.isArray(blogsData?.blogPosts)
      ? blogsData.blogPosts
      : [];

    setBlogs(existing);
    setLoading(false);
  }, []);

  /* ✏️ UPDATE BLOG FIELD */
  const updateBlog = (index, key, value) => {
    const updated = [...blogs];
    updated[index][key] = value;
    setBlogs(updated);
  };

  /* ✏️ TAG HANDLING */
  const addTag = (i) => {
    const updated = [...blogs];
    updated[i].tags.push("");
    setBlogs(updated);
  };

  const updateTag = (i, t, value) => {
    const updated = [...blogs];
    updated[i].tags[t] = value;
    setBlogs(updated);
  };

  const removeTag = (i, t) => {
    const updated = [...blogs];
    updated[i].tags.splice(t, 1);
    setBlogs(updated);
  };

  /* ➕ ADD FULL BLOG */
  const addBlog = () => {
    setBlogs([
      ...blogs,
      {
        ...EMPTY_BLOG,
        id: Date.now(),
        date: new Date().toISOString()
      }
    ]);
  };

  /* 🗑 DELETE FULL BLOG */
  const deleteBlog = (index) => {
    if (!window.confirm("Delete this blog permanently?")) return;
    const updated = [...blogs];
    updated.splice(index, 1);
    setBlogs(updated);
  };

  /* 💾 SAVE JSON */
  const saveAll = async () => {
    if (!validateBlogs(blogs)) {
      alert("❌ All blog fields are mandatory. Partial save not allowed.");
      return;
    }

    try {
      setSaving(true);
      await axios.post("http://localhost:5001/api/blogs-json", {
        blogPosts: blogs
      });
      alert("✅ blogs.json saved successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save blogs.json");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-300 border-t-[#C5A059] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <AdminNavbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">
            Blog Content Management
          </h1>
          <p className="text-gray-500 text-lg">
            Manage blog posts for the financial services platform
          </p>
          <div className="h-[1px] bg-gradient-to-r from-[#C5A059]/30 to-transparent mt-6 w-24"></div>
        </div>

        {/* Stats Bar */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-10 border border-gray-200">
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Blog Overview</h3>
              <p className="text-sm text-gray-500">Total: {blogs.length} posts</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{blogs.length}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {blogs.filter(blog => validateBlogs([blog])).length}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Complete</div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {blogs.map((blog, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C5A059]/10 to-[#8C6D2E]/10 border border-[#C5A059]/20 flex items-center justify-center">
                      <span className="text-lg font-bold text-[#8C6D2E]">#{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Blog Post {blog.id ? `ID: ${blog.id}` : 'New'}</h3>
                      <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${validateBlogs([blog]) ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {validateBlogs([blog]) ? '✓ Complete' : '⚠ Incomplete'}
                    </div>
                    <button
                      onClick={() => deleteBlog(i)}
                      className="px-4 py-1.5 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:from-red-100 hover:to-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 space-y-8">
                {/* Content Section */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#C5A059] rounded-full"></span>
                    Content
                  </h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 focus:border-[#C5A059] transition"
                          placeholder="Enter blog post title"
                          value={blog.title}
                          onChange={(e) => updateBlog(i, "title", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Excerpt
                        </label>
                        <textarea
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 focus:border-[#C5A059] transition min-h-[120px]"
                          placeholder="Brief summary for preview"
                          value={blog.excerpt}
                          onChange={(e) => updateBlog(i, "excerpt", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Content
                        </label>
                        <textarea
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 focus:border-[#C5A059] transition min-h-[200px] font-mono text-sm"
                          placeholder="Write full blog content here..."
                          value={blog.fullContent}
                          onChange={(e) => updateBlog(i, "fullContent", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                          </label>
                          <input
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 focus:border-[#C5A059] transition"
                            placeholder="e.g., Finance, Strategy"
                            value={blog.category}
                            onChange={(e) => updateBlog(i, "category", e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Read Time
                          </label>
                          <input
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 focus:border-[#C5A059] transition"
                            placeholder="e.g., 5 min read"
                            value={blog.readTime}
                            onChange={(e) => updateBlog(i, "readTime", e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Author Name
                        </label>
                        <input
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 focus:border-[#C5A059] transition"
                          placeholder="Author's full name"
                          value={blog.author}
                          onChange={(e) => updateBlog(i, "author", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Author Image URL
                        </label>
                        <input
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 focus:border-[#C5A059] transition text-sm"
                          placeholder="https://example.com/author.jpg"
                          value={blog.authorImage}
                          onChange={(e) => updateBlog(i, "authorImage", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cover Image URL
                        </label>
                        <input
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 focus:border-[#C5A059] transition text-sm"
                          placeholder="https://example.com/cover.jpg"
                          value={blog.image}
                          onChange={(e) => updateBlog(i, "image", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags Section */}
                <div className="border-t border-gray-200 pt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#C5A059] rounded-full"></span>
                      Tags
                    </h4>
                    <button
                      onClick={() => addTag(i)}
                      className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:from-gray-100 hover:to-gray-200 transition-colors"
                    >
                      + Add Tag
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {blog.tags.map((tag, t) => (
                      <div key={t} className="flex items-center gap-2">
                        <input
                          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 focus:border-[#C5A059] transition"
                          value={tag}
                          placeholder="Tag name"
                          onChange={(e) => updateTag(i, t, e.target.value)}
                        />
                        <button
                          onClick={() => removeTag(i, t)}
                          className="px-3 py-3 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-600 rounded-lg hover:from-red-100 hover:to-red-200 transition-colors"
                        >
                          <span className="text-sm">✕</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={addBlog}
              className="px-8 py-3.5 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300 text-gray-800 rounded-xl font-semibold hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-sm"
            >
              + Add New Blog Post
            </button>
            
            <button
              onClick={saveAll}
              disabled={saving}
              className="px-8 py-3.5 bg-gradient-to-r from-[#C5A059] to-[#8C6D2E] text-white rounded-xl font-semibold hover:from-[#8C6D2E] hover:to-[#6B531F] transition-all duration-300 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </span>
              ) : (
                'Save All Changes'
              )}
            </button>
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
};

export default AdminBlogs;
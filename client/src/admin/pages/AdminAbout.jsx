import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import AdminFooter from "../components/AdminFooter";
import { 
  Save, 
  Loader2, 
  Eye,
  RefreshCw,
  FileText,
  Type,
  Palette,
  Sparkles,
  Target,
  Shield,
  Award,
  TrendingUp,
  Users,
  Globe,
  Clock,
  CheckCircle,
  Zap,
  Download,
  Upload,
  Maximize2,
  Minimize2,
  Bold,
  Italic,
  List,
  Heading,
  Link,
  Image,
  Code,
  BarChart3,
  Settings,
  Grid,
  Layers,
  Copy,
  RotateCcw,
  History,
  AlertCircle,
  X,
  Plus,
  Minus,
  Sun,
  Moon,
  Contrast,
  Columns,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Edit3  // ✅ यहाँ Edit3 IMPORT किया
} from "lucide-react";

const About = () => {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lastSaved, setLastSaved] = useState(null);
  const [editorTheme, setEditorTheme] = useState("dark");
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [showFormatting, setShowFormatting] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [revisionHistory, setRevisionHistory] = useState([]);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchAbout();
  }, []);

  useEffect(() => {
    updateCounts();
  }, [content]);

  const updateCounts = () => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharCount(content.length);
  };

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5002/api/admin/about",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Backend से सिर्फ heading और content आते हैं
      setHeading(res.data.heading || "");
      setContent(res.data.content || "");
      setLastSaved(new Date().toLocaleTimeString());
      
      // Revision history (frontend only - for UI enhancement)
      setRevisionHistory([
        { id: 1, time: "10:30 AM", user: "Admin", changes: "Initial content" },
        { id: 2, time: "11:45 AM", user: "Admin", changes: "Updated heading" },
        { id: 3, time: "2:15 PM", user: "Admin", changes: "Enhanced content" },
      ]);
    } catch (err) {
      showNotification("Failed to load About content", "error");
    } finally {
      setLoading(false);
    }
  };

  const saveAbout = async () => {
    try {
      setSaving(true);
      
      // ✅ Backend को सिर्फ heading और content भेजें (exactly as backend expects)
      await axios.put(
        "http://localhost:5002/api/admin/about",
        { 
          heading: heading, 
          content: content 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setLastSaved(new Date().toLocaleTimeString());
      showNotification("About page updated successfully!", "success");
      
      // Add to revision history (frontend only)
      setRevisionHistory(prev => [
        {
          id: prev.length + 1,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          user: "Admin",
          changes: "Content updated"
        },
        ...prev.slice(0, 4)
      ]);
    } catch (err) {
      showNotification("Failed to save About content", "error");
    } finally {
      setSaving(false);
    }
  };

  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl transform translate-x-0 opacity-100 transition-all duration-500 ${type === 'success' ? 'bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700' : 'bg-gradient-to-r from-red-500 via-red-600 to-red-700'}`;
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="p-2 bg-white/20 rounded-lg">
          ${type === 'success' ? 
            '<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' : 
            '<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg>'
          }
        </div>
        <div>
          <p class="text-white font-bold">${message}</p>
          <p class="text-white/80 text-sm">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 500);
    }, 3000);
  };

  const handleFormat = (format) => {
    const textarea = document.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let formattedText = '';
    
    switch(format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'heading':
        formattedText = `## ${selectedText}`;
        break;
      case 'list':
        formattedText = `- ${selectedText}`;
        break;
      case 'link':
        formattedText = `[${selectedText}](https://example.com)`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
        <AdminNavbar />
        <div className="ml-64 p-8">
          <div className="flex items-center justify-center h-[70vh]">
            <div className="text-center">
              <div className="relative">
                <div className="w-32 h-32 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-16 h-16 text-amber-500 animate-pulse" />
                </div>
              </div>
              <p className="mt-6 text-2xl font-bold text-white">Loading About Page</p>
              <p className="text-gray-400 text-lg mt-2">Fetching your content...</p>
              <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
      <AdminNavbar />
      
      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-xl">
                  <FileText className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    About Page Editor
                  </h1>
                  <p className="text-gray-400">
                    Craft the story of Phoenix Professionals
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 bg-gray-800 text-gray-300 hover:text-white rounded-xl flex items-center gap-2 transition-colors"
              >
                <Eye className="w-4 h-4" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <button
                onClick={fetchAbout}
                className="px-4 py-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-xl flex items-center gap-2 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Word Count</p>
                  <p className="text-3xl font-bold text-white mt-2">{wordCount}</p>
                </div>
                <div className="p-3 bg-amber-500/20 rounded-xl">
                  <Type className="w-6 h-6 text-amber-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Character Count</p>
                  <p className="text-3xl font-bold text-white mt-2">{charCount}</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Code className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Last Saved</p>
                  <p className="text-xl font-bold text-white mt-2">{lastSaved || 'Never'}</p>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <p className="text-xl font-bold text-white mt-2">
                    {content ? 'Draft' : 'Empty'}
                  </p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Editor Header */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                    <Edit3 className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Content Editor</h3>
                    <p className="text-sm text-gray-400">Edit your About page content</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowFormatting(!showFormatting)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setFontSize(Math.max(12, fontSize - 1))}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Formatting Toolbar */}
              {showFormatting && (
                <div className="mb-6 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => handleFormat('bold')}
                      className="px-3 py-2 bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg flex items-center gap-2"
                    >
                      <Bold className="w-4 h-4" />
                      Bold
                    </button>
                    <button
                      onClick={() => handleFormat('italic')}
                      className="px-3 py-2 bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg flex items-center gap-2"
                    >
                      <Italic className="w-4 h-4" />
                      Italic
                    </button>
                    <button
                      onClick={() => handleFormat('heading')}
                      className="px-3 py-2 bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg flex items-center gap-2"
                    >
                      <Heading className="w-4 h-4" />
                      Heading
                    </button>
                    <button
                      onClick={() => handleFormat('list')}
                      className="px-3 py-2 bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg flex items-center gap-2"
                    >
                      <List className="w-4 h-4" />
                      List
                    </button>
                    <button
                      onClick={() => handleFormat('link')}
                      className="px-3 py-2 bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg flex items-center gap-2"
                    >
                      <Link className="w-4 h-4" />
                      Link
                    </button>
                    <div className="flex items-center gap-2 ml-auto">
                      <select
                        value={fontSize}
                        onChange={(e) => setFontSize(parseInt(e.target.value))}
                        className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg"
                      >
                        {[12, 14, 16, 18, 20, 22, 24].map(size => (
                          <option key={size} value={size}>{size}px</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Heading Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                  <Heading className="w-4 h-4" />
                  Page Heading
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-900/30 border-2 border-gray-700 text-white text-xl font-bold rounded-xl focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/20 placeholder-gray-500"
                    placeholder="Enter page heading..."
                    style={{ fontSize: `${fontSize * 1.5}px` }}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {heading.length}/120
                  </div>
                </div>
              </div>

              {/* Content Editor */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-400 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Page Content
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                      {wordCount} words • {charCount} chars
                    </div>
                    <button
                      onClick={() => {
                        setContent('');
                        setHeading('');
                      }}
                      className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Clear
                    </button>
                  </div>
                </div>
                
                <div className="relative">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={15}
                    className="w-full px-6 py-4 bg-gray-900/30 border-2 border-gray-700 text-white rounded-xl focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 resize-none font-mono"
                    placeholder="Start typing your About page content here..."
                    style={{ 
                      fontSize: `${fontSize}px`,
                      lineHeight: lineHeight 
                    }}
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-3">
                    <button
                      onClick={() => setLineHeight(Math.min(2.5, lineHeight + 0.1))}
                      className="p-1 text-gray-500 hover:text-white"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setLineHeight(Math.max(1, lineHeight - 0.1))}
                      className="p-1 text-gray-500 hover:text-white"
                    >
                      <Minimize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Auto-save Settings */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                    <Settings className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Editor Settings</h3>
                    <p className="text-sm text-gray-400">Customize your editing experience</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-gray-400" />
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="themeToggle"
                        checked={editorTheme === 'dark'}
                        onChange={() => setEditorTheme(editorTheme === 'dark' ? 'light' : 'dark')}
                        className="sr-only"
                      />
                      <label
                        htmlFor="themeToggle"
                        className="block w-12 h-6 bg-gray-700 rounded-full cursor-pointer"
                      >
                        <div className={`w-6 h-6 bg-amber-500 rounded-full transform transition-transform ${editorTheme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </label>
                    </div>
                    <Moon className="w-4 h-4 text-gray-400" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="autoSave"
                      checked={autoSave}
                      onChange={() => setAutoSave(!autoSave)}
                      className="w-4 h-4 text-amber-500 bg-gray-700 border-gray-600 rounded focus:ring-amber-500/50"
                    />
                    <label htmlFor="autoSave" className="text-sm text-gray-300">
                      Auto-save
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Preview & Actions */}
          <div className="space-y-6">
            {/* Live Preview */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 overflow-hidden">
              <div className="p-6 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg">
                      <Eye className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Live Preview</h3>
                      <p className="text-sm text-gray-400">See your changes in real-time</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-emerald-400">Live</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 min-h-[300px] border border-gray-700/50">
                  {heading ? (
                    <h1 className="text-3xl font-bold text-white mb-6 border-l-4 border-amber-500 pl-4">
                      {heading}
                    </h1>
                  ) : (
                    <div className="h-8 bg-gray-700/50 rounded mb-6 animate-pulse"></div>
                  )}
                  
                  {content ? (
                    <div className="prose prose-invert max-w-none">
                      <div className="text-gray-300 whitespace-pre-wrap">
                        {content.split('\n').map((line, i) => (
                          <p key={i} className="mb-4">{line}</p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-700/50 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-700/50 rounded animate-pulse w-5/6"></div>
                      <div className="h-4 bg-gray-700/50 rounded animate-pulse w-4/6"></div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-700/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{wordCount}</div>
                      <div className="text-sm text-gray-400">Words</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{charCount}</div>
                      <div className="text-sm text-gray-400">Characters</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Revision History */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50">
              <div className="p-6 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                      <History className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Revision History</h3>
                  </div>
                  <span className="text-sm text-gray-400">{revisionHistory.length} revisions</span>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4 max-h-48 overflow-y-auto">
                  {revisionHistory.map((revision) => (
                    <div key={revision.id} className="flex items-center gap-3 p-3 bg-gray-900/30 rounded-lg">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{revision.changes}</p>
                        <p className="text-xs text-gray-500">{revision.time} • {revision.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Save Action Card */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-2xl p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Save className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Save Your Changes</h3>
                <p className="text-gray-400 text-sm">
                  All changes will be published to the live website
                </p>
              </div>
              
              <button
                onClick={saveAbout}
                disabled={saving}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-2xl shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Publishing Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-6 h-6" />
                    PUBLISH ABOUT PAGE
                  </>
                )}
              </button>
              
              <div className="mt-6 pt-6 border-t border-emerald-500/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Last Saved</div>
                    <div className="text-white font-medium">{lastSaved || 'Never'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Status</div>
                    <div className="text-emerald-400 font-medium">Ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AdminFooter />

      {/* Add custom styles */}
      <style jsx global>{`
        /* Enhanced Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.4);
          border-radius: 10px;
          margin: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #C5A059, #8C6D2E, #D4AF37);
          border-radius: 10px;
          border: 2px solid rgba(31, 41, 55, 0.4);
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #D4AF37, #B8860B, #C5A059);
        }
        ::-webkit-scrollbar-corner {
          background: transparent;
        }
        
        /* Text Selection */
        ::selection {
          background: rgba(197, 160, 89, 0.4);
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
        
        /* Smooth Typing Animation */
        @keyframes typing {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        textarea:focus {
          animation: typing 0.2s ease-out;
        }
        
        /* Gradient Border Animation */
        @keyframes border-glow {
          0%, 100% { border-color: rgba(197, 160, 89, 0.3); }
          50% { border-color: rgba(197, 160, 89, 0.7); }
        }
        
        .border-glow {
          animation: border-glow 2s ease-in-out infinite;
        }
        
        /* Floating Animation */
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Pulse Animation */
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }
        
        /* Shimmer Effect */
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .shimmer {
          background: linear-gradient(90deg, 
            rgba(255,255,255,0) 0%, 
            rgba(255,255,255,0.1) 50%, 
            rgba(255,255,255,0) 100%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite linear;
        }
        
        /* Card Hover Effect */
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        /* Glass Effect */
        .glass {
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* Neon Glow */
        .neon-glow {
          box-shadow: 
            0 0 20px rgba(197, 160, 89, 0.3),
            0 0 40px rgba(197, 160, 89, 0.2),
            0 0 60px rgba(197, 160, 89, 0.1);
        }
        
        /* Typography Enhancements */
        .prose {
          color: #e5e7eb;
          line-height: 1.8;
        }
        
        .prose h1, .prose h2, .prose h3 {
          color: #f9fafb;
          font-weight: 800;
          margin-top: 2em;
          margin-bottom: 1em;
        }
        
        .prose p {
          margin-bottom: 1.5em;
        }
        
        /* Input Enhancements */
        input, textarea, select {
          transition: all 0.2s ease;
        }
        
        input:focus, textarea:focus, select:focus {
          transform: translateY(-1px);
          box-shadow: 
            0 10px 25px -5px rgba(0, 0, 0, 0.2),
            0 0 15px rgba(197, 160, 89, 0.3);
        }
      `}</style>
    </div>
  );
};

export default About;
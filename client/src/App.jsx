import { Routes, Route } from "react-router-dom";

/* ===== Client Pages ===== */
import Home from "./pages/HomePage";
import ClientAbout from "./pages/About";
import Services from "./pages/Services";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import ClientLogin from "./pages/Login"; // ✅ ADD THIS
import BlogDetail from './pages/BlogDetail'
/* ===== Admin Pages ===== */
import AdminLogin from "./admin/pages/Login";
import AdminHome from "./admin/pages/AdminHome";
import AdminBlogs from "./admin/pages/AdminBlogs";
import AdminAbout from "./admin/pages/AdminAbout";
import AdminServices from "./admin/pages/AdminServices";

function App() {
  return (
    <Routes>
      {/* ===== Client Routes ===== */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<ClientAbout />} />
      <Route path="/services" element={<Services />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<ClientLogin />} /> {/* ✅ CLIENT LOGIN */}

      {/* ===== Admin Routes ===== */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/blogs" element={<AdminBlogs />} />
      <Route path="/admin/about" element={<AdminAbout />} />
      <Route path="/admin/services" element={<AdminServices />} />
    </Routes>
  );
}

export default App;

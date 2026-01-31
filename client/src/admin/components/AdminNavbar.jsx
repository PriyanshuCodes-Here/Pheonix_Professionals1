import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { 
  Settings, 
  Info, 
  BookOpen, 
  LogOut,
  Shield,
  LayoutDashboard,
  Menu,
  X,
  User,
  Bell
} from "lucide-react";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { logout } = useAdminAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/services", label: "Services", icon: Settings },
    { to: "/admin/blogs", label: "Blogs", icon: BookOpen },
    { to: "/admin/about", label: "About", icon: Info },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      scrolled 
        ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 shadow-2xl py-3" 
        : "bg-zinc-950 border-b border-zinc-900 py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3 min-w-fit">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <Shield size={22} className="text-zinc-950" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-white font-black text-xl tracking-tighter leading-none">PHOENIX</h1>
            <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em]">Enterprise</span>
          </div>
        </div>

        {/* Desktop Nav - Centered Pill */}
        <div className="hidden md:flex items-center bg-zinc-900/80 border border-zinc-800 p-1 rounded-2xl">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) => `
                flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                ${isActive 
                  ? "bg-zinc-100 text-zinc-950 shadow-md" 
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"}
              `}
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="hidden sm:flex p-2 text-zinc-400 hover:text-white transition-colors">
            <Bell size={20} />
          </button>
          
          <div className="h-6 w-[1px] bg-zinc-800 hidden sm:block" />

          <button
            onClick={logout}
            className="group flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl border border-red-500/20 transition-all duration-300"
          >
            <span className="hidden sm:block text-sm font-bold">Logout</span>
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 bg-zinc-900 rounded-lg text-zinc-100 border border-zinc-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-800 transition-all duration-300 ease-in-out md:hidden
        ${isOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-4 opacity-0 invisible"}
      `}>
        <div className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-bold transition-all
                ${isActive ? "bg-amber-500 text-zinc-950" : "bg-zinc-900 text-zinc-400"}
              `}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
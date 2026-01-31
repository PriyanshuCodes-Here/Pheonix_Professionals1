import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Zap,
  Mail,
  Phone,
  Award,
  Shield,
  Clock,
  MessageSquare,
  Home,
  Users,
  Briefcase,
  BookOpen,
  User,
  LogOut,
  LayoutDashboard
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  /* =====================
     LOAD USER
  ===================== */
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  /* =====================
     SCROLL EFFECT
  ===================== */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* =====================
     CLOSE ON ROUTE CHANGE
  ===================== */
  useEffect(() => {
    setIsOpen(false);
    setAccountOpen(false);
  }, [location.pathname]);

  /* =====================
     CLICK OUTSIDE ACCOUNT
  ===================== */
  useEffect(() => {
    const handler = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* =====================
     LOGOUT
  ===================== */
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    window.location.reload();
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <Users className="w-4 h-4" /> },
    { name: 'Services', path: '/services', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Blogs', path: '/blogs', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: <MessageSquare className="w-4 h-4" /> }
  ];

  const avatarLetter = user?.name?.charAt(0)?.toUpperCase();

  return (
    <>
      {/* TOP BAR (DESKTOP) */}
      <div className="hidden lg:block bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between text-xs text-gray-400">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-gold" /> +91 8076 551 974
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-3 h-3 text-gold" /> professionalsphoenix@gmail.com
            </span>
          </div>
          <div className="flex gap-6">
            <span className="flex items-center gap-1">
              <Award className="w-3 h-3 text-gold" /> ISO 9001
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-gold" /> Secure
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gold" /> 24/7
            </span>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav
        className={`fixed top-0 w-full z-[1000] transition ${
          scrolled
            ? 'bg-black/95 backdrop-blur border-b border-white/10'
            : 'bg-black'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-amber-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-black leading-none">
                PHOENIX<span className="text-gold">.</span>
              </p>
              <p className="text-[10px] text-gray-400 tracking-widest">
                PROFESSIONALS
              </p>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${
                    isActive
                      ? 'text-gold bg-gold/10'
                      : 'text-gray-300 hover:text-gold'
                  }`
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            ))}

            {/* AUTH DESKTOP */}
            {!user ? (
              <Link
                to="/login"
                className="ml-4 px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-gold hover:bg-white/5 flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Login
              </Link>
            ) : (
              <div className="relative ml-4" ref={accountRef}>
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5"
                >
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center font-bold">
                      {avatarLetter}
                    </div>
                  )}
                  <div className="text-left leading-tight">
                    <p className="text-sm text-white font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-900 rounded-xl border border-white/10 shadow-xl overflow-hidden">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5"
                    >
                      <LayoutDashboard className="w-4 h-4 text-gold" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-white/5"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-[1200] transition ${
          isOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/80 transition-opacity ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-black border-l border-white/10 transform transition-transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* MOBILE HEADER → USER NAME */}
          <div className="p-6 border-b border-white/10">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold text-black flex items-center justify-center font-bold">
                  {avatarLetter}
                </div>
                <div>
                  <p className="text-white font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
            ) : (
              <p className="text-white font-semibold">Menu</p>
            )}
          </div>

          {/* MOBILE LINKS */}
          <div className="p-6 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5"
              >
                {link.name}
              </NavLink>
            ))}

            {!user ? (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5"
              >
                Login / Register
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-lg text-red-400 hover:bg-white/5"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SPACER */}
      <div className="h-20 lg:h-28" />
    </>
  );
};

export default Navbar;

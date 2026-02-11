import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronDown,
  ChevronUp,
  Shield,
  Clock,
  Award,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);
  const currentYear = new Date().getFullYear();

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const footerSections = {
    services: [
      { name: 'Accounting & Bookkeeping', path: '/services#accounting' },
      { name: 'Tax Planning', path: '/services#tax' },
      { name: 'GST Compliance', path: '/gst-filling' },
      { name: 'Business Formation', path: '/services#business' },
      { name: 'Audit & Assurance', path: '/services#audit' }
    ],
    company: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Blogs', path: '/blogs' },
      { name: 'Contact', path: '/contact' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Disclaimer', path: '/disclaimer' }
    ]
  };

  return (
    <footer className="bg-black text-gray-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        
        {/* TOP SECTION - Logo & Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-amber-600 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">
                  PHOENIX<span className="text-gold">.</span>
                </h3>
                <p className="text-xs text-gray-400 uppercase tracking-[0.3em]">PROFESSIONALS</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Precision accounting, strategic tax planning, comprehensive compliance.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-400">+91 8076 551 974</p>
                <p className="text-xs text-gray-500">Mon-Fri, 9AM-6PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-400">professionalsphoenix@gmail.com</p>
                <p className="text-xs text-gray-500">Quick response</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" />
              <span className="text-sm text-gray-400">Delhi, India</span>
            </div>
          </div>
        </div>

        {/* COLLAPSIBLE SECTIONS - Mobile Only */}
        <div className="lg:hidden space-y-4 mb-6">
          {/* Services Dropdown */}
          <div className="border-b border-white/10 pb-4">
            <button 
              onClick={() => toggleSection('services')}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="font-semibold text-white text-sm uppercase tracking-widest">Services</span>
              {openSection === 'services' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSection === 'services' && (
              <div className="mt-3 space-y-2 pl-2">
                {footerSections.services.map((item) => (
                  <Link 
                    key={item.name}
                    to={item.path}
                    className="block text-sm text-gray-400 hover:text-gold transition-colors py-1"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Company Dropdown */}
          <div className="border-b border-white/10 pb-4">
            <button 
              onClick={() => toggleSection('company')}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="font-semibold text-white text-sm uppercase tracking-widest">Company</span>
              {openSection === 'company' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSection === 'company' && (
              <div className="mt-3 space-y-2 pl-2">
                {footerSections.company.map((item) => (
                  <Link 
                    key={item.name}
                    to={item.path}
                    className="block text-sm text-gray-400 hover:text-gold transition-colors py-1"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Legal Dropdown */}
          <div className="border-b border-white/10 pb-4">
            <button 
              onClick={() => toggleSection('legal')}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="font-semibold text-white text-sm uppercase tracking-widest">Legal</span>
              {openSection === 'legal' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSection === 'legal' && (
              <div className="mt-3 space-y-2 pl-2">
                {footerSections.legal.map((item) => (
                  <Link 
                    key={item.name}
                    to={item.path}
                    className="block text-sm text-gray-400 hover:text-gold transition-colors py-1"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* DESKTOP LINKS - Hidden on Mobile */}
        <div className="hidden lg:grid grid-cols-3 gap-8 mb-6">
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Services</h4>
            <div className="space-y-2">
              {footerSections.services.map((item) => (
                <Link 
                  key={item.name}
                  to={item.path}
                  className="block text-sm text-gray-400 hover:text-gold transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Company</h4>
            <div className="space-y-2">
              {footerSections.company.map((item) => (
                <Link 
                  key={item.name}
                  to={item.path}
                  className="block text-sm text-gray-400 hover:text-gold transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Legal</h4>
            <div className="space-y-2">
              {footerSections.legal.map((item) => (
                <Link 
                  key={item.name}
                  to={item.path}
                  className="block text-sm text-gray-400 hover:text-gold transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* TRUST BADGES */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-gold" />
            <span className="text-xs text-gray-400">ISO 9001:2015</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-gold" />
            <span className="text-xs text-gray-400">Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold" />
            <span className="text-xs text-gray-400">24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">500+ Clients</span>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
            <div className="order-2 md:order-1">
              <p className="text-xs text-gray-500">
                © {currentYear} Phoenix Professionals. All rights reserved.
              </p>
            </div>
            
            <div className="order-1 md:order-2 mb-2 md:mb-0">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-gold" />
                <span className="text-xs text-gray-400">Redefining Financial Excellence</span>
              </div>
            </div>
            
            <div className="order-3">
              <p className="text-xs text-gray-600">
                EST. 2026 • DELHI, INDIA
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
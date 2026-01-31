import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Mail, Phone, MapPin, Send, ShieldCheck, 
  CheckCircle, ChevronDown, ChevronRight,
  Shield, Zap, Globe, Award, Star, AlertCircle, Loader2
} from 'lucide-react';
// नया बैकएंड इम्पोर्ट
import { contactAPI } from '../services/api';

// --- CUSTOM ANIMATED SELECT COMPONENT ---
const CustomSelect = ({ label, options, value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative space-y-2" ref={dropdownRef}>
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-5 bg-white border-2 transition-all duration-300 rounded-2xl ${
          isOpen ? "border-gold ring-4 ring-gold/5" : error ? "border-red-500" : "border-gray-100 hover:border-gray-300"
        }`}
      >
        <span className={`font-medium ${value ? "text-black" : "text-gray-400"}`}>
          {value || "Select a specialized service"}
        </span>
        <ChevronDown className={`w-5 h-5 text-gold transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden py-2 max-h-64 overflow-y-auto"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className="w-full text-left px-6 py-4 hover:bg-gold/5 hover:text-gold font-bold text-sm transition-colors flex items-center justify-between group"
              >
                {opt}
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- ELITE INPUT FIELD ---
const EliteInput = ({ label, error, ...props }) => (
  <div className="space-y-2 group">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-gold transition-colors ml-1">
      {label}
    </label>
    <input
      {...props}
      className={`w-full p-5 bg-white border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-gold/5 transition-all duration-300 font-medium placeholder:text-gray-300 ${
        error ? "border-red-500 focus:border-red-500" : "border-gray-100 focus:border-gold"
      }`}
    />
  </div>
);

const Contact = () => {
  // --- STATES (Merged from New Logic) ---
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', service: '', customService: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // --- SERVICES (Updated list from New Content) ---
  const services = [
    'GST Compliance', 'Income Tax Filing', 'Company Registration', 
    'Accounting Services', 'Audit & Assurance', 'Financial Consulting', 
    'Investment Advisory', 'Business Valuation', 'Succession Planning', 'Other'
  ];

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  // --- VALIDATION LOGIC (From New Content) ---
  const validateForm = () => {
    if (!formData.name.trim()) { setError('Please enter your name'); return false; }
    if (!formData.email.trim()) { setError('Please enter your email'); return false; }
    if (!/\S+@\S+\.\S+/.test(formData.email)) { setError('Please enter a valid email'); return false; }
    if (!formData.phone.trim()) { setError('Please enter your phone number'); return false; }
    if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) { setError('Please enter a valid 10-digit phone number'); return false; }
    if (!formData.service) { setError('Please select a service'); return false; }
    if (!formData.message.trim() || formData.message.trim().length < 10) { setError('Please enter a message (min. 10 chars)'); return false; }
    return true;
  };

  // --- SUBMIT LOGIC (Now using contactAPI) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const finalService = formData.service === "Other" ? formData.customService : formData.service;
      const response = await contactAPI.submit({
        ...formData,
        service: finalService,
        phone: formData.phone.replace(/\D/g, '')
      });

      // यहाँ बदलाव किया है - response.data.success
      if (response.data.success) {
        setSuccess(true);
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          company: '', 
          service: '', 
          customService: '', 
          message: '' 
        });
      }
    } catch (err) {
      setError(err?.message || err?.error || 'Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] selection:bg-gold selection:text-black">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-48 pb-32 px-6 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px]" 
        />
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 text-gold text-[10px] font-black uppercase tracking-[0.4em] mb-12"
          >
            <Zap className="w-3 h-3 fill-gold" />
            Leading Financial Excellence
          </motion.div>
          <h1 className="text-6xl md:text-9xl font-black text-white leading-none tracking-tighter mb-8">
            Let's Start Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold italic">Ascension.</span>
          </h1>
        </div>
      </section>

      {/* --- MAIN INTERFACE GRID --- */}
      <section className="relative z-20 -mt-24 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100">
            
            {/* LEFT PANEL */}
            <div className="hidden lg:flex lg:col-span-4 bg-[#0A0A0A] p-16 flex-col justify-between relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-gold/10 to-transparent pointer-events-none" />
              
              <div className="relative space-y-16">
                <div>
                  <h2 className="text-4xl font-black mb-4">Direct<br />Concierge</h2>
                  <div className="h-1.5 w-16 bg-gold rounded-full" />
                </div>

                <div className="space-y-12">
                  <div className="group">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-3 group-hover:text-gold transition-colors">Official Correspondence</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all">
                        <Mail className="w-5 h-5" />
                      </div>
                      <p className="text-lg font-bold">info@phoenixprofessionals.com</p>
                    </div>
                  </div>

                  <div className="group">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-3 group-hover:text-gold transition-colors">Executive Line</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all">
                        <Phone className="w-5 h-5" />
                      </div>
                      <p className="text-lg font-bold">+91 98765 43210</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative pt-12 border-t border-white/10 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-black bg-gray-800" />
                  ))}
                </div>
                <p className="text-xs text-gray-400 font-medium">Joined by <span className="text-white font-black uppercase tracking-widest ml-1">500+ Enterprises</span></p>
              </div>
            </div>

            {/* RIGHT PANEL: FORM */}
            <div className="lg:col-span-8 p-8 md:p-16 lg:p-24">
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form 
                    key="contact-form"
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleSubmit} 
                    className="space-y-10"
                  >
                    <div className="space-y-4 mb-12">
                      <h3 className="text-4xl font-black tracking-tight">Schedule Consultation</h3>
                      <p className="text-gray-500 font-medium">Bespoke financial roadmap for your business ambitions.</p>
                    </div>

                    {/* Error Message Display */}
                    {error && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
                        <AlertCircle className="w-5 h-5" />
                        <p className="text-sm font-bold">{error}</p>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <EliteInput 
                        label="Full Legal Name" 
                        name="name"
                        placeholder="Aman Rawat" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                      />
                      <EliteInput 
                        label="Email Address" 
                        name="email"
                        type="email" 
                        placeholder="name@company.com" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <EliteInput 
                        label="Primary Phone" 
                        name="phone"
                        placeholder="9876543210" 
                        value={formData.phone}
                        onChange={handleChange}
                        required 
                      />
                      <CustomSelect 
                        label="Strategic Interest" 
                        options={services} 
                        value={formData.service}
                        onChange={(val) => setFormData({...formData, service: val})}
                      />
                    </div>

                    <AnimatePresence>
                      {formData.service === "Other" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <EliteInput 
                            label="Please Specify Your Requirement" 
                            name="customService"
                            placeholder="Enter specialized service..." 
                            value={formData.customService}
                            onChange={handleChange}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Message Detail</label>
                      <textarea 
                        name="message"
                        rows="5"
                        placeholder="Tell us about your requirements..."
                        className="w-full p-6 bg-gray-50 rounded-[2rem] border-2 border-transparent focus:border-gold focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold/5 transition-all font-medium resize-none"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-6">
                      <div className="flex items-center gap-3 text-gray-400">
                        <ShieldCheck className="w-5 h-5 text-green-500" />
                        <span className="text-xs font-bold uppercase tracking-widest">Secure Transmission Active</span>
                      </div>
                      
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={loading}
                        className="w-full md:w-auto px-12 py-6 bg-black text-white rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-gold hover:text-black transition-all shadow-2xl shadow-black/10 flex items-center justify-center gap-4 disabled:opacity-50"
                      >
                        {loading ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                        ) : (
                          <><Send className="w-4 h-4" /> Initiate Request</>
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20"
                  >
                    <div className="w-32 h-32 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-10 ring-8 ring-green-50/50">
                      <CheckCircle className="w-16 h-16" />
                    </div>
                    <h2 className="text-5xl font-black mb-6 tracking-tighter">Request Received.</h2>
                    <p className="text-gray-500 max-w-sm mx-auto font-medium text-lg">
                      Our senior advisors will review your case and contact you shortly.
                    </p>
                    <button 
                      onClick={() => setSuccess(false)}
                      className="mt-12 text-gold font-black uppercase tracking-widest text-[10px] border-b-2 border-gold pb-1 transition-colors"
                    >
                      New Submission
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST INDICATORS --- */}
      <section className="py-24 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { icon: Shield, val: "100%", label: "Data Safety" },
              { icon: Award, val: "A+ Rated", label: "Expertise" },
              { icon: Globe, val: "Global", label: "Advisory" },
              { icon: Star, val: "Elite", label: "Partnership" }
            ].map((metric, idx) => (
              <div key={idx} className="space-y-3 group cursor-default">
                <metric.icon className="w-10 h-10 mx-auto text-gray-200 group-hover:text-gold transition-colors duration-500" />
                <p className="text-3xl font-black tracking-tight">{metric.val}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
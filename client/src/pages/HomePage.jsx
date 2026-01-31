import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  ArrowRight, CheckCircle2, Trophy, 
  TrendingUp, ShieldCheck, Mail, Zap, 
  Star, GraduationCap, Building, Users,
  BarChart, Target, Clock, FileText,
  PieChart, Globe, Lock, Headphones,
  Award, TrendingDown, Calendar, Calculator
} from 'lucide-react';

// Define custom icon components first
const ShoppingBag = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const Heart = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const HomeIcon = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const services = [
  { 
    title: "Strategic Accounting & Bookkeeping", 
    icon: <TrendingUp size={24} />, 
    desc: "Comprehensive financial recording with real-time MIS reporting. We maintain accurate ledgers, balance sheets, and profit & loss statements with monthly reconciliation.",
    features: ["Monthly Financial Statements", "Bank Reconciliation", "Cash Flow Management", "Budgeting & Forecasting"]
  },
  { 
    title: "Tax Planning & Optimization", 
    icon: <ShieldCheck size={24} />, 
    desc: "End-to-end tax solutions including ITR filing, TDS/TCS compliance, and tax-saving strategies. We ensure maximum deductions while maintaining full compliance.",
    features: ["Income Tax Return Filing", "Tax Audit Support", "Section 44ADA Optimization", "Tax Advisory Services"]
  },
  { 
    title: "GST Compliance & Advisory", 
    icon: <CheckCircle2 size={24} />, 
    desc: "Complete GST lifecycle management from registration to return filing. We handle GSTR-1, GSTR-3B, annual returns, and GST audits seamlessly.",
    features: ["GST Registration", "Monthly/Quarterly Returns", "GST Audit Support", "Input Tax Credit Optimization"]
  },
  { 
    title: "Business Incorporation & Licensing", 
    icon: <Zap size={24} />, 
    desc: "Turnkey business formation services for Private Limited Companies, LLPs, MSMEs, and startups. We handle all regulatory formalities from start to finish.",
    features: ["Company Registration", "DIN & DSC Services", "MSME Registration", "Trade License Support"]
  },
  { 
    title: "Audit & Assurance Services", 
    icon: <FileText size={24} />, 
    desc: "Independent statutory audits, internal audits, and stock audits conducted by qualified professionals ensuring regulatory compliance and financial integrity.",
    features: ["Statutory Audit", "Internal Audit", "Tax Audit", "Stock Audit"]
  },
  { 
    title: "Financial Advisory & Consulting", 
    icon: <PieChart size={24} />, 
    desc: "Strategic financial planning, investment advisory, and business valuation services to help you make informed decisions for sustainable growth.",
    features: ["Business Valuation", "Investment Planning", "Risk Management", "Financial Modeling"]
  },
];

const industries = [
  { name: "Startups & Tech Companies", count: "150+", icon: <Zap className="text-gold" /> },
  { name: "E-commerce & Retail", count: "85+", icon: <ShoppingBag className="text-gold" /> },
  { name: "Manufacturing Units", count: "60+", icon: <Building className="text-gold" /> },
  { name: "Service Industry", count: "120+", icon: <Users className="text-gold" /> },
  { name: "Healthcare & Pharma", count: "45+", icon: <Heart className="text-gold" /> },
  { name: "Real Estate & Construction", count: "75+", icon: <HomeIcon className="text-gold" /> },
];

const process = [
  { step: "01", title: "Discovery & Assessment", desc: "We analyze your business needs, current financial status, and compliance requirements.", icon: <Target size={20} /> },
  { step: "02", title: "Strategic Planning", desc: "Customized solution design with clear timelines, deliverables, and pricing structure.", icon: <BarChart size={20} /> },
  { step: "03", title: "Implementation & Execution", desc: "Dedicated expert team handles all processes with regular progress updates.", icon: <CheckCircle2 size={20} /> },
  { step: "04", title: "Ongoing Support", desc: "Continuous monitoring, advisory, and timely compliance management.", icon: <Headphones size={20} /> },
];

const metrics = [
  { value: "500+", label: "Clients Served", icon: <Users size={20} /> },
  { value: "₹25Cr+", label: "Tax Savings Generated", icon: <TrendingDown size={20} /> },
  { value: "99.7%", label: "Compliance Accuracy", icon: <ShieldCheck size={20} /> },
  { value: "24/7", label: "Support Availability", icon: <Clock size={20} /> },
];

const Home = () => {
  return (
    <div className="bg-white text-gray-900 font-inter selection:bg-gold/30">
      <Navbar />

      {/* --- ENHANCED HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Star size={12} fill="currentColor" /> Certified Financial Professionals
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8 text-black">
              Precision <span className="text-gold italic">Accounting</span> Meets Strategic <span className="text-gold italic">Insight</span>.
            </h1>
            <p className="text-lg text-gray-500 max-w-lg mb-8 leading-relaxed font-medium">
              Phoenix Professionals delivers elite financial solutions combining cutting-edge technology with expert human insight. We transform complex financial challenges into strategic advantages for businesses of all sizes.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-gold" />
                <span className="text-sm font-medium">ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-gold" />
                <span className="text-sm font-medium">10+ Years Experience</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-gold" />
                <span className="text-sm font-medium">PAN India Presence</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-gold" />
                <span className="text-sm font-medium">Cloud-Based Solutions</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-black text-white font-bold text-xs uppercase tracking-widest hover:bg-gold hover:text-black transition-all duration-500 flex items-center justify-center gap-2 group shadow-2xl">
                Schedule Free Consultation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-black text-black font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500 flex items-center justify-center gap-2">
                View Our Services
              </button>
            </div>
          </div>

          <div className="relative animate-fade-up hidden lg:block" style={{ animationDelay: '200ms' }}>
            <div className="relative aspect-square max-w-[500px] ml-auto">
              <div className="absolute inset-0 bg-black rounded-3xl rotate-3" />
              <div className="absolute inset-0 bg-gradient-to-br from-gold to-amber-600 rounded-3xl -rotate-3 transition-transform hover:rotate-0 duration-700" />
              <div className="absolute inset-0 bg-white border border-gray-100 rounded-3xl p-12 flex flex-col justify-between shadow-2xl">
                <div className="flex items-center justify-between">
                  <Zap size={40} className="text-gold" fill="currentColor" />
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-400">TRUSTED BY</p>
                    <p className="text-2xl font-black">500+ Businesses</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-4xl font-black text-black mb-2 tracking-tighter italic underline decoration-gold/50">Phoenix Professionals</p>
                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.4em]">Accounting • Taxation • Compliance • Advisory</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-black text-black">₹25Cr+</p>
                      <p className="text-xs text-gray-400">Tax Saved</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-black text-black">99.7%</p>
                      <p className="text-xs text-gray-400">Accuracy Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PERFORMANCE METRICS --- */}
      <section className="py-16 bg-black text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gold/10 rounded-full">
                    {metric.icon}
                  </div>
                </div>
                <p className="text-4xl md:text-5xl font-black mb-2">{metric.value}</p>
                <p className="text-gray-400 text-sm uppercase tracking-widest">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ENHANCED SERVICES SECTION --- */}
      <section className="py-24 md:py-32 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-gold text-xs font-black uppercase tracking-[0.5em] mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-black text-black mb-6">Comprehensive Financial Solutions</h3>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto font-medium">
              From routine bookkeeping to complex financial strategy, we provide end-to-end solutions tailored to your business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div key={i} className="bg-white p-8 border border-gray-100 hover:border-gold transition-all duration-500 group shadow-sm hover:shadow-2xl rounded-2xl">
                <div className="w-14 h-14 bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center text-gold mb-6 rounded-xl group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <h4 className="text-xl font-black text-black mb-4 uppercase tracking-tighter">{s.title}</h4>
                <p className="text-gray-400 text-sm font-medium leading-relaxed mb-6">{s.desc}</p>
                
                <div className="space-y-2">
                  {s.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 size={14} className="text-gold" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="mt-8 text-black font-bold text-sm uppercase tracking-wider hover:text-gold transition-colors flex items-center gap-2">
                  Learn More <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- OUR PROCESS SECTION --- */}
      <section className="py-24 md:py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-gold text-xs font-black uppercase tracking-[0.5em] mb-4">How We Work</h2>
            <h3 className="text-4xl md:text-5xl font-black text-black mb-6">Our Proven Methodology</h3>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto font-medium">
              A structured approach ensuring precision, transparency, and exceptional results at every step.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-gradient-to-b from-gray-50 to-white p-8 border border-gray-100 rounded-2xl h-full">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black text-gray-200">{step.step}</span>
                    <div className="p-3 bg-gold/10 rounded-lg">
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="text-xl font-black text-black mb-4">{step.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
                
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INDUSTRIES WE SERVE --- */}
      <section className="py-24 md:py-32 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-gold text-xs font-black uppercase tracking-[0.5em] mb-4">Industries</h2>
            <h3 className="text-4xl md:text-5xl font-black text-black mb-6">Sector-Specific Expertise</h3>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto font-medium">
              Our deep industry knowledge allows us to provide specialized financial solutions for diverse sectors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 hover:border-gold transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  {industry.icon}
                  <span className="text-2xl font-black text-black">{industry.count}</span>
                </div>
                <h4 className="text-lg font-black text-black mb-2">{industry.name}</h4>
                <p className="text-gray-400 text-sm">
                  Specialized compliance and financial management tailored to industry requirements.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  CheckCircle, ArrowRight,
  Users, Clock, Award, Target, PieChart, Zap
} from 'lucide-react';

// ✅ DIRECT JSON IMPORT (NO API CALLS)
import servicesData from '../data/services.json';

const Services = () => {
  // ✅ JSON से सीधे services निकालें
  const services = Array.isArray(servicesData.services) 
    ? servicesData.services 
    : [];

  // ✅ Static data (JSON में नहीं होगा, लेकिन UI के लिए जरूरी)
  const staticData = {
    hero: {
      badge: 'PREMIUM SERVICES',
      description: 'Exclusive financial advisory for elite clientele seeking exceptional wealth management and strategic growth.',
      buttonText: 'Begin Consultation'
    },
    services: {
      title: 'SERVICES',
      heading: 'The White Suite',
      subtitle: 'Exclusive financial solutions'
    },
    metrics: [
      { value: '250+', label: 'Clients Worldwide', icon: Users },
      { value: '$50M+', label: 'Assets Managed', icon: Award },
      { value: '99%', label: 'Client Satisfaction', icon: CheckCircle },
      { value: '24/7', label: 'Support', icon: Clock }
    ],
    methodology: {
      title: 'OUR METHODOLOGY',
      heading: 'Strategic Financial Excellence',
      description: 'A meticulous four-phase approach ensuring precision, adaptability, and unparalleled results.',
      steps: [
        { number: '01', title: 'Strategic Analysis', desc: 'Comprehensive market and portfolio assessment.', icon: Target },
        { number: '02', title: 'Wealth Architecture', desc: 'Custom portfolio structuring and asset allocation.', icon: PieChart },
        { number: '03', title: 'Dynamic Execution', desc: 'Precision implementation of financial strategies.', icon: Zap },
        { number: '04', title: 'Continuous Optimization', desc: 'Ongoing monitoring and performance enhancement.', icon: Clock }
      ]
    }
  };

  // ✅ Loading state (अब जरूरी नहीं, लेकिन रख रहा हूँ safety के लिए)
  if (!servicesData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C5A059] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 bg-[#FAFAFA] border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col">
            {staticData.hero?.badge && (
              <div className="inline-flex items-center gap-4 mb-10">
                <span className="h-[1px] w-12 bg-[#C5A059]"></span>
                <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.5em]">
                  {staticData.hero.badge}
                </span>
              </div>
            )}
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-[#1A1A1B] leading-[0.9] tracking-tighter mb-12">
              Eminence <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#8C6D2E] italic">
                in Finance.
              </span>
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
              {staticData.hero?.description && (
                <p className="text-xl text-gray-500 max-w-xl font-light leading-relaxed">
                  {staticData.hero.description}
                </p>
              )}
              
              <button className="px-10 py-5 bg-[#1A1A1B] hover:bg-[#C5A059] text-white text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 shadow-xl">
                {staticData.hero?.buttonText || 'Get Started'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      {staticData.metrics && staticData.metrics.length > 0 && (
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {staticData.metrics.map((stat, i) => {
                const MetricIcon = stat.icon;
                return (
                  <div key={i} className="py-16 px-8 flex flex-col items-center text-center border-r border-gray-100 last:border-r-0">
                    <div className="text-[#C5A059] mb-5 p-3 bg-gray-50 rounded-full">
                      <MetricIcon className="w-4 h-4" />
                    </div>
                    <span className="text-4xl font-bold text-[#1A1A1B] mb-1">
                      {stat.value}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Services Grid */}
      <section className="py-32 px-6 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto">
          {/* Services Header */}
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-12">
            <div>
              {staticData.services?.title && (
                <h2 className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.4em] mb-4">
                  {staticData.services.title}
                </h2>
              )}
              
              {staticData.services?.heading && (
                <h3 className="text-5xl font-bold text-[#1A1A1B] tracking-tighter">
                  {staticData.services.heading}
                </h3>
              )}
            </div>
            
            {staticData.services?.subtitle && (
              <p className="text-gray-400 max-w-xs text-xs font-bold uppercase tracking-widest mt-6 md:mt-0">
                {staticData.services.subtitle}
              </p>
            )}
          </div>

          {/* ✅ Services Cards - DIRECT FROM JSON */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.length > 0 ? (
              services.map((service, i) => {
                return (
                  <div 
                    key={i} 
                    className="bg-white p-12 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group border border-gray-100"
                  >
                    {/* ✅ FIXED: Service Header - ONLY STICKER/EMOJI */}
                    <div className="flex items-center justify-between mb-12">
                      <div className="text-[#1A1A1B] group-hover:text-[#C5A059] transition-colors">
                        {/* ✅ सिर्फ Sticker/Emoji दिखाएं */}
                        {service.sticker && (
                          <span className="text-4xl">{service.sticker}</span>
                        )}
                      </div>
                      
                      {service.stat && (
                        <span className="text-[10px] font-bold text-gray-400 group-hover:text-[#C5A059] uppercase tracking-widest border border-gray-100 px-3 py-1">
                          {service.stat}
                        </span>
                      )}
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-2xl font-bold text-[#1A1A1B] mb-5 tracking-tight">
                      {service.title}
                    </h4>
                    
                    {/* Description */}
                    {service.description && (
                      <p className="text-gray-400 text-sm leading-relaxed mb-10 font-medium italic">
                        "{service.description}"
                      </p>
                    )}
                    
                    {/* Features List */}
                    {Array.isArray(service.items) && service.items.length > 0 && (
                      <ul className="space-y-4 mb-12">
                        {service.items.map((item, idx) => (
                          <li 
                            key={idx} 
                            className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-gray-500"
                          >
                            <CheckCircle className="w-3 h-3 text-[#C5A059]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {/* CTA */}
                    <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A1A1B] group-hover:gap-5 transition-all">
                      Inquire <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="col-span-3 text-center py-20">
                <div className="text-4xl mb-6">📊</div>
                <h4 className="text-2xl font-bold text-gray-400 mb-4">
                  No Services Available
                </h4>
                <p className="text-gray-400 max-w-md mx-auto">
                  Services will be added soon from the admin panel.
                </p>
              </div>
            )}
          </div>

          {/* Service Count */}
          <div className="mt-20 text-center text-xs text-gray-400">
            <p>Showing {services.length} services • Updates in real-time</p>
          </div>
        </div>
      </section>

      {/* Methodology Section (Static - JSON से नहीं) */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            {staticData.methodology?.title && (
              <h2 className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.4em] mb-4">
                {staticData.methodology.title}
              </h2>
            )}
            
            {staticData.methodology?.heading && (
              <h3 className="text-5xl font-bold text-[#1A1A1B] tracking-tighter mb-8">
                {staticData.methodology.heading}
              </h3>
            )}
            
            {staticData.methodology?.description && (
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                {staticData.methodology.description}
              </p>
            )}
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {staticData.methodology?.steps?.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <div key={i} className="text-center">
                  <div className="text-6xl font-bold text-gray-100 mb-6">{step.number}</div>
                  <div className="text-[#C5A059] mb-5 p-3 bg-gray-50 rounded-full inline-flex">
                    <StepIcon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-[#1A1A1B] mb-3">{step.title}</h4>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
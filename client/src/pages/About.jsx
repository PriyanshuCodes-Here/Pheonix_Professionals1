import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  ShieldCheck, Target, Zap, Award, Quote, 
  Clock, TrendingUp, Globe, Users, BookOpen,
  CheckCircle, Star, Lightbulb, Heart, Briefcase,
  ArrowRight
} from 'lucide-react';
import aboutData from '../data/about.json';

const About = () => {
  const values = aboutData.values;
  const milestones = aboutData.milestones;
  const achievements = aboutData.achievements;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-up {
          animation: fadeUp 0.6s ease-out;
        }
      `}</style>
      
      <Navbar />

      {/* --- HERO SECTION WITH RESPONSIVE TEXT COLORS --- */}
      <section className="relative py-20 lg:py-32 px-6 overflow-hidden">
        {/* Desktop gradient background */}
        <div className="absolute inset-0 hidden lg:block" style={{
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
        }}></div>
        
        {/* Mobile white background */}
        <div className="absolute inset-0 bg-white lg:hidden"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black hidden lg:block"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-up">
          {/* Logo/Brand - RESPONSIVE TEXT COLORS */}
          <div className="mb-8 lg:mb-10">
            {/* PHOENIX - White on desktop, Black on mobile */}
            <h1 className="text-4xl lg:text-5xl font-black mb-2 text-black lg:text-white">
              {aboutData.hero.companyName}
            </h1>
            
            {/* PROFESSIONALS - Gold on both mobile and desktop */}
            <span className="text-xl lg:text-2xl font-normal" style={{ color: '#D4AF37' }}>
              {aboutData.hero.companySubtitle}
            </span>
            
            {/* Tagline - RESPONSIVE TEXT COLORS */}
            <div className="mt-6 lg:mt-8 mb-10 lg:mb-12">
              <span className="font-bold text-xs uppercase tracking-[0.2em] lg:tracking-[0.3em] border-b pb-2 text-black lg:text-white" style={{ 
                borderBottom: '2px solid #D4AF37'
              }}>
                {aboutData.hero.tagline}
              </span>
            </div>
          </div>
          
          {/* Main Heading - RESPONSIVE TEXT COLORS */}
          <div className="mb-10">
            {/* Beyond Numbers - White on desktop, Black on mobile */}
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black mb-4 text-black lg:text-white leading-[0.9]">
              {aboutData.hero.mainHeading[0]}
            </h1>
            
            {/* Building Legacies - White on desktop, Black on mobile */}
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black mb-8 lg:mb-12 text-black lg:text-white leading-[0.9]">
              {aboutData.hero.mainHeading[1]}
            </h1>
            
            {/* Divider line - Gold on both */}
            <div className="w-32 h-1 mx-auto mb-8 lg:mb-10" style={{ backgroundColor: '#D4AF37' }}></div>
            
            {/* Description - RESPONSIVE TEXT COLORS */}
            <p className="text-lg lg:text-xl max-w-2xl mx-auto mb-10 lg:mb-12 leading-relaxed text-gray-600 lg:text-gray-300">
              {aboutData.hero.description}
            </p>
          </div>
          
          {/* CTA Button - Gold background, responsive text */}
          <div className="flex justify-center items-center">
            <button 
              className="px-12 py-4 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 group transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: '#D4AF37',
                color: 'black',
                borderRadius: '0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#B8860B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#D4AF37';
              }}
              aria-label="Explore our company journey"
            >
              <BookOpen size={20} />
              {aboutData.hero.ctaButton.text}
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent hidden lg:block"></div>
      </section>

      {/* --- ACHIEVEMENTS METRICS --- */}
      <section className="py-16 -mt-1" style={{
        background: 'linear-gradient(to right, rgba(212, 175, 55, 0.05), rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05))'
      }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = {
                Briefcase, TrendingUp, CheckCircle, Clock, Globe, Heart
              }[achievement.icon];
              
              return (
                <div key={index} className="text-center p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                      <IconComponent size={24} />
                    </div>
                  </div>
                  <p className="text-3xl md:text-4xl font-black mb-2" style={{ color: 'black' }}>{achievement.count}</p>
                  <p className="text-sm font-medium uppercase tracking-wider" style={{ color: '#6B7280' }}>{achievement.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- OUR PHILOSOPHY --- */}
      <section className="py-16 lg:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-0.5" style={{ backgroundColor: '#D4AF37' }}></div>
              <span className="font-bold text-sm uppercase tracking-[0.3em]" style={{ color: '#D4AF37' }}>{aboutData.philosophy.title}</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black mb-6 lg:mb-8 leading-tight" style={{ color: 'black' }}>
              Where Financial <span style={{ color: '#D4AF37' }}>Precision</span> Meets<br />
              Strategic <span style={{ color: '#D4AF37' }}>Vision</span>
            </h2>
            
            <div className="space-y-6">
              <p className="leading-relaxed" style={{ color: '#6B7280' }}>
                {aboutData.philosophy.description}
              </p>
              
              <div className="p-6 rounded-2xl border-l-4" style={{
                background: 'linear-gradient(to right, rgba(212, 175, 55, 0.05), transparent)',
                borderLeftColor: '#D4AF37'
              }}>
                <div className="flex items-start gap-4">
                  <Lightbulb size={24} className="flex-shrink-0 mt-1" style={{ color: '#D4AF37' }} />
                  <div>
                    <p className="font-medium italic" style={{ color: '#374151' }}>
                      {aboutData.philosophy.quote.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="relative rounded-3xl p-8 lg:p-12 shadow-2xl" style={{
              background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
            }}>
              <div className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                <Quote size={24} className="text-black" />
              </div>
              
              <div className="text-white space-y-6">
                <p className="text-xl lg:text-2xl xl:text-3xl font-light italic leading-relaxed">
                  {aboutData.philosophy.testimonial.quote}
                </p>
                
                <div className="flex items-center gap-4 pt-6" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}>
                    <Award size={18} style={{ color: '#D4AF37' }} />
                  </div>
                  <div>
                    <p className="font-bold text-sm lg:text-base" style={{ color: '#D4AF37' }}>{aboutData.philosophy.testimonial.title}</p>
                    <p className="text-xs lg:text-sm" style={{ color: '#D1D5DB' }}>{aboutData.philosophy.testimonial.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR EVOLUTION TIMELINE --- */}
      <section className="py-16 lg:py-24 px-6" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black mb-4 lg:mb-6" style={{ color: 'black' }}>Our Evolution</h2>
            <p className="lg:text-lg max-w-3xl mx-auto" style={{ color: '#6B7280' }}>
              A journey marked by innovation, expansion, and unwavering commitment to financial excellence
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 hidden lg:block" style={{
              background: 'linear-gradient(to bottom, #D4AF37, rgba(212, 175, 55, 0.5), transparent)'
            }}></div>
            
            <div className="space-y-8 lg:space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative ${index % 2 === 0 ? 'lg:pr-1/2 lg:pl-6' : 'lg:pl-1/2 lg:pr-6'}`}>
                  <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border transition-all duration-300 group" style={{
                    borderColor: '#F3F4F6',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}>
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center group-hover:scale-105 lg:group-hover:scale-110 transition-transform duration-300" style={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)'
                      }}>
                        <span className="text-white text-xl lg:text-2xl font-black">{milestone.year}</span>
                      </div>
                      
                      <div className="text-center lg:text-left">
                        <h3 className="text-lg lg:text-xl font-black mb-2" style={{ color: 'black' }}>{milestone.title}</h3>
                        <p className="text-sm lg:text-base" style={{ color: '#6B7280' }}>{milestone.desc}</p>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 -left-3 transform -translate-y-1/2 w-6 h-6 rounded-full border-4 shadow-lg hidden lg:block" style={{
                      backgroundColor: '#D4AF37',
                      borderColor: 'white',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="py-16 lg:py-24 px-6" style={{
        background: 'linear-gradient(to bottom, white, #F9FAFB)'
      }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-20">
            <div className="inline-flex items-center gap-3 mb-4 lg:mb-6">
              <div className="w-8 lg:w-16 h-0.5" style={{ backgroundColor: '#D4AF37' }}></div>
              <span className="font-bold text-xs lg:text-sm uppercase tracking-[0.3em] lg:tracking-[0.4em]" style={{ color: '#D4AF37' }}>Our DNA</span>
              <div className="w-8 lg:w-16 h-0.5" style={{ backgroundColor: '#D4AF37' }}></div>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black mb-6 lg:mb-8" style={{ color: 'black' }}>The Principles That Define Us</h2>
            <p className="lg:text-lg max-w-3xl mx-auto" style={{ color: '#6B7280' }}>
              Six foundational pillars that guide every decision, strategy, and client interaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value, index) => {
              const IconComponent = {
                ShieldCheck, Target, Zap, Users, TrendingUp, Globe
              }[value.icon];
              
              return (
                <div key={index} className="group">
                  <div className="bg-white p-6 lg:p-8 rounded-2xl border shadow-sm hover:shadow-xl lg:hover:shadow-2xl transition-all duration-500 h-full" style={{
                    borderColor: '#F3F4F6',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                  }}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-6 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 lg:w-auto lg:h-auto">
                          <IconComponent className="text-[#D4AF37]" size={32} />
                        </div>
                        <h3 className="text-lg lg:text-xl font-black lg:hidden" style={{ color: 'black' }}>{value.title}</h3>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full self-start lg:self-auto" style={{
                        color: '#D4AF37',
                        backgroundColor: 'rgba(212, 175, 55, 0.1)'
                      }}>
                        {value.highlight}
                      </span>
                    </div>
                    
                    <h3 className="text-lg lg:text-xl font-black mb-3 lg:mb-4 hidden lg:block" style={{ color: 'black' }}>{value.title}</h3>
                    <p className="text-sm lg:text-base leading-relaxed mb-4 lg:mb-6" style={{ color: '#6B7280' }}>{value.desc}</p>
                    
                    <div className="pt-4 lg:pt-6" style={{ borderTop: '1px solid #F3F4F6' }}>
                      <div className="flex items-center text-xs lg:text-sm" style={{ color: '#6B7280' }}>
                        <CheckCircle size={14} className="mr-2 flex-shrink-0" style={{ color: '#D4AF37' }} />
                        <span>Embedded in every service</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-16 lg:py-24 px-6 text-white" style={{
        background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)'
      }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl xl:text-6xl font-black mb-6 lg:mb-8">
            Ready to Write Your<br />
            <span className="text-black">Financial Success Story</span>?
          </h2>
          
          <p className="lg:text-xl mb-8 lg:mb-12 max-w-3xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            {aboutData.cta.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center">
            <button 
              className="w-full sm:w-auto px-8 lg:px-10 py-4 lg:py-5 font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
              style={{
                backgroundColor: 'black',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1a1a1a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'black';
              }}
              aria-label="Schedule a strategy session with our team"
            >
              <Briefcase size={18} />
              {aboutData.cta.buttons[0].text}
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
            
            <button 
              className="w-full sm:w-auto px-8 lg:px-10 py-4 lg:py-5 font-bold text-sm uppercase tracking-widest transition-all duration-300"
              style={{
                backgroundColor: 'white',
                color: 'black'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F3F4F6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
              aria-label="Download our corporate profile"
            >
              {aboutData.cta.buttons[1].text}
            </button>
          </div>
          
          <div className="mt-12 lg:mt-16 pt-8 lg:pt-12" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <p className="text-xs lg:text-sm uppercase tracking-widest font-bold mb-4 lg:mb-6" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{aboutData.cta.trustedBy.title}</p>
            <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-12" style={{ opacity: 0.8 }}>
              {aboutData.cta.trustedBy.clients.map((client, index) => (
                <div key={index} className="text-center">
                  <p className="text-xl lg:text-2xl font-black">{client.type}</p>
                  <p className="text-xs lg:text-sm">{client.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
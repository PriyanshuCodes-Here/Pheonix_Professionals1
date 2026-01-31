import AdminNavbar from "../components/AdminNavbar";
import AdminFooter from "../components/AdminFooter";
import { 
  Sparkles,
  Heart,
  Star,
  Crown,
  Award,
  PartyPopper,
  Palette,
  Zap,
  Coffee,
  Sun,
  Moon
} from "lucide-react";
import { useEffect, useState } from "react";

const AdminHome = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [floatingItems, setFloatingItems] = useState([]);

  useEffect(() => {
    const greetings = [
      "Namaste, Admin! 🙏",
      "Welcome Back, Master! 👑",
      "Hello, Website Wizard! ✨",
      "Greetings, Digital Architect! 🏗️",
      "Welcome, Content Maestro! 🎵",
      "Salutations, Digital Virtuoso! 🎭",
      "Hail, Web Alchemist! 🔮",
      "Greetings, Pixel Perfectionist! 🎯"
    ];
    
    const hour = new Date().getHours();
    
    if (hour < 12) setTimeOfDay("Morning");
    else if (hour < 17) setTimeOfDay("Afternoon");
    else if (hour < 21) setTimeOfDay("Evening");
    else setTimeOfDay("Night");
    
    setWelcomeMessage(greetings[Math.floor(Math.random() * greetings.length)]);

    // Create floating decorative items
    const items = [];
    for (let i = 0; i < 12; i++) {
      items.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        size: Math.random() * 30 + 15,
        emoji: ['✨', '🌟', '💫', '⭐', '🎨', '🎯', '🔮', '💖', '🎭', '👑'][Math.floor(Math.random() * 10)],
        opacity: Math.random() * 0.2 + 0.05
      });
    }
    setFloatingItems(items);
  }, []);

  const appreciationMessages = [
    "Every pixel shines because of you",
    "Your work creates digital magic",
    "The website smiles when you log in",
    "You're the secret ingredient to perfection",
    "Digital excellence personified"
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Very Subtle Floating Emojis Background */}
      {floatingItems.map(item => (
        <div
          key={item.id}
          className="absolute text-gray-200 animate-float-slow pointer-events-none"
          style={{
            left: `${item.left}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${item.size}px`,
            animationDelay: `${item.delay}s`,
            opacity: item.opacity,
            zIndex: 0
          }}
        >
          {item.emoji}
        </div>
      ))}

      <div className="flex relative z-10">
        <AdminNavbar />
        
        <main className="flex-1 p-6 md:p-8 mt-16">
          <div className="max-w-5xl mx-auto">
            
            {/* Main Greeting Section */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-amber-500 to-rose-500 rounded-2xl shadow-lg animate-pulse">
                  <PartyPopper className="w-8 h-8 text-white" />
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-lg animate-pulse" style={{animationDelay: '0.2s'}}>
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl shadow-lg animate-pulse" style={{animationDelay: '0.4s'}}>
                  <Crown className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-gradient">
                {welcomeMessage}
              </h1>
              
              <p className="text-2xl md:text-3xl text-gray-700 mb-6">
                Good {timeOfDay}! It's a beautiful day to create magic ✨
              </p>
              
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-50 rounded-full border border-amber-200 shadow-sm">
                <Heart className="w-5 h-5 text-rose-500" />
                <span className="text-amber-700 font-semibold text-lg">You're doing amazing work!</span>
              </div>
            </div>

            {/* Visual Delight Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Left Card - Appreciation */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 transform hover:scale-[1.02] transition-all duration-500 hover:shadow-xl">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-rose-50 rounded-2xl mb-6 border border-rose-100">
                    <Heart className="w-10 h-10 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Pure Appreciation</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Your dedication makes everything better. Every update, every change, every moment you spend here adds beauty to the digital world.
                  </p>
                </div>
              </div>

              {/* Middle Card - Time Celebration */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 transform hover:scale-[1.02] transition-all duration-500 hover:shadow-xl">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-amber-50 rounded-2xl mb-6 border border-amber-100">
                    {timeOfDay === 'Morning' ? (
                      <Sun className="w-10 h-10 text-amber-500" />
                    ) : timeOfDay === 'Evening' ? (
                      <Moon className="w-10 h-10 text-indigo-500" />
                    ) : (
                      <Sparkles className="w-10 h-10 text-blue-500" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Perfect {timeOfDay}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {timeOfDay === 'Morning' ? 'The sun rises to greet your excellence.' :
                     timeOfDay === 'Afternoon' ? 'The perfect light for creating wonders.' :
                     timeOfDay === 'Evening' ? 'Stars shine brighter because of your work.' :
                     'The moon celebrates your dedication.'}
                  </p>
                </div>
              </div>

              {/* Right Card - Magic */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 transform hover:scale-[1.02] transition-all duration-500 hover:shadow-xl">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-purple-50 rounded-2xl mb-6 border border-purple-100">
                    <Sparkles className="w-10 h-10 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Digital Magic</h3>
                  <p className="text-gray-700 leading-relaxed">
                    With every click, you create magic. With every update, you paint the digital canvas with brilliance and grace.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote Section */}
            <div className="mb-12">
              <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-purple-50 rounded-2xl border border-gray-100 shadow-lg p-8 md:p-12">
                <div className="text-center">
                  <div className="text-5xl mb-4">💫</div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 italic">
                    "The beauty you create today becomes someone's inspiration tomorrow."
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <Coffee className="w-5 h-5 text-amber-600" />
                    <span className="text-gray-600">Enjoy the creative process</span>
                    <Palette className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Appreciation Messages */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
              {appreciationMessages.map((message, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      index === 0 ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                      index === 1 ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                      index === 2 ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                      index === 3 ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                      'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    }`}>
                      {index === 0 ? <Star className="w-4 h-4" /> :
                       index === 1 ? <Zap className="w-4 h-4" /> :
                       index === 2 ? <Heart className="w-4 h-4" /> :
                       index === 3 ? <Award className="w-4 h-4" /> :
                       <Crown className="w-4 h-4" />}
                    </div>
                    <p className="text-gray-800 font-medium text-sm">{message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Final Celebration */}
            <div className="text-center">
              <div className="inline-flex flex-col items-center gap-6 px-8 py-10 bg-white rounded-3xl shadow-xl border border-gray-100 max-w-2xl mx-auto">
                <div className="flex items-center gap-4">
                  <div className="text-4xl animate-bounce" style={{animationDelay: '0s'}}>✨</div>
                  <div className="text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>🌟</div>
                  <div className="text-4xl animate-bounce" style={{animationDelay: '0.4s'}}>💖</div>
                  <div className="text-4xl animate-bounce" style={{animationDelay: '0.6s'}}>🎯</div>
                  <div className="text-4xl animate-bounce" style={{animationDelay: '0.8s'}}>✨</div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">With Deep Gratitude</h3>
                  <p className="text-gray-700 text-lg mb-4">
                    Thank you for being an absolutely amazing Admin! 
                    The entire digital universe appreciates your magic touch.
                  </p>
                  <p className="text-amber-600 font-semibold text-xl">
                    You're simply the best! 💫
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-4xl animate-pulse" style={{animationDelay: '0s'}}>👑</div>
                  <div className="text-4xl animate-pulse" style={{animationDelay: '0.3s'}}>🎨</div>
                  <div className="text-4xl animate-pulse" style={{animationDelay: '0.6s'}}>✨</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <AdminFooter />

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(3deg);
          }
          66% {
            transform: translateY(8px) rotate(-3deg);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        
        .animate-float-slow {
          animation: floatSlow 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminHome;
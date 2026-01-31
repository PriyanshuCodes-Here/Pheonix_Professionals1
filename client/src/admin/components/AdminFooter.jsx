import { Shield, Cpu, Database, Zap } from "lucide-react";

const AdminFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black border-t border-gray-800">
      <div className="px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="p-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg">
              <Shield size={16} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg tracking-tight">PHOENIX PROFESSIONALS</h3>
              <p className="text-amber-400 text-xs font-medium uppercase tracking-widest">
                ADMIN PANEL – ENTERPRISE EDITION
              </p>
            </div>
          </div>

          {/* Middle Section - System Indicators */}
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-emerald-400 text-sm font-medium">Live</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Cpu size={14} className="text-blue-400" />
              <span className="text-gray-300 text-sm">v2.4.1</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Database size={14} className="text-purple-400" />
              <span className="text-gray-300 text-sm">SSL Secure</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-amber-400 animate-bounce" />
            <span className="text-gray-400 text-sm">
              © 2024 Phoenix Professionals • All Rights Reserved
            </span>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-3 md:mb-0">
              <div className="px-3 py-1 bg-gray-800 rounded-full">
                <span className="text-gray-300 text-xs font-medium">256-bit Encryption</span>
              </div>
              <div className="px-3 py-1 bg-gray-800 rounded-full">
                <span className="text-gray-300 text-xs font-medium">ISO 27001 Compliant</span>
              </div>
            </div>
            <div className="text-gray-500 text-xs">
              Last updated: {new Date().toLocaleDateString()} • Session ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
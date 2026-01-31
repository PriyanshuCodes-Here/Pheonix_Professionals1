import { useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Shield, Lock, User } from "lucide-react";

const Login = () => {
  const { login } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    setLoading(true);

    // 🔐 TEMP LOGIN (replace with API later)
    setTimeout(() => {
      const fakeToken = "admin-auth-token-123";
      login(fakeToken);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-950">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-2">
            Secure access to Phoenix Admin Panel
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-amber-500"
                placeholder="admin@phoenix.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-amber-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Authorized access only
        </p>
      </div>
    </div>
  );
};

export default Login;

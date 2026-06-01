import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function AuthPage() {
  const { signIn, signUp }    = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit() {
    if (!email || !password) {
      setError("Please enter both email and password!");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) setError(error.message);
    } else {
      const { error } = await signUp(email, password);
      if (error) {
        setError(error.message);
      } else {
        setSuccess(
          "✅ Account created! Please check your email to confirm, then log in."
        );
        setIsLogin(true);
      }
    }

    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 
                    to-blue-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-indigo-600 text-white font-bold text-2xl 
                            px-4 py-2 rounded-xl">
              R
            </div>
            <span className="text-3xl font-bold text-gray-800">
              Resume<span className="text-indigo-600">GPT</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            AI-powered resume builder for modern professionals
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 
                        border border-gray-100">

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setIsLogin(true); setError(""); setSuccess(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold 
                          transition
                ${isLogin
                  ? "bg-white text-indigo-600 shadow"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(""); setSuccess(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold 
                          transition
                ${!isLogin
                  ? "bg-white text-indigo-600 shadow"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-1">
            {isLogin ? "Welcome back! 👋" : "Create your account 🚀"}
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            {isLogin
              ? "Login to continue building your resume"
              : "Sign up free — no credit card required"
            }
          </p>

          {/* Email */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-semibold text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="you@example.com"
              className="border border-gray-200 rounded-xl px-4 py-3 
                         text-sm focus:outline-none focus:ring-2 
                         focus:ring-indigo-400 placeholder-gray-300 
                         transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 mb-2">
            <label className="text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isLogin ? "Your password" : "Min. 6 characters"}
              className="border border-gray-200 rounded-xl px-4 py-3 
                         text-sm focus:outline-none focus:ring-2 
                         focus:ring-indigo-400 placeholder-gray-300 
                         transition"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mt-3 bg-red-50 border border-red-200 
                            rounded-xl p-3 text-sm text-red-600">
              ⚠️ {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mt-3 bg-green-50 border border-green-200 
                            rounded-xl p-3 text-sm text-green-600">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`mt-5 w-full py-3 rounded-xl font-semibold 
                        text-sm transition
              ${loading
                ? "bg-indigo-300 text-white cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
          >
            {loading
              ? "Please wait..."
              : isLogin ? "Login →" : "Create Account →"
            }
          </button>

          {/* Toggle */}
          <p className="text-center text-sm text-gray-400 mt-4">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setSuccess("");
              }}
              className="text-indigo-600 font-semibold hover:underline"
            >
              {isLogin ? "Sign up free" : "Login"}
            </button>
          </p>

        </div>

        {/* Features */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            { emoji: "🤖", text: "AI Powered" },
            { emoji: "📄", text: "3 Templates" },
            { emoji: "📊", text: "ATS Checker" },
          ].map((f) => (
            <div key={f.text}
              className="bg-white/60 backdrop-blur rounded-xl p-3 
                         border border-white">
              <p className="text-xl mb-1">{f.emoji}</p>
              <p className="text-xs font-medium text-gray-600">{f.text}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AuthPage;
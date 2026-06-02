import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Orb({ style }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{ filter: "blur(80px)", opacity: 0.15, ...style }}
    />
  );
}

function FeatureCard({ emoji, title, desc }) {
  return (
    <div
      className="rounded-2xl p-4 flex items-start gap-3"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <span className="text-2xl">{emoji}</span>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function AuthPage() {
  const { signInWithGoogle } = useAuth();
  const [gLoading, setGLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGoogle() {
    setGLoading(true);
    setError("");

    const { error } = await signInWithGoogle();

    if (error) {
      setError(error.message);
      setGLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      <Orb style={{ width: 500, height: 500, background: "#6366f1", top: -100, left: -100 }} />
      <Orb style={{ width: 400, height: 400, background: "#a78bfa", bottom: -100, right: -100 }} />
      <Orb style={{ width: 300, height: 300, background: "#38bdf8", top: "50%", left: "50%" }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-10">
        <div className="hidden lg:block">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl"
              style={{
                background: "linear-gradient(135deg, #6366f1, #a78bfa)",
                boxShadow: "0 8px 32px rgba(99,102,241,0.4)",
              }}
            >
              R
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">
                Resume<span className="gradient-text">GPT</span>
              </h1>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                AI Resume Builder
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-black leading-tight mb-4 text-white">
            Build a resume that
            <br />
            <span className="gradient-text">gets you hired.</span>
          </h2>

          <p className="text-base mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
            AI-powered resume builder with ATS scoring, job matching, and beautiful templates.
          </p>

          <div className="space-y-3">
            <FeatureCard emoji="🤖" title="AI-Powered Content" desc="Gemini AI writes your summary and bullets" />
            <FeatureCard emoji="📊" title="ATS Score Checker" desc="Check if your resume passes filters" />
            <FeatureCard emoji="🎯" title="Job Matcher" desc="Match resume with job description" />
            <FeatureCard emoji="🎨" title="Premium Templates" desc="Download resume as PDF" />
          </div>
        </div>

        <div
          className="rounded-3xl p-8"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
          }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">Welcome to ResumeGPT 👋</h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
            Continue with Google to build your resume.
          </p>

          <button
            onClick={handleGoogle}
            disabled={gLoading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#e2e8f0",
            }}
          >
            {gLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
            )}
            {gLoading ? "Redirecting..." : "Continue with Google"}
          </button>

          {error && (
            <div
              className="mt-4 px-4 py-3 rounded-xl text-sm"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#fca5a5",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <div
            className="mt-6 pt-4 flex items-center justify-center gap-4 text-xs"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            <span>🔒 Secured by Supabase</span>
            <span>·</span>
            <span>✅ 100% Free</span>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState }  from "react";
import { useAuth }   from "../context/AuthContext";
import { useResume } from "../context/ResumeContext";
import ShareModal    from "./ShareModal";

function Navbar({ onPreview, onATS, onJobMatch }) {
  const { user, signOut }                     = useAuth();
  const { handleSaveResume, saving, saveMsg } = useResume();
  const [showShare, setShowShare]             = useState(false);
  const [menuOpen, setMenuOpen]               = useState(false);

  return (
    <>
      <nav
        className="sticky top-0 z-50 px-6 py-3 flex items-center 
                   justify-between"
        style={{
          background: "rgba(15, 15, 19, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* ── Logo ── */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center
                       font-black text-white text-lg"
            style={{ background: "linear-gradient(135deg, #6366f1, #a78bfa)" }}
          >
            R
          </div>
          <span className="text-lg font-bold text-white hidden sm:block">
            Resume<span className="gradient-text">GPT</span>
          </span>
        </div>

        {/* ── Desktop Nav Buttons ── */}
        <div className="hidden md:flex items-center gap-2">

          {/* Job Match */}
          <NavBtn
            onClick={onJobMatch}
            color="emerald"
            label="🎯 Job Match"
          />

          {/* ATS Score */}
          <NavBtn
            onClick={onATS}
            color="amber"
            label="📊 ATS Score"
          />

          {/* Preview */}
          <NavBtn
            onClick={onPreview}
            color="indigo"
            label="👁️ Preview"
          />

          {/* Save */}
          <button
            onClick={handleSaveResume}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl 
                       text-sm font-semibold text-white btn-primary
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white 
                                 border-t-transparent rounded-full 
                                 animate-spin" />
                Saving...
              </>
            ) : "💾 Save"}
          </button>

          {/* Save message */}
          {saveMsg && (
            <span className="text-xs font-semibold text-emerald-400 
                             animate-pulse">
              {saveMsg}
            </span>
          )}

          {/* Share */}
          <button
            onClick={() => setShowShare(true)}
            className="px-4 py-2 rounded-xl text-sm font-semibold 
                       text-white transition"
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              boxShadow: "0 4px 15px rgba(16,185,129,0.3)",
            }}
          >
            📤 Share
          </button>

          {/* User Info + Logout */}
          {user && (
            <div className="flex items-center gap-3 ml-1 pl-3"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="hidden lg:block text-right">
                <p className="text-xs font-semibold text-slate-300 
                               max-w-[130px] truncate">
                  {user.email}
                </p>
                <p className="text-xs text-slate-500">Pro Account</p>
              </div>
              {/* Avatar circle */}
              <div
                className="w-8 h-8 rounded-full flex items-center 
                           justify-center text-white text-xs font-bold 
                           cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #a78bfa)",
                }}
              >
                {user.email?.[0]?.toUpperCase()}
              </div>
              <button
                onClick={signOut}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold 
                           text-slate-400 transition hover:text-red-400"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="md:hidden text-slate-400 hover:text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="space-y-1">
            <span className={`block w-5 h-0.5 bg-current transition-all
              ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all
              ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all
              ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>

      </nav>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div
          className="md:hidden px-4 py-4 space-y-2"
          style={{
            background: "rgba(15,15,19,0.95)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <MobileBtn onClick={() => { onJobMatch(); setMenuOpen(false); }}
            label="🎯 Job Match" />
          <MobileBtn onClick={() => { onATS(); setMenuOpen(false); }}
            label="📊 ATS Score" />
          <MobileBtn onClick={() => { onPreview(); setMenuOpen(false); }}
            label="👁️ Preview Resume" />
          <MobileBtn onClick={() => { handleSaveResume(); setMenuOpen(false); }}
            label="💾 Save Resume" />
          <MobileBtn onClick={() => { setShowShare(true); setMenuOpen(false); }}
            label="📤 Share Resume" />
          {user && (
            <MobileBtn onClick={signOut} label="🚪 Logout" danger />
          )}
        </div>
      )}

      {/* Share Modal */}
      {showShare && <ShareModal onClose={() => setShowShare(false)} />}
    </>
  );
}

/* ── Small Reusable Components ── */
function NavBtn({ onClick, label, color }) {
  const colors = {
    emerald: "rgba(16,185,129,0.1)",
    amber:   "rgba(245,158,11,0.1)",
    indigo:  "rgba(99,102,241,0.1)",
  };
  const borders = {
    emerald: "rgba(16,185,129,0.3)",
    amber:   "rgba(245,158,11,0.3)",
    indigo:  "rgba(99,102,241,0.3)",
  };
  const texts = {
    emerald: "#10b981",
    amber:   "#f59e0b",
    indigo:  "#818cf8",
  };

  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-xl text-sm font-semibold transition
                 hover:brightness-125"
      style={{
        background: colors[color],
        border: `1px solid ${borders[color]}`,
        color: texts[color],
      }}
    >
      {label}
    </button>
  );
}

function MobileBtn({ onClick, label, danger }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3 rounded-xl text-sm 
                 font-medium transition"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        color: danger ? "#f87171" : "#cbd5e1",
      }}
    >
      {label}
    </button>
  );
}

export default Navbar;
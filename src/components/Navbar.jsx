import { useState }  from "react";
import { useAuth }   from "../context/AuthContext";
import { useResume } from "../context/ResumeContext";
import ShareModal    from "./ShareModal";

function Navbar({ onPreview, onATS, onJobMatch }) {
  const { user, signOut }                        = useAuth();
  const { handleSaveResume, saving, saveMsg }    = useResume();
  const [showShare, setShowShare]                = useState(false);

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-6 py-4 
                      flex items-center justify-between shadow-sm">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 text-white font-bold text-lg 
                          px-3 py-1 rounded-lg">
            R
          </div>
          <span className="text-xl font-bold text-gray-800">
            Resume<span className="text-indigo-600">GPT</span>
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          <button
            onClick={onJobMatch}
            className="border border-green-400 text-green-600 px-4 py-2 
                       rounded-xl font-semibold text-sm hover:bg-green-50 
                       transition"
          >
            🎯 Job Match
          </button>

          <button
            onClick={onATS}
            className="border border-amber-400 text-amber-600 px-4 py-2 
                       rounded-xl font-semibold text-sm hover:bg-amber-50 
                       transition"
          >
            📊 ATS Score
          </button>

          <button
            onClick={onPreview}
            className="border border-indigo-600 text-indigo-600 px-4 py-2 
                       rounded-xl font-semibold text-sm hover:bg-indigo-50 
                       transition"
          >
            👁️ Preview
          </button>

          {/* Save Button */}
          <button
            onClick={handleSaveResume}
            disabled={saving}
            className={`px-4 py-2 rounded-xl font-semibold text-sm 
                        transition
              ${saving
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
          >
            {saving ? "Saving..." : "💾 Save"}
          </button>

          {/* Save Message */}
          {saveMsg && (
            <span className="text-xs font-semibold text-green-600">
              {saveMsg}
            </span>
          )}

          {/* Share Button */}
          <button
            onClick={() => setShowShare(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-xl 
                       font-semibold text-sm hover:bg-green-600 transition"
          >
            📤 Share
          </button>

          {/* User + Logout */}
          {user && (
            <div className="flex items-center gap-3 ml-1 pl-3 
                            border-l border-gray-200">
              <div className="text-right hidden md:block">
                <p className="text-xs font-semibold text-gray-700 
                               max-w-[130px] truncate">
                  {user.email}
                </p>
                <p className="text-xs text-gray-400">Logged in</p>
              </div>
              <button
                onClick={signOut}
                className="bg-gray-100 text-gray-600 px-3 py-2 
                           rounded-xl text-xs font-semibold 
                           hover:bg-red-50 hover:text-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      </nav>

      {/* Share Modal */}
      {showShare && (
        <ShareModal onClose={() => setShowShare(false)} />
      )}
    </>
  );
}

export default Navbar;
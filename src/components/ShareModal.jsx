import { useState } from "react";
import { useAuth }   from "../context/AuthContext";
import { useResume } from "../context/ResumeContext";
import { toggleShareResume } from "../utils/resumeDB";

function ShareModal({ onClose }) {
  const { user }                        = useAuth();
  const { shareId, isPublic, setIsPublic } = useResume();
  const [loading, setLoading]           = useState(false);
  const [copied, setCopied]             = useState(false);

  const shareUrl = `${window.location.origin}/resume/${shareId}`;

  async function handleToggle() {
    setLoading(true);
    const newPublic = !isPublic;
    const { error } = await toggleShareResume(user.id, newPublic);
    if (!error) setIsPublic(newPublic);
    setLoading(false);
  }

  function handleCopy() {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center 
                    justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 
                      max-w-md w-full">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800">
            📤 Share Your Resume
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 
                       text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Toggle Public */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 
                        flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-700">
              {isPublic ? "🌐 Resume is Public" : "🔒 Resume is Private"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {isPublic
                ? "Anyone with the link can view it"
                : "Only you can see your resume"
              }
            </p>
          </div>
          <button
            onClick={handleToggle}
            disabled={loading}
            className={`relative w-12 h-6 rounded-full transition-colors
              ${isPublic ? "bg-indigo-600" : "bg-gray-300"}
              ${loading ? "opacity-50" : ""}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white 
                              rounded-full shadow transition-transform
              ${isPublic ? "translate-x-7" : "translate-x-1"}`}
            />
          </button>
        </div>

        {/* Share Link */}
        {isPublic && shareId && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-600">
              Your share link:
            </p>
            <div className="flex gap-2">
              <input
                readOnly
                value={shareUrl}
                className="flex-1 border border-gray-200 rounded-xl 
                           px-3 py-2.5 text-xs text-gray-600 
                           bg-gray-50 focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold 
                            transition whitespace-nowrap
                  ${copied
                    ? "bg-green-500 text-white"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
              >
                {copied ? "✅ Copied!" : "Copy"}
              </button>
            </div>

            {/* WhatsApp + LinkedIn share */}
            <div className="flex gap-2 pt-2">
              <a
                href={`https://wa.me/?text=Check out my resume: ${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-green-500 text-white text-center 
                           py-2.5 rounded-xl text-sm font-semibold 
                           hover:bg-green-600 transition"
              >
                📱 WhatsApp
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-blue-600 text-white text-center 
                           py-2.5 rounded-xl text-sm font-semibold 
                           hover:bg-blue-700 transition"
              >
                💼 LinkedIn
              </a>
            </div>
          </div>
        )}

        {!isPublic && (
          <p className="text-center text-sm text-gray-400 py-4">
            Toggle the switch above to generate your share link
          </p>
        )}

      </div>
    </div>
  );
}

export default ShareModal;
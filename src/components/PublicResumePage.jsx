import { useEffect, useState } from "react";
import { loadPublicResume }    from "../utils/resumeDB";
import ClassicTemplate         from "../templates/ClassicTemplate";

function PublicResumePage({ shareId }) {
  const [resume, setResume]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    loadPublicResume(shareId).then(({ data, error }) => {
      if (error || !data) {
        setError("Resume not found or is private.");
      } else {
        setResume(data);
      }
      setLoading(false);
    });
  }, [shareId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center 
                      bg-indigo-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 
                          border-t-transparent rounded-full 
                          animate-spin mx-auto mb-4" />
          <p className="text-indigo-600 font-semibold">
            Loading resume...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center 
                      bg-gray-50">
        <div className="text-center">
          <p className="text-6xl mb-4">🔒</p>
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            Resume Not Found
          </h2>
          <p className="text-gray-400 text-sm">{error}</p>
          <a href="/"
            className="mt-4 inline-block text-indigo-600 
                       font-semibold text-sm hover:underline">
            ← Build your own resume
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 
                      flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 text-white font-bold 
                          px-2 py-1 rounded-lg text-sm">
            R
          </div>
          <span className="font-bold text-gray-800">
            Resume<span className="text-indigo-600">GPT</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-500">
            {resume.title}
          </p>
          
          <a
            href="/"
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl 
                       text-sm font-semibold hover:bg-indigo-700 transition"
          >
            Build My Resume →
          </a>
        </div>
      </div>

      {/* Resume */}
      <div className="py-10 px-4">
        <div className="shadow-2xl rounded-lg overflow-hidden">
          <ClassicTemplate data={resume.data} />
        </div>
      </div>

    </div>
  );
}

export default PublicResumePage;
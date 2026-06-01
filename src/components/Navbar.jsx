import { useAuth } from "../context/AuthContext";

function Navbar({ onPreview, onATS, onJobMatch }) {
  const { user, signOut } = useAuth();

  return (
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

        {/* User Info + Logout */}
        {user && (
          <div className="flex items-center gap-3 ml-2 pl-3 
                          border-l border-gray-200">
            <div className="text-right">
              <p className="text-xs font-semibold text-gray-700 
                             max-w-[140px] truncate">
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
  );
}

export default Navbar;
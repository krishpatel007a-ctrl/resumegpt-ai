function Navbar({ onPreview }) {
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
      <div className="flex items-center gap-4">
        <a href="#"
          className="text-gray-500 hover:text-indigo-600 font-medium 
                     text-sm transition">
          Home
        </a>
        <a href="#"
          className="text-gray-500 hover:text-indigo-600 font-medium 
                     text-sm transition">
          My Resumes
        </a>
        <button
          onClick={onPreview}
          className="border border-indigo-600 text-indigo-600 px-4 py-2 
                     rounded-xl font-semibold text-sm hover:bg-indigo-50 
                     transition"
        >
          👁️ Preview Resume
        </button>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl 
                     font-semibold hover:bg-indigo-700 transition text-sm"
        >
          + New Resume
        </button>
      </div>

    </nav>
  );
}

export default Navbar;
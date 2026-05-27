function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 text-white font-bold text-lg px-3 py-1 rounded-lg">
          R
        </div>
        <span className="text-xl font-bold text-gray-800">
          Resume<span className="text-indigo-600">GPT</span>
        </span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        <a href="#" className="text-gray-500 hover:text-indigo-600 font-medium transition">
          Home
        </a>
        <a href="#" className="text-gray-500 hover:text-indigo-600 font-medium transition">
          My Resumes
        </a>
        <a href="#" className="text-gray-500 hover:text-indigo-600 font-medium transition">
          Templates
        </a>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition text-sm">
          + New Resume
        </button>
      </div>

    </nav>
  );
}

export default Navbar;
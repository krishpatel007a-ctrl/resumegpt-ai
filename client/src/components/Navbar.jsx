function Navbar() {
  return (
    <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 backdrop-blur-lg">

      <div>
        <h1 className="text-2xl font-bold">
          AI Resume Builder
        </h1>
        <p className="text-gray-400 text-sm">
          Build professional resumes with AI
        </p>
      </div>

      <button className="px-6 py-3 bg-purple-600 rounded-2xl hover:bg-purple-700 transition">
        Download PDF
      </button>
    </div>
  );
}

export default Navbar;
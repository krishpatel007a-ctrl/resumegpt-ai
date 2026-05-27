function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">
          ResumeGPT 🚀
        </h1>
        <p className="text-gray-500 text-lg">
          Your AI-powered Resume Builder
        </p>
        <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
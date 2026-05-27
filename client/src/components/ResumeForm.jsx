function ResumeForm() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Resume Details
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
        />

        <textarea
          rows="5"
          placeholder="Professional Summary"
          className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
        ></textarea>

        <button className="w-full p-4 rounded-2xl bg-purple-600 hover:bg-purple-700 transition">
          Generate With AI ✨
        </button>

      </div>
    </div>
  );
}

export default ResumeForm;
import { useState } from "react";
import { generateWithAI } from "../utils/aiHelper";

function SummaryForm() {
  const [summary, setSummary]     = useState("");
  const [jobTitle, setJobTitle]   = useState("");
  const [experience, setExperience] = useState("2");
  const [skills, setSkills]       = useState("");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  async function handleGenerate() {
    if (!jobTitle.trim()) {
      setError("Please enter your job title first!");
      return;
    }

    setLoading(true);
    setError("");

    const prompt = `Write a professional resume summary for a ${jobTitle} 
      with ${experience} years of experience. 
      Their key skills include: ${skills || "not specified"}.
      
      Requirements:
      - 3-4 sentences maximum
      - Start with a strong action or description
      - Mention years of experience
      - Sound confident and professional
      - Do NOT use "I" — write in third person
      - No fluff, every word must add value
      
      Return ONLY the summary text, nothing else.`;

    try {
      const result = await generateWithAI(prompt);
      setSummary(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSave() {
    if (!summary) {
      setError("Generate or write a summary first!");
      return;
    }
    alert("✅ Summary saved!");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

      {/* LEFT — Controls */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Professional Summary
        </h3>
        <p className="text-sm text-gray-400 mb-6">
          Let AI write a powerful summary for you in seconds!
        </p>

        {/* Job Title */}
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">
              Your Job Title *
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Full Stack Developer"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 
                         placeholder-gray-300 transition"
            />
          </div>

          {/* Years of Experience */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">
              Years of Experience
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 
                         text-gray-700 transition"
            >
              <option value="0">Fresher / No experience</option>
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="5">5 years</option>
              <option value="7">7+ years</option>
              <option value="10">10+ years</option>
            </select>
          </div>

          {/* Key Skills */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">
              Key Skills (optional)
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Node.js, Python, AWS"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 
                         placeholder-gray-300 transition"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 
                          rounded-xl p-3 text-sm text-red-600">
            ⚠️ {error}
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-xl font-semibold text-sm transition
            ${loading
              ? "bg-indigo-300 text-white cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
        >
          {loading ? "✨ AI is writing..." : "✨ Generate with AI"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 border-t border-gray-100" />
          <span className="text-xs text-gray-400">or write your own</span>
          <div className="flex-1 border-t border-gray-100" />
        </div>

        {/* Manual textarea */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">
            Your Summary
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={5}
            placeholder="Write or edit your summary here..."
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       placeholder-gray-300 transition resize-none text-gray-800"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-4 w-full bg-green-500 text-white py-3 rounded-xl 
                     font-semibold hover:bg-green-600 transition text-sm"
        >
          Save Summary ✅
        </button>

      </div>

      {/* RIGHT — Preview + Tips */}
      <div className="space-y-4">

        {/* Preview */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-500 
                        rounded-2xl p-6 text-white shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-widest 
                        text-indigo-200 mb-4">
            Live Preview 👁️
          </p>

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent 
                              rounded-full animate-spin" />
              <p className="text-indigo-200 text-sm">
                AI is crafting your summary...
              </p>
            </div>
          )}

          {!loading && summary && (
            <p className="text-white leading-relaxed text-sm">
              {summary}
            </p>
          )}

          {!loading && !summary && (
            <p className="text-indigo-300 text-sm italic">
              Your AI-generated summary will appear here...
            </p>
          )}
        </div>

        {/* Tips */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="text-sm font-semibold text-amber-700 mb-2">
            💡 Summary Tips
          </p>
          <ul className="text-xs text-amber-600 space-y-1.5">
            <li>✓ Keep it to 3-4 sentences max</li>
            <li>✓ Mention your years of experience</li>
            <li>✓ Include 2-3 key skills or tools</li>
            <li>✓ Tailor it to the job you're applying for</li>
            <li>✓ Never start with "I am a..."</li>
          </ul>
        </div>

        {/* AI Badge */}
        <div className="bg-indigo-50 border border-indigo-200 
                        rounded-2xl p-5 flex items-start gap-3">
          <span className="text-2xl">🤖</span>
          <div>
            <p className="text-sm font-semibold text-indigo-700">
              Powered by Claude AI
            </p>
            <p className="text-xs text-indigo-500 mt-1">
              Claude understands context and writes human-quality 
              professional content tailored to your experience level.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SummaryForm;
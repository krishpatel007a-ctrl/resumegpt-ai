import { useState } from "react";
import { generateWithAI } from "../utils/aiHelper";
import { useResume } from "../context/ResumeContext";

function SummaryForm() {
  const { updateSection }           = useResume();
  const [summary, setSummary]       = useState("");
  const [jobTitle, setJobTitle]     = useState("");
  const [experience, setExperience] = useState("2");
  const [skills, setSkills]         = useState("");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");

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
    if (!summary) { setError("Generate or write a summary first!"); return; }
    updateSection("summary", summary);
    alert("✅ Summary saved to resume!");
  }

  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#e2e8f0",
  };

  const labelStyle = {
    color: "rgba(255,255,255,0.4)",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* LEFT — Controls */}
      <div className="rounded-2xl p-6 space-y-5" style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
      }}>
        <div>
          <h3 className="text-base font-bold text-white">
            Professional Summary
          </h3>
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
            Let AI write a powerful summary in seconds!
          </p>
        </div>

        <hr className="section-divider" />

        {/* AI Inputs */}
        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest"
              style={labelStyle}>
              Your Job Title *
            </label>
            <input
              type="text" value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Full Stack Developer"
              className="w-full px-4 py-3 rounded-xl text-sm font-medium"
              style={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest"
              style={labelStyle}>
              Years of Experience
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm font-medium"
              style={inputStyle}
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

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest"
              style={labelStyle}>
              Key Skills (optional)
            </label>
            <input
              type="text" value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Node.js, Python, AWS"
              className="w-full px-4 py-3 rounded-xl text-sm font-medium"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="px-4 py-3 rounded-xl text-sm" style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            color: "#fca5a5",
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-sm 
                     text-white flex items-center justify-center gap-2"
          style={loading ? {
            background: "rgba(99,102,241,0.3)",
            cursor: "not-allowed",
          } : {
            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            boxShadow: "0 4px 15px rgba(99,102,241,0.4)",
          }}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white 
                               border-t-transparent rounded-full 
                               animate-spin" />
              AI is writing...
            </>
          ) : "✨ Generate with AI"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.07)" }} />
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            or write your own
          </span>
          <div className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* Textarea */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest"
            style={labelStyle}>
            Your Summary
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={5}
            placeholder="Write or edit your summary here..."
            className="w-full px-4 py-3 rounded-xl text-sm resize-none"
            style={inputStyle}
          />
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="w-full py-3 rounded-xl font-semibold text-sm text-white"
          style={{
            background: "linear-gradient(135deg, #10b981, #059669)",
            boxShadow: "0 4px 15px rgba(16,185,129,0.3)",
          }}
        >
          Save Summary ✅
        </button>
      </div>

      {/* RIGHT — Preview */}
      <div className="space-y-4">

        {/* Preview Card */}
        <div className="rounded-2xl p-6" style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(167,139,250,0.08))",
          border: "1px solid rgba(99,102,241,0.25)",
          backdropFilter: "blur(12px)",
        }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "rgba(167,139,250,0.6)" }}>
            👁️ Live Preview
          </p>

          {loading && (
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 border-2 border-indigo-400 
                               border-t-transparent rounded-full 
                               animate-spin" />
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                Gemini AI is writing...
              </p>
            </div>
          )}

          {!loading && summary && (
            <p className="text-sm leading-relaxed text-white">{summary}</p>
          )}

          {!loading && !summary && (
            <p className="text-sm italic"
              style={{ color: "rgba(255,255,255,0.2)" }}>
              Your AI-generated summary will appear here...
            </p>
          )}
        </div>

        {/* Tips */}
        <div className="rounded-2xl p-5" style={{
          background: "rgba(245,158,11,0.08)",
          border: "1px solid rgba(245,158,11,0.2)",
        }}>
          <p className="text-sm font-semibold mb-3" style={{ color: "#fbbf24" }}>
            💡 Summary Tips
          </p>
          <ul className="space-y-2">
            {[
              "Keep it to 3-4 sentences max",
              "Mention your years of experience",
              "Include 2-3 key skills or tools",
              "Never start with 'I am a...'",
            ].map((tip) => (
              <li key={tip} className="text-xs flex items-start gap-2"
                style={{ color: "rgba(255,255,255,0.35)" }}>
                <span className="text-amber-400">✓</span> {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* AI Badge */}
        <div className="rounded-2xl p-5 flex items-start gap-3" style={{
          background: "rgba(99,102,241,0.08)",
          border: "1px solid rgba(99,102,241,0.2)",
        }}>
          <span className="text-2xl">🤖</span>
          <div>
            <p className="text-sm font-semibold text-indigo-300">
              Powered by Gemini AI
            </p>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
              Writes human-quality professional content tailored 
              to your experience level.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SummaryForm;
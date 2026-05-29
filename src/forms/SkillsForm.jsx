import { useState } from "react";
import { generateWithAI } from "../utils/aiHelper";
import { useResume } from "../context/ResumeContext";

const CATEGORIES = [
  "Technical Skills",
  "Frontend",
  "Backend",
  "Database",
  "DevOps & Cloud",
  "Mobile",
  "Soft Skills",
  "Languages",
  "Tools & Software",
  "Other",
];

function SkillsForm() {
  const { updateSection } = useResume();
  const [skills, setSkills]       = useState([]);
  const [input, setInput]         = useState("");
  const [category, setCategory]   = useState("Technical Skills");
  const [jobRole, setJobRole]     = useState("");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  function handleAddSkill() {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (skills.find((s) => s.name.toLowerCase() === trimmed.toLowerCase())) {
      setError("This skill is already added!");
      return;
    }
    setSkills((prev) => [
      ...prev,
      { id: Date.now(), name: trimmed, category },
    ]);
    setInput("");
    setError("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleAddSkill();
  }

  function handleRemoveSkill(id) {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  }

  async function handleGenerate() {
    if (!jobRole.trim()) {
      setError("Please enter your job role first!");
      return;
    }
    setLoading(true);
    setError("");

    const prompt = `List 12 essential skills for a ${jobRole} resume.
      
      Requirements:
      - Mix of technical and soft skills
      - Short skill names only (1-3 words each)
      - Most relevant and in-demand skills
      - Format: return ONLY a comma-separated list
      
      Example format: React, Node.js, TypeScript, Problem Solving
      
      Return ONLY the comma-separated list, nothing else.`;

    try {
      const result = await generateWithAI(prompt);
      const newSkills = result
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .filter(
          (s) => !skills.find(
            (existing) => existing.name.toLowerCase() === s.toLowerCase()
          )
        )
        .map((name) => ({
          id: Date.now() + Math.random(),
          name,
          category,
        }));
      setSkills((prev) => [...prev, ...newSkills]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSave() {
    if (skills.length === 0) {
      setError("Add at least one skill first!");
      return;
    }
    updateSection("skills", skills);
    alert(`✅ ${skills.length} skills saved!`);
  }

  // Group skills by category
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* LEFT — Input Area */}
      <div className="lg:col-span-2 space-y-6">

        {/* AI Generate */}
        <div className="bg-white rounded-2xl border border-gray-100 
                        shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-800">
            🤖 AI Skill Suggestions
          </h3>
          <p className="text-sm text-gray-400">
            Enter your job role and let Gemini suggest the best skills!
          </p>

          <div className="flex gap-3">
            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="e.g. Full Stack Developer"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 
                         text-sm focus:outline-none focus:ring-2 
                         focus:ring-indigo-400 placeholder-gray-300 transition"
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition
                ${loading
                  ? "bg-indigo-300 text-white cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
            >
              {loading ? "Loading..." : "✨ Suggest"}
            </button>
          </div>
        </div>

        {/* Manual Add */}
        <div className="bg-white rounded-2xl border border-gray-100 
                        shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-800">
            ➕ Add Skills Manually
          </h3>

          <div className="flex gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 
                         text-gray-700 transition"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a skill & press Enter"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 
                         text-sm focus:outline-none focus:ring-2 
                         focus:ring-indigo-400 placeholder-gray-300 transition"
            />
            <button
              onClick={handleAddSkill}
              className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl 
                         text-sm font-semibold hover:bg-indigo-700 transition"
            >
              Add
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl 
                            p-3 text-xs text-red-600">
              ⚠️ {error}
            </div>
          )}

          {/* Skills Preview grouped by category */}
          {skills.length > 0 ? (
            <div className="space-y-4 pt-2">
              {Object.entries(grouped).map(([cat, catSkills]) => (
                <div key={cat}>
                  <p className="text-xs font-semibold text-gray-400 
                                uppercase tracking-widest mb-2">
                    {cat}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="flex items-center gap-1.5 bg-indigo-50 
                                   text-indigo-700 text-sm font-medium 
                                   px-3 py-1.5 rounded-xl"
                      >
                        {skill.name}
                        <button
                          onClick={() => handleRemoveSkill(skill.id)}
                          className="text-indigo-400 hover:text-red-500 
                                     transition font-bold leading-none"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-300">
              <p className="text-4xl mb-2">🛠️</p>
              <p className="text-sm">
                No skills added yet. Use AI or type manually!
              </p>
            </div>
          )}

        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-green-500 text-white py-3 rounded-xl 
                     font-semibold hover:bg-green-600 transition text-sm"
        >
          Save Skills ({skills.length}) ✅
        </button>

      </div>

      {/* RIGHT — Tips */}
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 
                        rounded-2xl p-5 sticky top-8">
          <p className="text-sm font-semibold text-amber-700 mb-3">
            💡 Skills Tips
          </p>
          <ul className="text-xs text-amber-600 space-y-2">
            <li>✓ Add 8-15 skills for best results</li>
            <li>✓ Match skills to the job description</li>
            <li>✓ Include both hard & soft skills</li>
            <li>✓ Be honest — you may be tested!</li>
            <li>✓ Group by category for readability</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            🔥 In-Demand Skills 2026
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "React","Python","AWS","Docker",
              "TypeScript","Node.js","SQL","Git",
              "Figma","REST APIs","AI/ML","Linux",
            ].map((s) => (
              <button
                key={s}
                onClick={() => {
                  if (!skills.find((sk) => sk.name === s)) {
                    setSkills((prev) => [
                      ...prev,
                      { id: Date.now() + Math.random(), name: s, category },
                    ]);
                  }
                }}
                className="bg-gray-50 hover:bg-indigo-50 text-gray-600 
                           hover:text-indigo-600 text-xs font-medium 
                           px-2 py-1 rounded-lg border border-gray-200 
                           hover:border-indigo-200 transition"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default SkillsForm;
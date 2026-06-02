import { useState } from "react";
import { generateWithAI } from "../utils/aiHelper";
import { useResume } from "../context/ResumeContext";
import {
  DarkCard, SaveButton, ErrorBox,
  PrimaryButton, TipsCard,
} from "../components/DarkFormComponents";

const CATEGORIES = [
  "Technical Skills","Frontend","Backend","Database",
  "DevOps & Cloud","Mobile","Soft Skills","Languages",
  "Tools & Software","Other",
];

function SkillsForm() {
  const { updateSection }         = useResume();
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
      setError("Skill already added!"); return;
    }
    setSkills((p) => [...p, { id: Date.now(), name: trimmed, category }]);
    setInput("");
    setError("");
  }

  async function handleGenerate() {
    if (!jobRole.trim()) { setError("Enter your job role first!"); return; }
    setLoading(true);
    setError("");
    const prompt = `List 12 essential skills for a ${jobRole} resume.
      - Mix of technical and soft skills
      - Short skill names only (1-3 words each)
      - Format: comma-separated list only
      Return ONLY the comma-separated list, nothing else.`;
    try {
      const result = await generateWithAI(prompt);
      const newSkills = result.split(",").map((s) => s.trim())
        .filter(Boolean)
        .filter((s) => !skills.find(
          (e) => e.name.toLowerCase() === s.toLowerCase()
        ))
        .map((name) => ({
          id: Date.now() + Math.random(), name, category,
        }));
      setSkills((p) => [...p, ...newSkills]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSave() {
    if (skills.length === 0) { setError("Add at least one skill!"); return; }
    updateSection("skills", skills);
    alert(`✅ ${skills.length} skills saved!`);
  }

  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#e2e8f0",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">

        {/* AI Suggest */}
        <DarkCard>
          <h3 className="text-base font-bold text-white mb-1">
            🤖 AI Skill Suggestions
          </h3>
          <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
            Enter your job role and let Gemini suggest the best skills!
          </p>
          <div className="flex gap-3">
            <input
              type="text" value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="e.g. Full Stack Developer"
              className="flex-1 px-4 py-3 rounded-xl text-sm"
              style={inputStyle}
            />
            <PrimaryButton onClick={handleGenerate} loading={loading}>
              {loading ? "..." : "✨ Suggest"}
            </PrimaryButton>
          </div>
        </DarkCard>

        {/* Manual Add */}
        <DarkCard>
          <h3 className="text-base font-bold text-white mb-4">
            ➕ Add Skills Manually
          </h3>
          <div className="flex gap-2 mb-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl text-sm"
              style={inputStyle}
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input
              type="text" value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
              placeholder="Type skill & press Enter"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm"
              style={inputStyle}
            />
            <button onClick={handleAddSkill}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold 
                         text-white"
              style={{
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              }}>
              Add
            </button>
          </div>

          <ErrorBox message={error} />

          {/* Skills Display */}
          {skills.length > 0 ? (
            <div className="space-y-4 mt-4">
              {Object.entries(grouped).map(([cat, catSkills]) => (
                <div key={cat}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: "rgba(255,255,255,0.25)" }}>
                    {cat}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((skill) => (
                      <span key={skill.id}
                        className="flex items-center gap-1.5 text-sm 
                                   font-medium px-3 py-1.5 rounded-xl"
                        style={{
                          background: "rgba(99,102,241,0.15)",
                          border: "1px solid rgba(99,102,241,0.25)",
                          color: "#a5b4fc",
                        }}>
                        {skill.name}
                        <button
                          onClick={() => setSkills(
                            (p) => p.filter((s) => s.id !== skill.id)
                          )}
                          className="hover:text-red-400 transition font-bold"
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
            <div className="text-center py-8"
              style={{ color: "rgba(255,255,255,0.2)" }}>
              <p className="text-3xl mb-2">🛠️</p>
              <p className="text-sm">No skills yet. Use AI or type manually!</p>
            </div>
          )}
        </DarkCard>

        <SaveButton onClick={handleSave}>
          Save Skills ({skills.length}) ✅
        </SaveButton>
      </div>

      {/* RIGHT */}
      <div className="space-y-4">
        <TipsCard title="💡 Skills Tips" tips={[
          "Add 8-15 skills for best results",
          "Match skills to job description",
          "Include both hard & soft skills",
          "Be honest — you may be tested!",
          "Group by category for readability",
        ]} />

        <DarkCard>
          <p className="text-sm font-semibold text-white mb-3">
            🔥 In-Demand 2026
          </p>
          <div className="flex flex-wrap gap-2">
            {["React","Python","AWS","Docker","TypeScript",
              "Node.js","SQL","Git","Figma","REST APIs",
              "AI/ML","Linux"].map((s) => (
              <button key={s}
                onClick={() => {
                  if (!skills.find((sk) => sk.name === s)) {
                    setSkills((p) => [...p, {
                      id: Date.now() + Math.random(), name: s, category,
                    }]);
                  }
                }}
                className="text-xs font-medium px-2 py-1 rounded-lg 
                           transition hover:brightness-125"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.5)",
                }}>
                + {s}
              </button>
            ))}
          </div>
        </DarkCard>
      </div>
    </div>
  );
}

export default SkillsForm;
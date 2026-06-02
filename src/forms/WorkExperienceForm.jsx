import { useState } from "react";
import { generateWithAI } from "../utils/aiHelper";
import { useResume } from "../context/ResumeContext";
import {
  DarkCard, DarkInput, DarkTextarea,
  PrimaryButton, SaveButton, ErrorBox, TipsCard,
} from "../components/DarkFormComponents";

const emptyJob = {
  id: Date.now(), company: "", position: "",
  startDate: "", endDate: "", current: false, description: "",
};

function JobCard({ job, onUpdate, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    onUpdate(job.id, { ...job, [name]: type === "checkbox" ? checked : value });
  }

  async function handleGenerate() {
    if (!job.position || !job.company) {
      setError("Enter Position and Company first!");
      return;
    }
    setLoading(true);
    setError("");
    const prompt = `Write 3 professional resume bullet points for someone 
      who worked as a ${job.position} at ${job.company}.
      - Start each bullet with a strong action verb
      - Include measurable impact where possible
      - Keep each bullet under 20 words
      - Format: each bullet on a new line starting with •
      Return ONLY the 3 bullet points, nothing else.`;
    try {
      const result = await generateWithAI(prompt);
      onUpdate(job.id, { ...job, description: result });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl p-5 space-y-4" style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
    }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">
          {job.position || "New Position"}
          {job.company ? ` @ ${job.company}` : ""}
        </p>
        <button onClick={() => onDelete(job.id)}
          className="text-xs font-medium px-3 py-1.5 rounded-lg transition"
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#fca5a5",
          }}>
          🗑️ Remove
        </button>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-3">
        <DarkInput label="Job Title *" name="position"
          value={job.position} onChange={handleChange}
          placeholder="e.g. Frontend Developer" />
        <DarkInput label="Company *" name="company"
          value={job.company} onChange={handleChange}
          placeholder="e.g. Google" />
      </div>

      {/* Row 2 — Dates */}
      <div className="grid grid-cols-3 gap-3 items-end">
        <DarkInput label="Start Date" name="startDate" type="month"
          value={job.startDate} onChange={handleChange} />
        <DarkInput label="End Date" name="endDate" type="month"
          value={job.endDate} onChange={handleChange}
          disabled={job.current} />
        <label className="flex items-center gap-2 text-sm cursor-pointer pb-1"
          style={{ color: "rgba(255,255,255,0.5)" }}>
          <input type="checkbox" name="current" checked={job.current}
            onChange={handleChange} className="accent-indigo-500 w-4 h-4" />
          Current
        </label>
      </div>

      <ErrorBox message={error} />

      <PrimaryButton onClick={handleGenerate} loading={loading}>
        {loading ? "Writing..." : "✨ Generate Bullet Points with AI"}
      </PrimaryButton>

      <DarkTextarea label="Description / Bullet Points"
        name="description" value={job.description}
        onChange={handleChange} rows={4}
        placeholder="• Led development of...&#10;• Improved by...&#10;• Built..." />
    </div>
  );
}

function WorkExperienceForm() {
  const { updateSection }     = useResume();
  const [jobs, setJobs]       = useState([{ ...emptyJob }]);

  function handleAdd() {
    setJobs((p) => [...p, { ...emptyJob, id: Date.now() }]);
  }
  function handleUpdate(id, updated) {
    setJobs((p) => p.map((j) => j.id === id ? updated : j));
  }
  function handleDelete(id) {
    if (jobs.length === 1) { alert("Need at least one entry!"); return; }
    setJobs((p) => p.filter((j) => j.id !== id));
  }
  function handleSave() {
    updateSection("experience", jobs);
    alert(`✅ ${jobs.length} experience entries saved!`);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* LEFT — Forms */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              Work Experience
            </h3>
            <p className="text-xs mt-0.5"
              style={{ color: "rgba(255,255,255,0.3)" }}>
              {jobs.length} {jobs.length === 1 ? "entry" : "entries"} added
            </p>
          </div>
          <button onClick={handleAdd}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition"
            style={{
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "#818cf8",
            }}>
            + Add Job
          </button>
        </div>

        {jobs.map((job, i) => (
          <div key={job.id}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "rgba(255,255,255,0.2)" }}>
              Position {i + 1}
            </p>
            <JobCard job={job} onUpdate={handleUpdate}
              onDelete={handleDelete} />
          </div>
        ))}

        <SaveButton onClick={handleSave}>
          Save Work Experience ✅
        </SaveButton>
      </div>

      {/* RIGHT — Tips */}
      <div className="space-y-4">
        <TipsCard title="💡 Experience Tips" tips={[
          "List jobs newest first",
          "Use action verbs: Led, Built, Improved",
          "Add numbers: 'increased sales by 30%'",
          "Focus on impact, not tasks",
          "Keep each bullet under 20 words",
        ]} />

        {/* Action Verbs */}
        <DarkCard>
          <p className="text-sm font-semibold text-white mb-3">
            💪 Action Verbs
          </p>
          <div className="flex flex-wrap gap-2">
            {["Led","Built","Designed","Improved","Launched",
              "Managed","Created","Reduced","Increased","Delivered",
              "Optimized","Developed"].map((v) => (
              <span key={v} className="text-xs font-medium px-2 py-1 
                                       rounded-lg"
                style={{
                  background: "rgba(99,102,241,0.15)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  color: "#a5b4fc",
                }}>
                {v}
              </span>
            ))}
          </div>
        </DarkCard>
      </div>
    </div>
  );
}

export default WorkExperienceForm;
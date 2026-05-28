import { useState } from "react";
import { generateWithAI } from "../utils/aiHelper";

const emptyJob = {
  id: Date.now(),
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
};

function JobCard({ job, onUpdate, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    onUpdate(job.id, {
      ...job,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleGenerate() {
    if (!job.position || !job.company) {
      setError("Please enter Position and Company first!");
      return;
    }
    setLoading(true);
    setError("");

    const prompt = `Write 3 professional resume bullet points for someone 
      who worked as a ${job.position} at ${job.company}.
      
      Requirements:
      - Start each bullet with a strong action verb
      - Include measurable impact where possible
      - Keep each bullet under 20 words
      - Sound professional and confident
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
    <div className="bg-white border border-gray-100 rounded-2xl p-6 
                    shadow-sm space-y-4">

      {/* Card Header */}
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-gray-700 text-sm">
          {job.position || "New Position"} 
          {job.company ? ` @ ${job.company}` : ""}
        </h4>
        <button
          onClick={() => onDelete(job.id)}
          className="text-red-400 hover:text-red-600 text-xs font-medium 
                     transition hover:bg-red-50 px-2 py-1 rounded-lg"
        >
          🗑️ Remove
        </button>
      </div>

      {/* Row 1 — Position + Company */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">
            Job Title / Position *
          </label>
          <input
            name="position"
            value={job.position}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       placeholder-gray-300 transition"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">
            Company Name *
          </label>
          <input
            name="company"
            value={job.company}
            onChange={handleChange}
            placeholder="e.g. Google"
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       placeholder-gray-300 transition"
          />
        </div>
      </div>

      {/* Row 2 — Dates */}
      <div className="grid grid-cols-3 gap-3 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">
            Start Date
          </label>
          <input
            name="startDate"
            type="month"
            value={job.startDate}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       transition text-gray-700"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">
            End Date
          </label>
          <input
            name="endDate"
            type="month"
            value={job.endDate}
            onChange={handleChange}
            disabled={job.current}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       transition text-gray-700 disabled:opacity-40"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600 
                          cursor-pointer pb-2">
          <input
            type="checkbox"
            name="current"
            checked={job.current}
            onChange={handleChange}
            className="accent-indigo-600 w-4 h-4"
          />
          Current Job
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 
                        text-xs text-red-600">
          ⚠️ {error}
        </div>
      )}

      {/* AI Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`w-full py-2.5 rounded-xl font-semibold text-sm transition
          ${loading
            ? "bg-indigo-300 text-white cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
      >
        {loading ? "✨ AI is writing..." : "✨ Generate Bullet Points with AI"}
      </button>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500">
          Job Description / Bullet Points
        </label>
        <textarea
          name="description"
          value={job.description}
          onChange={handleChange}
          rows={4}
          placeholder="• Led development of...&#10;• Improved performance by...&#10;• Collaborated with..."
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 
                     placeholder-gray-300 transition resize-none text-gray-800"
        />
      </div>

    </div>
  );
}

function WorkExperienceForm() {
  const [jobs, setJobs] = useState([{ ...emptyJob }]);

  function handleAddJob() {
    setJobs((prev) => [
      ...prev,
      { ...emptyJob, id: Date.now() },
    ]);
  }

  function handleUpdateJob(id, updatedJob) {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? updatedJob : job))
    );
  }

  function handleDeleteJob(id) {
    if (jobs.length === 1) {
      alert("You need at least one work experience entry!");
      return;
    }
    setJobs((prev) => prev.filter((job) => job.id !== id));
  }

  function handleSave() {
    alert(`✅ ${jobs.length} work experience entry saved!`);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* LEFT — Forms (takes 2/3 width) */}
      <div className="lg:col-span-2 space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Work Experience
            </h3>
            <p className="text-sm text-gray-400 mt-0.5">
              {jobs.length} {jobs.length === 1 ? "entry" : "entries"} added
            </p>
          </div>
          <button
            onClick={handleAddJob}
            className="bg-indigo-50 text-indigo-600 border border-indigo-200 
                       px-4 py-2 rounded-xl text-sm font-semibold 
                       hover:bg-indigo-100 transition"
          >
            + Add Another Job
          </button>
        </div>

        {/* Job Cards */}
        {jobs.map((job, index) => (
          <div key={job.id}>
            <p className="text-xs font-semibold text-gray-400 
                          uppercase tracking-widest mb-2">
              Position {index + 1}
            </p>
            <JobCard
              job={job}
              onUpdate={handleUpdateJob}
              onDelete={handleDeleteJob}
            />
          </div>
        ))}

        {/* Save All Button */}
        <button
          onClick={handleSave}
          className="w-full bg-green-500 text-white py-3 rounded-xl 
                     font-semibold hover:bg-green-600 transition text-sm"
        >
          Save Work Experience ✅
        </button>

      </div>

      {/* RIGHT — Tips (takes 1/3 width) */}
      <div className="space-y-4">

        {/* Tips Card */}
        <div className="bg-amber-50 border border-amber-200 
                        rounded-2xl p-5 sticky top-8">
          <p className="text-sm font-semibold text-amber-700 mb-3">
            💡 Experience Tips
          </p>
          <ul className="text-xs text-amber-600 space-y-2">
            <li>✓ List jobs newest first</li>
            <li>✓ Use action verbs: Led, Built, Improved</li>
            <li>✓ Add numbers: "increased sales by 30%"</li>
            <li>✓ Focus on impact, not just tasks</li>
            <li>✓ Keep each bullet under 20 words</li>
            <li>✓ Tailor bullets to the job you want</li>
          </ul>
        </div>

        {/* AI Badge */}
        <div className="bg-indigo-50 border border-indigo-200 
                        rounded-2xl p-5 flex items-start gap-3">
          <span className="text-2xl">🤖</span>
          <div>
            <p className="text-sm font-semibold text-indigo-700">
              AI Bullet Points
            </p>
            <p className="text-xs text-indigo-500 mt-1">
              Enter your job title and company, then let 
              Gemini write powerful bullet points for you!
            </p>
          </div>
        </div>

        {/* Action Verbs */}
        <div className="bg-white border border-gray-100 
                        rounded-2xl p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            💪 Strong Action Verbs
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Led","Built","Designed","Improved",
              "Launched","Managed","Created","Reduced",
              "Increased","Delivered","Optimized","Developed",
            ].map((verb) => (
              <span
                key={verb}
                className="bg-indigo-50 text-indigo-600 text-xs 
                           font-medium px-2 py-1 rounded-lg"
              >
                {verb}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default WorkExperienceForm;
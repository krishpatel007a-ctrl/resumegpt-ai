import { useState } from "react";
import { generateWithAI } from "../utils/aiHelper";
import { useResume } from "../context/ResumeContext";

const emptyProject = {
  id: Date.now(),
  name: "",
  techStack: "",
  liveUrl: "",
  githubUrl: "",
  description: "",
};

function ProjectCard({ project, onUpdate, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    onUpdate(project.id, { ...project, [name]: value });
  }

  async function handleGenerate() {
    if (!project.name) {
      setError("Please enter the project name first!");
      return;
    }
    setLoading(true);
    setError("");

    const prompt = `Write 2-3 professional resume bullet points for a 
      software project called "${project.name}".
      Tech stack used: ${project.techStack || "not specified"}.
      
      Requirements:
      - Start each bullet with a strong action verb
      - Mention the tech stack naturally
      - Highlight impact or what problem it solves
      - Keep each bullet under 20 words
      - Format: each bullet on a new line starting with •
      
      Return ONLY the bullet points, nothing else.`;

    try {
      const result = await generateWithAI(prompt);
      onUpdate(project.id, { ...project, description: result });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 
                    shadow-sm space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-gray-700 text-sm">
          {project.name || "New Project"}
        </h4>
        <button
          onClick={() => onDelete(project.id)}
          className="text-red-400 hover:text-red-600 text-xs font-medium 
                     transition hover:bg-red-50 px-2 py-1 rounded-lg"
        >
          🗑️ Remove
        </button>
      </div>

      {/* Row 1 — Name + Tech Stack */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">
            Project Name *
          </label>
          <input
            name="name"
            value={project.name}
            onChange={handleChange}
            placeholder="e.g. ResumeGPT"
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       placeholder-gray-300 transition"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">
            Tech Stack
          </label>
          <input
            name="techStack"
            value={project.techStack}
            onChange={handleChange}
            placeholder="e.g. React, Node.js, MongoDB"
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       placeholder-gray-300 transition"
          />
        </div>
      </div>

      {/* Row 2 — URLs */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">
            🌐 Live URL
          </label>
          <input
            name="liveUrl"
            value={project.liveUrl}
            onChange={handleChange}
            placeholder="https://resumegpt.com"
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       placeholder-gray-300 transition"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">
            🐙 GitHub URL
          </label>
          <input
            name="githubUrl"
            value={project.githubUrl}
            onChange={handleChange}
            placeholder="github.com/you/project"
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       placeholder-gray-300 transition"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl 
                        p-3 text-xs text-red-600">
          ⚠️ {error}
        </div>
      )}

      {/* AI Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`w-full py-2.5 rounded-xl font-semibold text-sm transition
          ${loading
            ? "bg-indigo-300 text-white cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
      >
        {loading ? "✨ AI is writing..." : "✨ Generate Description with AI"}
      </button>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500">
          Project Description
        </label>
        <textarea
          name="description"
          value={project.description}
          onChange={handleChange}
          rows={4}
          placeholder="• Built a full-stack app that...&#10;• Integrated AI to...&#10;• Reduced load time by..."
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 
                     placeholder-gray-300 transition resize-none text-gray-800"
        />
      </div>

    </div>
  );
}
function ProjectsForm() {
  const { updateSection } = useResume();
  const [projects, setProjects] = useState([{ ...emptyProject }]);

  function handleAdd() {
    setProjects((prev) => [
      ...prev,
      { ...emptyProject, id: Date.now() },
    ]);
  }

  function handleUpdate(id, updated) {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
  }

  function handleDelete(id) {
    if (projects.length === 1) {
      alert("You need at least one project entry!");
      return;
    }
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  function handleSave() {
    updateSection("projects", projects);
    alert(`✅ ${projects.length} project(s) saved!`);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* LEFT — Forms */}
      <div className="lg:col-span-2 space-y-4">

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Projects</h3>
            <p className="text-sm text-gray-400 mt-0.5">
              {projects.length} {projects.length === 1 ? "project" : "projects"} added
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-indigo-50 text-indigo-600 border border-indigo-200 
                       px-4 py-2 rounded-xl text-sm font-semibold 
                       hover:bg-indigo-100 transition"
          >
            + Add Another Project
          </button>
        </div>

        {projects.map((project, index) => (
          <div key={project.id}>
            <p className="text-xs font-semibold text-gray-400 
                          uppercase tracking-widest mb-2">
              Project {index + 1}
            </p>
            <ProjectCard
              project={project}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </div>
        ))}

        <button
          onClick={handleSave}
          className="w-full bg-green-500 text-white py-3 rounded-xl 
                     font-semibold hover:bg-green-600 transition text-sm"
        >
          Save Projects ✅
        </button>

      </div>

      {/* RIGHT — Tips */}
      <div className="space-y-4">

        <div className="bg-amber-50 border border-amber-200 
                        rounded-2xl p-5 sticky top-8">
          <p className="text-sm font-semibold text-amber-700 mb-3">
            💡 Project Tips
          </p>
          <ul className="text-xs text-amber-600 space-y-2">
            <li>✓ Add 2-4 projects maximum</li>
            <li>✓ Always include a GitHub link</li>
            <li>✓ Mention the problem it solves</li>
            <li>✓ List the tech stack clearly</li>
            <li>✓ Add live URL if deployed</li>
            <li>✓ Highlight your specific role</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-100 
                        rounded-2xl p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            🚀 Project Ideas
          </p>
          <ul className="text-xs text-gray-500 space-y-2">
            {[
              "AI Resume Builder (this one! 🎉)",
              "E-commerce Store",
              "Chat Application",
              "Portfolio Website",
              "Weather Dashboard",
              "Task Manager App",
            ].map((idea) => (
              <li key={idea} className="flex items-center gap-2">
                <span className="text-indigo-400">→</span> {idea}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default ProjectsForm;
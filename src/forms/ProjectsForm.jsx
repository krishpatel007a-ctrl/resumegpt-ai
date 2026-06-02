import { useState } from "react";
import { generateWithAI } from "../utils/aiHelper";
import { useResume } from "../context/ResumeContext";
import {
  DarkInput, DarkTextarea, PrimaryButton,
  SaveButton, ErrorBox, TipsCard, DarkCard,
} from "../components/DarkFormComponents";

const emptyProject = {
  id: Date.now(), name: "", techStack: "",
  liveUrl: "", githubUrl: "", description: "",
};

function ProjectCard({ project, onUpdate, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  function handleChange(e) {
    onUpdate(project.id, { ...project, [e.target.name]: e.target.value });
  }

  async function handleGenerate() {
    if (!project.name) { setError("Enter project name first!"); return; }
    setLoading(true);
    setError("");
    const prompt = `Write 2-3 professional resume bullet points for a 
      software project called "${project.name}".
      Tech stack: ${project.techStack || "not specified"}.
      - Start each bullet with a strong action verb
      - Mention the tech stack naturally
      - Highlight impact or problem solved
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
    <div className="rounded-2xl p-5 space-y-4" style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
    }}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">
          {project.name || "New Project"}
        </p>
        <button onClick={() => onDelete(project.id)}
          className="text-xs font-medium px-3 py-1.5 rounded-lg"
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#fca5a5",
          }}>
          🗑️ Remove
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <DarkInput label="Project Name *" name="name"
          value={project.name} onChange={handleChange}
          placeholder="e.g. ResumeGPT" />
        <DarkInput label="Tech Stack" name="techStack"
          value={project.techStack} onChange={handleChange}
          placeholder="e.g. React, Node.js" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <DarkInput label="🌐 Live URL" name="liveUrl"
          value={project.liveUrl} onChange={handleChange}
          placeholder="https://project.com" />
        <DarkInput label="🐙 GitHub URL" name="githubUrl"
          value={project.githubUrl} onChange={handleChange}
          placeholder="github.com/you/project" />
      </div>

      <ErrorBox message={error} />

      <PrimaryButton onClick={handleGenerate} loading={loading}>
        {loading ? "Writing..." : "✨ Generate Description with AI"}
      </PrimaryButton>

      <DarkTextarea label="Project Description"
        name="description" value={project.description}
        onChange={handleChange} rows={4}
        placeholder="• Built a full-stack app...&#10;• Integrated AI to...&#10;• Reduced load time by..." />
    </div>
  );
}

function ProjectsForm() {
  const { updateSection }         = useResume();
  const [projects, setProjects]   = useState([{ ...emptyProject }]);

  function handleAdd() {
    setProjects((p) => [...p, { ...emptyProject, id: Date.now() }]);
  }
  function handleUpdate(id, updated) {
    setProjects((p) => p.map((proj) => proj.id === id ? updated : proj));
  }
  function handleDelete(id) {
    if (projects.length === 1) { alert("Need at least one project!"); return; }
    setProjects((p) => p.filter((proj) => proj.id !== id));
  }
  function handleSave() {
    updateSection("projects", projects);
    alert(`✅ ${projects.length} project(s) saved!`);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Projects</h3>
            <p className="text-xs mt-0.5"
              style={{ color: "rgba(255,255,255,0.3)" }}>
              {projects.length} project(s) added
            </p>
          </div>
          <button onClick={handleAdd}
            className="px-4 py-2 rounded-xl text-sm font-semibold"
            style={{
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "#818cf8",
            }}>
            + Add Project
          </button>
        </div>

        {projects.map((project, i) => (
          <div key={project.id}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "rgba(255,255,255,0.2)" }}>
              Project {i + 1}
            </p>
            <ProjectCard project={project}
              onUpdate={handleUpdate} onDelete={handleDelete} />
          </div>
        ))}

        <SaveButton onClick={handleSave}>Save Projects ✅</SaveButton>
      </div>

      <div className="space-y-4">
        <TipsCard title="💡 Project Tips" tips={[
          "Add 2-4 projects maximum",
          "Always include a GitHub link",
          "Mention the problem it solves",
          "List the tech stack clearly",
          "Add live URL if deployed",
        ]} />
        <DarkCard>
          <p className="text-sm font-semibold text-white mb-3">
            🚀 Project Ideas
          </p>
          <ul className="space-y-2">
            {["AI Resume Builder (this one! 🎉)",
              "E-commerce Store","Chat Application",
              "Portfolio Website","Weather Dashboard",
              "Task Manager App"].map((idea) => (
              <li key={idea} className="text-xs flex items-center gap-2"
                style={{ color: "rgba(255,255,255,0.3)" }}>
                <span style={{ color: "#818cf8" }}>→</span> {idea}
              </li>
            ))}
          </ul>
        </DarkCard>
      </div>
    </div>
  );
}

export default ProjectsForm;
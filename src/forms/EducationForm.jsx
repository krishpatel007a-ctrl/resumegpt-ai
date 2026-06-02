import { useState } from "react";
import { useResume } from "../context/ResumeContext";
import {
  DarkCard, DarkInput, DarkSelect,
  SaveButton, TipsCard,
} from "../components/DarkFormComponents";

const emptyEdu = {
  id: Date.now(), school: "", degree: "",
  field: "", startDate: "", endDate: "",
  current: false, grade: "",
};

function EduCard({ edu, onUpdate, onDelete }) {
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    onUpdate(edu.id, { ...edu, [name]: type === "checkbox" ? checked : value });
  }

  return (
    <div className="rounded-2xl p-5 space-y-4" style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
    }}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">
          {edu.degree || "New Degree"}
          {edu.school ? ` — ${edu.school}` : ""}
        </p>
        <button onClick={() => onDelete(edu.id)}
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
        <DarkInput label="School / University *" name="school"
          value={edu.school} onChange={handleChange}
          placeholder="e.g. IIT Bombay" />
        <DarkSelect label="Degree *" name="degree"
          value={edu.degree} onChange={handleChange}>
          <option value="">Select degree</option>
          {["High School Diploma","Associate's Degree","Bachelor's Degree",
            "Master's Degree","MBA","PhD","Diploma","Certificate","Other"]
            .map((d) => <option key={d}>{d}</option>)}
        </DarkSelect>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <DarkInput label="Field of Study" name="field"
          value={edu.field} onChange={handleChange}
          placeholder="e.g. Computer Science" />
        <DarkInput label="Grade / GPA" name="grade"
          value={edu.grade} onChange={handleChange}
          placeholder="e.g. 8.5 CGPA" />
      </div>

      <div className="grid grid-cols-3 gap-3 items-end">
        <DarkInput label="Start Date" name="startDate" type="month"
          value={edu.startDate} onChange={handleChange} />
        <DarkInput label="End Date" name="endDate" type="month"
          value={edu.endDate} onChange={handleChange}
          disabled={edu.current} />
        <label className="flex items-center gap-2 text-sm cursor-pointer pb-1"
          style={{ color: "rgba(255,255,255,0.5)" }}>
          <input type="checkbox" name="current" checked={edu.current}
            onChange={handleChange} className="accent-indigo-500 w-4 h-4" />
          Studying
        </label>
      </div>
    </div>
  );
}

function EducationForm() {
  const { updateSection }         = useResume();
  const [entries, setEntries]     = useState([{ ...emptyEdu }]);

  function handleAdd() {
    setEntries((p) => [...p, { ...emptyEdu, id: Date.now() }]);
  }
  function handleUpdate(id, updated) {
    setEntries((p) => p.map((e) => e.id === id ? updated : e));
  }
  function handleDelete(id) {
    if (entries.length === 1) { alert("Need at least one entry!"); return; }
    setEntries((p) => p.filter((e) => e.id !== id));
  }
  function handleSave() {
    updateSection("education", entries);
    alert(`✅ ${entries.length} education entries saved!`);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Education</h3>
            <p className="text-xs mt-0.5"
              style={{ color: "rgba(255,255,255,0.3)" }}>
              {entries.length} {entries.length === 1 ? "entry" : "entries"} added
            </p>
          </div>
          <button onClick={handleAdd}
            className="px-4 py-2 rounded-xl text-sm font-semibold"
            style={{
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "#818cf8",
            }}>
            + Add Education
          </button>
        </div>

        {entries.map((edu, i) => (
          <div key={edu.id}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "rgba(255,255,255,0.2)" }}>
              Education {i + 1}
            </p>
            <EduCard edu={edu} onUpdate={handleUpdate} onDelete={handleDelete} />
          </div>
        ))}

        <SaveButton onClick={handleSave}>Save Education ✅</SaveButton>
      </div>

      <div className="space-y-4">
        <TipsCard title="💡 Education Tips" tips={[
          "List newest education first",
          "Include GPA only if above 7.5/10",
          "Add relevant certifications",
          "Field of study matters for tech jobs",
          "Online degrees count!",
        ]} />
        <DarkCard>
          <p className="text-sm font-semibold text-white mb-3">
            🎓 Popular Degrees
          </p>
          <div className="flex flex-wrap gap-2">
            {["B.Tech","B.E.","BCA","MCA","B.Sc","M.Sc",
              "MBA","M.Tech","BBA","Diploma","PhD"].map((d) => (
              <span key={d} className="text-xs font-medium px-2 py-1 rounded-lg"
                style={{
                  background: "rgba(99,102,241,0.15)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  color: "#a5b4fc",
                }}>
                {d}
              </span>
            ))}
          </div>
        </DarkCard>
      </div>
    </div>
  );
}

export default EducationForm;
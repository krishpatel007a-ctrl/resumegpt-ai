import { useState } from "react";
import { useResume } from "../context/ResumeContext";

const emptyEdu = {
  id: Date.now(),
  school: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  current: false,
  grade: "",
};

function EduCard({ edu, onUpdate, onDelete }) {
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    onUpdate(edu.id, {
      ...edu,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 
                    shadow-sm space-y-4">

      {/* Card Header */}
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-gray-700 text-sm">
          {edu.degree || "New Degree"}
          {edu.school ? ` — ${edu.school}` : ""}
        </h4>
        <button
          onClick={() => onDelete(edu.id)}
          className="text-red-400 hover:text-red-600 text-xs font-medium 
                     transition hover:bg-red-50 px-2 py-1 rounded-lg"
        >
          🗑️ Remove
        </button>
      </div>

      {/* Row 1 — School + Degree */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">
            School / University *
          </label>
          <input
            name="school"
            value={edu.school}
            onChange={handleChange}
            placeholder="e.g. IIT Bombay"
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       placeholder-gray-300 transition"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">
            Degree *
          </label>
          <select
            name="degree"
            value={edu.degree}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       text-gray-700 transition"
          >
            <option value="">Select degree</option>
            <option>High School Diploma</option>
            <option>Associate's Degree</option>
            <option>Bachelor's Degree</option>
            <option>Master's Degree</option>
            <option>MBA</option>
            <option>PhD</option>
            <option>Diploma</option>
            <option>Certificate</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* Row 2 — Field + Grade */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">
            Field of Study
          </label>
          <input
            name="field"
            value={edu.field}
            onChange={handleChange}
            placeholder="e.g. Computer Science"
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       placeholder-gray-300 transition"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">
            Grade / GPA (optional)
          </label>
          <input
            name="grade"
            value={edu.grade}
            onChange={handleChange}
            placeholder="e.g. 8.5 CGPA or 85%"
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       placeholder-gray-300 transition"
          />
        </div>
      </div>

      {/* Row 3 — Dates */}
      <div className="grid grid-cols-3 gap-3 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500">
            Start Date
          </label>
          <input
            name="startDate"
            type="month"
            value={edu.startDate}
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
            value={edu.endDate}
            onChange={handleChange}
            disabled={edu.current}
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
            checked={edu.current}
            onChange={handleChange}
            className="accent-indigo-600 w-4 h-4"
          />
          Currently Studying
        </label>
      </div>

    </div>
  );
}
function EducationForm() {
  const { updateSection } = useResume();
  const [entries, setEntries] = useState([{ ...emptyEdu }]);

  function handleAdd() {
    setEntries((prev) => [...prev, { ...emptyEdu, id: Date.now() }]);
  }

  function handleUpdate(id, updated) {
    setEntries((prev) => prev.map((e) => (e.id === id ? updated : e)));
  }

  function handleDelete(id) {
    if (entries.length === 1) {
      alert("You need at least one education entry!");
      return;
    }
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function handleSave() {
    updateSection("education", entries);
    alert(`✅ ${entries.length} education ${entries.length === 1 ? "entry" : "entries"} saved!`);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* LEFT — Forms */}
      <div className="lg:col-span-2 space-y-4">

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Education</h3>
            <p className="text-sm text-gray-400 mt-0.5">
              {entries.length} {entries.length === 1 ? "entry" : "entries"} added
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-indigo-50 text-indigo-600 border border-indigo-200 
                       px-4 py-2 rounded-xl text-sm font-semibold 
                       hover:bg-indigo-100 transition"
          >
            + Add Another
          </button>
        </div>

        {entries.map((edu, index) => (
          <div key={edu.id}>
            <p className="text-xs font-semibold text-gray-400 
                          uppercase tracking-widest mb-2">
              Education {index + 1}
            </p>
            <EduCard
              edu={edu}
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
          Save Education ✅
        </button>

      </div>

      {/* RIGHT — Tips */}
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 
                        rounded-2xl p-5 sticky top-8">
          <p className="text-sm font-semibold text-amber-700 mb-3">
            💡 Education Tips
          </p>
          <ul className="text-xs text-amber-600 space-y-2">
            <li>✓ List newest education first</li>
            <li>✓ Include GPA only if above 7.5/10</li>
            <li>✓ Add relevant certifications too</li>
            <li>✓ Field of study matters for tech jobs</li>
            <li>✓ Include online degrees — they count!</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            🎓 Popular Degrees
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "B.Tech","B.E.","BCA","MCA",
              "B.Sc","M.Sc","MBA","M.Tech",
              "BBA","Diploma","PhD",
            ].map((d) => (
              <span key={d}
                className="bg-indigo-50 text-indigo-600 text-xs 
                           font-medium px-2 py-1 rounded-lg">
                {d}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default EducationForm;
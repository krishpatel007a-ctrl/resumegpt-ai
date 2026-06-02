import { useState } from "react";
import { useResume } from "../context/ResumeContext";

const defaultData = {
  fullName: "", jobTitle: "", email: "",
  phone: "", location: "", linkedin: "",
  github: "", website: "",
};

function DarkInput({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: "rgba(255,255,255,0.4)" }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm font-medium"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#e2e8f0",
        }}
      />
    </div>
  );
}

function PreviewCard({ data }) {
  return (
    <div
      className="rounded-2xl p-6 sticky top-24"
      style={{
        background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(167,139,250,0.1))",
        border: "1px solid rgba(99,102,241,0.3)",
        backdropFilter: "blur(12px)",
      }}
    >
      <p className="text-xs font-bold uppercase tracking-widest mb-4"
        style={{ color: "rgba(167,139,250,0.7)" }}>
        👁️ Live Preview
      </p>

      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white">
          {data.fullName || "Your Name"}
        </h2>
        <p className="text-sm font-medium mt-1" style={{ color: "#a78bfa" }}>
          {data.jobTitle || "Your Job Title"}
        </p>
      </div>

      <div className="space-y-2">
        {[
          { icon: "📧", val: data.email },
          { icon: "📞", val: data.phone },
          { icon: "📍", val: data.location },
          { icon: "💼", val: data.linkedin },
          { icon: "🐙", val: data.github },
          { icon: "🌐", val: data.website },
        ].map(({ icon, val }) =>
          val ? (
            <p key={icon} className="text-xs flex items-center gap-2"
              style={{ color: "rgba(255,255,255,0.5)" }}>
              <span>{icon}</span>
              <span className="truncate">{val}</span>
            </p>
          ) : null
        )}
      </div>

      {!data.email && !data.phone && !data.location && (
        <p className="text-xs italic mt-2"
          style={{ color: "rgba(255,255,255,0.25)" }}>
          Start typing to see preview...
        </p>
      )}

      {/* Tips */}
      <div className="mt-6 pt-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <p className="text-xs font-semibold mb-2" style={{ color: "#f59e0b" }}>
          💡 Pro Tips
        </p>
        <ul className="space-y-1.5">
          {[
            "Use a professional email",
            "Add LinkedIn — recruiters check it",
            "Location helps with local jobs",
            "GitHub is a must for tech roles",
          ].map((tip) => (
            <li key={tip} className="text-xs flex items-start gap-1.5"
              style={{ color: "rgba(255,255,255,0.3)" }}>
              <span className="text-emerald-400 mt-0.5">✓</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PersonalInfoForm() {
  const { updateSection }             = useResume();
  const [formData, setFormData]       = useState(defaultData);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    updateSection("personal", formData);
    alert("✅ Personal info saved to resume!");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* LEFT — Form */}
      <div className="rounded-2xl p-6 space-y-5" style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
      }}>
        {/* Header */}
        <div>
          <h3 className="text-base font-bold text-white">
            Personal Information
          </h3>
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
            This appears at the top of your resume
          </p>
        </div>

        <hr className="section-divider" />

        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <DarkInput label="Full Name *" name="fullName"
            value={formData.fullName} onChange={handleChange}
            placeholder="John Doe" />
          <DarkInput label="Job Title *" name="jobTitle"
            value={formData.jobTitle} onChange={handleChange}
            placeholder="Software Engineer" />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          <DarkInput label="Email *" name="email" type="email"
            value={formData.email} onChange={handleChange}
            placeholder="john@example.com" />
          <DarkInput label="Phone" name="phone"
            value={formData.phone} onChange={handleChange}
            placeholder="+91 98765 43210" />
        </div>

        {/* Row 3 */}
        <DarkInput label="Location" name="location"
          value={formData.location} onChange={handleChange}
          placeholder="Ahmedabad, Gujarat, India" />

        {/* Online Presence */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "rgba(255,255,255,0.25)" }}>
            Online Presence
          </p>
          <div className="space-y-3">
            <DarkInput label="LinkedIn URL" name="linkedin"
              value={formData.linkedin} onChange={handleChange}
              placeholder="linkedin.com/in/johndoe" />
            <DarkInput label="GitHub URL" name="github"
              value={formData.github} onChange={handleChange}
              placeholder="github.com/johndoe" />
            <DarkInput label="Portfolio / Website" name="website"
              value={formData.website} onChange={handleChange}
              placeholder="johndoe.com" />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-3 rounded-xl font-semibold text-sm 
                     text-white btn-primary"
        >
          Save Personal Info ✅
        </button>
      </div>

      {/* RIGHT — Preview */}
      <div>
        <PreviewCard data={formData} />
      </div>
    </div>
  );
}

export default PersonalInfoForm;
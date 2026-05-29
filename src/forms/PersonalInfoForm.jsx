import { useState } from "react";
import { useResume } from "../context/ResumeContext";
const defaultData = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  website: "",
};

// Reusable Input Field component
function InputField({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-600">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 
                   placeholder-gray-300 transition"
      />
    </div>
  );
}

// Live Preview Card
function PreviewCard({ data }) {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-blue-500 
                    rounded-2xl p-6 text-white shadow-lg sticky top-8">

      <p className="text-xs font-semibold uppercase tracking-widest 
                    text-indigo-200 mb-4">
        Live Preview 👁️
      </p>

      <h2 className="text-2xl font-bold">
        {data.fullName || "Your Name"}
      </h2>
      <p className="text-indigo-200 font-medium mt-1">
        {data.jobTitle || "Your Job Title"}
      </p>

      <div className="mt-4 space-y-1.5 text-sm text-indigo-100">
        {data.email && (
          <p>📧 {data.email}</p>
        )}
        {data.phone && (
          <p>📞 {data.phone}</p>
        )}
        {data.location && (
          <p>📍 {data.location}</p>
        )}
        {data.linkedin && (
          <p>💼 {data.linkedin}</p>
        )}
        {data.github && (
          <p>🐙 {data.github}</p>
        )}
        {data.website && (
          <p>🌐 {data.website}</p>
        )}
      </div>

      {/* Empty state */}
      {!data.email && !data.phone && !data.location && (
        <p className="text-indigo-300 text-sm mt-4 italic">
          Start typing to see your info here...
        </p>
      )}

    </div>
  );
}

// Main Form Component
function PersonalInfoForm() {
  const { updateSection } = useResume();
  const [formData, setFormData] = useState(defaultData);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    updateSection("personal", formData);
    alert("✅ Personal info saved to resume!");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

      {/* LEFT — Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        <h3 className="text-lg font-bold text-gray-800 mb-6">
          Personal Information
        </h3>

        <div className="space-y-4">

          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Full Name *"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
            />
            <InputField
              label="Job Title *"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Software Engineer"
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Email *"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              type="email"
            />
            <InputField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
            />
          </div>

          {/* Row 3 */}
          <InputField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ahmedabad, Gujarat, India"
          />

          {/* Divider */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-semibold text-gray-400 
                          uppercase tracking-widest mb-4">
              Online Presence
            </p>

            <div className="space-y-4">
              <InputField
                label="LinkedIn URL"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="linkedin.com/in/johndoe"
              />
              <InputField
                label="GitHub URL"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="github.com/johndoe"
              />
              <InputField
                label="Portfolio / Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="johndoe.com"
              />
            </div>
          </div>

        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-xl 
                     font-semibold hover:bg-indigo-700 transition text-sm"
        >
          Save Personal Info ✅
        </button>

      </div>

      {/* RIGHT — Live Preview */}
      <div>
        <PreviewCard data={formData} />

        {/* Tips Card */}
        <div className="mt-4 bg-amber-50 border border-amber-200 
                        rounded-2xl p-5">
          <p className="text-sm font-semibold text-amber-700 mb-2">
            💡 Pro Tips
          </p>
          <ul className="text-xs text-amber-600 space-y-1.5">
            <li>✓ Use a professional email (avoid nicknames)</li>
            <li>✓ Add LinkedIn — recruiters check it first</li>
            <li>✓ Location helps with local job matches</li>
            <li>✓ GitHub is a must for tech roles</li>
          </ul>
        </div>
      </div>

    </div>
  );
}

export default PersonalInfoForm;
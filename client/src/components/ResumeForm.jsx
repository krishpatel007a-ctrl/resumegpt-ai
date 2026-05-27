function ResumeForm({ resumeData, setResumeData }) {
  const handleChange = (e) => {
    setResumeData({
      ...resumeData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClass =
    "w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-purple-500";

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Resume Details</h2>

      <div className="space-y-4">
        <input name="name" value={resumeData.name} onChange={handleChange} type="text" placeholder="Full Name" className={inputClass} />

        <input name="title" value={resumeData.title} onChange={handleChange} type="text" placeholder="Job Title" className={inputClass} />

        <input name="email" value={resumeData.email} onChange={handleChange} type="email" placeholder="Email Address" className={inputClass} />

        <input name="phone" value={resumeData.phone} onChange={handleChange} type="text" placeholder="Phone Number" className={inputClass} />

        <textarea name="summary" value={resumeData.summary} onChange={handleChange} rows="5" placeholder="Professional Summary" className={inputClass}></textarea>

        <textarea name="skills" value={resumeData.skills} onChange={handleChange} rows="3" placeholder="Skills: React, JavaScript, Tailwind" className={inputClass}></textarea>

        <button className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500">
          Generate With AI ✨
        </button>
      </div>
    </div>
  );
}

export default ResumeForm;
function ResumePreview({ resumeData }) {
  const skillsArray = resumeData.skills
    ? resumeData.skills.split(",").map((skill) => skill.trim())
    : ["React", "Tailwind", "JavaScript"];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">
        {resumeData.name || "Your Name"}
      </h1>

      <p className="text-gray-600 mb-2">
        {resumeData.title || "Your Job Title"}
      </p>

      <p className="text-gray-500 mb-6">
        {resumeData.email || "email@example.com"} | {resumeData.phone || "+91 00000 00000"}
      </p>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2 border-b pb-1">
          Professional Summary
        </h2>

        <p className="text-gray-700 leading-7">
          {resumeData.summary ||
            "Write your professional summary here. It will update live as you type."}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2 border-b pb-1">Skills</h2>

        <div className="flex gap-3 flex-wrap">
          {skillsArray.map((skill, index) => (
            <span key={index} className="px-4 py-2 bg-gray-200 rounded-xl">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
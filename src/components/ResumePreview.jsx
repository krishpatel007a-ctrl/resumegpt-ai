import { forwardRef } from "react";

const ResumePreview = forwardRef(({ data }, ref) => {
  const { personal, summary, experience, education, skills, projects } = data;

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

  return (
    <div
      ref={ref}
      className="bg-white w-full max-w-3xl mx-auto shadow-2xl"
      style={{ fontFamily: "Georgia, serif", fontSize: "13px", lineHeight: "1.5" }}
    >

      {/* ── HEADER ── */}
      <div className="bg-indigo-700 text-white px-10 py-8">
        <h1 style={{ fontSize: "26px", fontWeight: "bold", letterSpacing: "1px" }}>
          {personal.fullName || "Your Name"}
        </h1>
        <p style={{ fontSize: "14px", marginTop: "4px", opacity: 0.85 }}>
          {personal.jobTitle || "Your Job Title"}
        </p>

        {/* Contact Row */}
        <div className="flex flex-wrap gap-4 mt-4"
          style={{ fontSize: "11px", opacity: 0.9 }}>
          {personal.email    && <span>📧 {personal.email}</span>}
          {personal.phone    && <span>📞 {personal.phone}</span>}
          {personal.location && <span>📍 {personal.location}</span>}
          {personal.linkedin && <span>💼 {personal.linkedin}</span>}
          {personal.github   && <span>🐙 {personal.github}</span>}
          {personal.website  && <span>🌐 {personal.website}</span>}
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="px-10 py-8 space-y-6">

        {/* SUMMARY */}
        {summary && (
          <section>
            <SectionTitle title="Professional Summary" />
            <p style={{ color: "#374151" }}>{summary}</p>
          </section>
        )}

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <section>
            <SectionTitle title="Work Experience" />
            <div className="space-y-4">
              {experience.map((job) => (
                <div key={job.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p style={{ fontWeight: "bold", color: "#1f2937" }}>
                        {job.position}
                      </p>
                      <p style={{ color: "#4f46e5", fontSize: "12px" }}>
                        {job.company}
                      </p>
                    </div>
                    <p style={{ fontSize: "11px", color: "#6b7280" }}>
                      {job.startDate} — {job.current ? "Present" : job.endDate}
                    </p>
                  </div>
                  {job.description && (
                    <div style={{ marginTop: "6px", color: "#374151" }}>
                      {job.description.split("\n").map((line, i) => (
                        <p key={i} style={{ marginBottom: "2px" }}>{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <section>
            <SectionTitle title="Education" />
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <p style={{ fontWeight: "bold", color: "#1f2937" }}>
                      {edu.degree} {edu.field ? `in ${edu.field}` : ""}
                    </p>
                    <p style={{ color: "#4f46e5", fontSize: "12px" }}>
                      {edu.school}
                      {edu.grade ? ` • ${edu.grade}` : ""}
                    </p>
                  </div>
                  <p style={{ fontSize: "11px", color: "#6b7280" }}>
                    {edu.startDate} — {edu.current ? "Present" : edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <section>
            <SectionTitle title="Skills" />
            <div className="space-y-2">
              {Object.entries(groupedSkills).map(([cat, names]) => (
                <div key={cat} className="flex gap-2">
                  <span style={{
                    fontWeight: "bold", color: "#1f2937",
                    minWidth: "120px", fontSize: "12px"
                  }}>
                    {cat}:
                  </span>
                  <span style={{ color: "#374151", fontSize: "12px" }}>
                    {names.join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {projects.length > 0 && (
          <section>
            <SectionTitle title="Projects" />
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p style={{ fontWeight: "bold", color: "#1f2937" }}>
                        {project.name}
                      </p>
                      {project.techStack && (
                        <p style={{ color: "#4f46e5", fontSize: "11px" }}>
                          {project.techStack}
                        </p>
                      )}
                    </div>
                    <div style={{ fontSize: "11px", color: "#6b7280", textAlign: "right" }}>
                      {project.liveUrl  && <p>🌐 {project.liveUrl}</p>}
                      {project.githubUrl && <p>🐙 {project.githubUrl}</p>}
                    </div>
                  </div>
                  {project.description && (
                    <div style={{ marginTop: "6px", color: "#374151" }}>
                      {project.description.split("\n").map((line, i) => (
                        <p key={i} style={{ marginBottom: "2px" }}>{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
});

function SectionTitle({ title }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <h2 style={{
        fontSize: "13px", fontWeight: "bold",
        textTransform: "uppercase", letterSpacing: "1.5px",
        color: "#4f46e5",
      }}>
        {title}
      </h2>
      <div style={{ borderBottom: "2px solid #4f46e5", marginTop: "3px" }} />
    </div>
  );
}

ResumePreview.displayName = "ResumePreview";
export default ResumePreview;
import { forwardRef } from "react";

const ClassicTemplate = forwardRef(({ data }, ref) => {
  const { personal, summary, experience, education, skills, projects } = data;

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

  return (
    <div
      ref={ref}
      style={{
        fontFamily: "Georgia, serif",
        fontSize: "13px",
        lineHeight: "1.6",
        color: "#111",
        background: "#fff",
        padding: "48px",
        maxWidth: "780px",
        margin: "0 auto",
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", borderBottom: "2px solid #111", paddingBottom: "16px", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", margin: 0 }}>
          {personal.fullName || "Your Name"}
        </h1>
        <p style={{ fontSize: "13px", color: "#444", marginTop: "6px" }}>
          {personal.jobTitle}
        </p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "16px", marginTop: "8px", fontSize: "11px", color: "#555" }}>
          {personal.email    && <span>{personal.email}</span>}
          {personal.phone    && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github   && <span>{personal.github}</span>}
        </div>
      </div>

      {/* SUMMARY */}
      {summary && (
        <Section title="PROFESSIONAL SUMMARY">
          <p>{summary}</p>
        </Section>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <Section title="WORK EXPERIENCE">
          {experience.map((job) => (
            <div key={job.id} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{job.position} — {job.company}</strong>
                <span style={{ fontSize: "11px", color: "#555" }}>
                  {job.startDate} – {job.current ? "Present" : job.endDate}
                </span>
              </div>
              {job.description && (
                <div style={{ marginTop: "4px" }}>
                  {job.description.split("\n").map((line, i) => (
                    <p key={i} style={{ margin: "2px 0" }}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <Section title="EDUCATION">
          {education.map((edu) => (
            <div key={edu.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <div>
                <strong>{edu.degree} {edu.field ? `in ${edu.field}` : ""}</strong>
                <p style={{ margin: "2px 0", color: "#444" }}>
                  {edu.school} {edu.grade ? `• ${edu.grade}` : ""}
                </p>
              </div>
              <span style={{ fontSize: "11px", color: "#555" }}>
                {edu.startDate} – {edu.current ? "Present" : edu.endDate}
              </span>
            </div>
          ))}
        </Section>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <Section title="SKILLS">
          {Object.entries(groupedSkills).map(([cat, names]) => (
            <div key={cat} style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
              <strong style={{ minWidth: "130px", fontSize: "12px" }}>{cat}:</strong>
              <span style={{ color: "#333", fontSize: "12px" }}>{names.join(", ")}</span>
            </div>
          ))}
        </Section>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <Section title="PROJECTS">
          {projects.map((project) => (
            <div key={project.id} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{project.name}</strong>
                <span style={{ fontSize: "11px", color: "#555" }}>
                  {project.techStack}
                </span>
              </div>
              {project.description && (
                <div style={{ marginTop: "4px" }}>
                  {project.description.split("\n").map((line, i) => (
                    <p key={i} style={{ margin: "2px 0" }}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

    </div>
  );
});

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <h2 style={{
        fontSize: "11px", fontWeight: "bold",
        letterSpacing: "2px", textTransform: "uppercase",
        borderBottom: "1px solid #111",
        paddingBottom: "3px", marginBottom: "10px",
        color: "#111",
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

ClassicTemplate.displayName = "ClassicTemplate";
export default ClassicTemplate;
import { forwardRef } from "react";

const MinimalTemplate = forwardRef(({ data }, ref) => {
  const { personal, summary, experience, education, skills, projects } = data;

  const allSkills = skills.map((s) => s.name);

  return (
    <div
      ref={ref}
      style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontSize: "13px",
        lineHeight: "1.7",
        color: "#222",
        background: "#fff",
        padding: "52px 56px",
        maxWidth: "780px",
        margin: "0 auto",
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{
          fontSize: "32px", fontWeight: "300",
          letterSpacing: "3px", margin: 0,
          textTransform: "uppercase", color: "#111",
        }}>
          {personal.fullName || "Your Name"}
        </h1>
        <p style={{ fontSize: "13px", color: "#888", marginTop: "4px", letterSpacing: "1px" }}>
          {personal.jobTitle}
        </p>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "20px",
          marginTop: "12px", fontSize: "11px", color: "#666",
        }}>
          {personal.email    && <span>{personal.email}</span>}
          {personal.phone    && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github   && <span>{personal.github}</span>}
        </div>
        <div style={{ borderBottom: "1px solid #e5e7eb", marginTop: "20px" }} />
      </div>

      {/* SUMMARY */}
      {summary && (
        <MinSection title="Summary">
          <p style={{ color: "#444", fontStyle: "italic" }}>{summary}</p>
        </MinSection>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <MinSection title="Experience">
          {experience.map((job) => (
            <div key={job.id} style={{ marginBottom: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontWeight: "600", color: "#111" }}>{job.position}</span>
                  <span style={{ color: "#888", margin: "0 8px" }}>·</span>
                  <span style={{ color: "#555" }}>{job.company}</span>
                </div>
                <span style={{ fontSize: "11px", color: "#999" }}>
                  {job.startDate} – {job.current ? "Present" : job.endDate}
                </span>
              </div>
              {job.description && (
                <div style={{ marginTop: "6px", color: "#444", paddingLeft: "0" }}>
                  {job.description.split("\n").map((line, i) => (
                    <p key={i} style={{ margin: "2px 0" }}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </MinSection>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <MinSection title="Education">
          {education.map((edu) => (
            <div key={edu.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <div>
                <span style={{ fontWeight: "600", color: "#111" }}>
                  {edu.degree} {edu.field ? `in ${edu.field}` : ""}
                </span>
                <span style={{ color: "#888", margin: "0 8px" }}>·</span>
                <span style={{ color: "#555" }}>
                  {edu.school} {edu.grade ? `(${edu.grade})` : ""}
                </span>
              </div>
              <span style={{ fontSize: "11px", color: "#999" }}>
                {edu.startDate} – {edu.current ? "Present" : edu.endDate}
              </span>
            </div>
          ))}
        </MinSection>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <MinSection title="Skills">
          <p style={{ color: "#444", lineHeight: "1.8" }}>
            {allSkills.join("   ·   ")}
          </p>
        </MinSection>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <MinSection title="Projects">
          {projects.map((project) => (
            <div key={project.id} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "600", color: "#111" }}>{project.name}</span>
                <span style={{ fontSize: "11px", color: "#888" }}>{project.techStack}</span>
              </div>
              {project.description && (
                <div style={{ marginTop: "4px", color: "#444" }}>
                  {project.description.split("\n").map((line, i) => (
                    <p key={i} style={{ margin: "2px 0" }}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </MinSection>
      )}

    </div>
  );
});

function MinSection({ title, children }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h2 style={{
        fontSize: "10px", fontWeight: "700",
        letterSpacing: "3px", textTransform: "uppercase",
        color: "#999", marginBottom: "12px",
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

MinimalTemplate.displayName = "MinimalTemplate";
export default MinimalTemplate;
import { forwardRef } from "react";

const ModernTemplate = forwardRef(({ data }, ref) => {
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
        fontFamily: "'Arial', sans-serif",
        fontSize: "13px",
        lineHeight: "1.6",
        background: "#fff",
        maxWidth: "780px",
        margin: "0 auto",
        display: "flex",
        minHeight: "1000px",
      }}
    >
      {/* LEFT SIDEBAR */}
      <div style={{
        width: "260px", minWidth: "260px",
        background: "#4f46e5", color: "#fff",
        padding: "36px 24px",
      }}>
        {/* Name */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "bold", margin: 0, lineHeight: 1.2 }}>
            {personal.fullName || "Your Name"}
          </h1>
          <p style={{ fontSize: "12px", opacity: 0.8, marginTop: "6px" }}>
            {personal.jobTitle}
          </p>
        </div>

        {/* Contact */}
        <SideSection title="CONTACT">
          {personal.email    && <SideItem icon="📧" text={personal.email} />}
          {personal.phone    && <SideItem icon="📞" text={personal.phone} />}
          {personal.location && <SideItem icon="📍" text={personal.location} />}
          {personal.linkedin && <SideItem icon="💼" text={personal.linkedin} />}
          {personal.github   && <SideItem icon="🐙" text={personal.github} />}
          {personal.website  && <SideItem icon="🌐" text={personal.website} />}
        </SideSection>

        {/* Skills */}
        {skills.length > 0 && (
          <SideSection title="SKILLS">
            {Object.entries(groupedSkills).map(([cat, names]) => (
              <div key={cat} style={{ marginBottom: "8px" }}>
                <p style={{ fontSize: "10px", opacity: 0.7, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                  {cat}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {names.map((name) => (
                    <span key={name} style={{
                      background: "rgba(255,255,255,0.15)",
                      borderRadius: "4px", padding: "2px 8px",
                      fontSize: "11px",
                    }}>
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </SideSection>
        )}
      </div>

      {/* RIGHT CONTENT */}
      <div style={{ flex: 1, padding: "36px 32px" }}>

        {/* Summary */}
        {summary && (
          <MainSection title="About Me">
            <p style={{ color: "#374151" }}>{summary}</p>
          </MainSection>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <MainSection title="Work Experience">
            {experience.map((job) => (
              <div key={job.id} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontWeight: "bold", color: "#1f2937", margin: 0 }}>{job.position}</p>
                    <p style={{ color: "#4f46e5", fontSize: "12px", margin: "2px 0" }}>{job.company}</p>
                  </div>
                  <span style={{ fontSize: "11px", color: "#6b7280", whiteSpace: "nowrap" }}>
                    {job.startDate} – {job.current ? "Present" : job.endDate}
                  </span>
                </div>
                {job.description && (
                  <div style={{ marginTop: "6px", color: "#374151" }}>
                    {job.description.split("\n").map((line, i) => (
                      <p key={i} style={{ margin: "2px 0" }}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </MainSection>
        )}

        {/* Education */}
        {education.length > 0 && (
          <MainSection title="Education">
            {education.map((edu) => (
              <div key={edu.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <div>
                  <p style={{ fontWeight: "bold", color: "#1f2937", margin: 0 }}>
                    {edu.degree} {edu.field ? `in ${edu.field}` : ""}
                  </p>
                  <p style={{ color: "#4f46e5", fontSize: "12px", margin: "2px 0" }}>
                    {edu.school} {edu.grade ? `• ${edu.grade}` : ""}
                  </p>
                </div>
                <span style={{ fontSize: "11px", color: "#6b7280" }}>
                  {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                </span>
              </div>
            ))}
          </MainSection>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <MainSection title="Projects">
            {projects.map((project) => (
              <div key={project.id} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p style={{ fontWeight: "bold", color: "#1f2937", margin: 0 }}>{project.name}</p>
                  <span style={{ fontSize: "11px", color: "#4f46e5" }}>{project.techStack}</span>
                </div>
                {project.description && (
                  <div style={{ marginTop: "4px", color: "#374151" }}>
                    {project.description.split("\n").map((line, i) => (
                      <p key={i} style={{ margin: "2px 0" }}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </MainSection>
        )}

      </div>
    </div>
  );
});

function SideSection({ title, children }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h2 style={{
        fontSize: "10px", fontWeight: "bold",
        letterSpacing: "2px", opacity: 0.6,
        borderBottom: "1px solid rgba(255,255,255,0.3)",
        paddingBottom: "4px", marginBottom: "10px",
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function SideItem({ icon, text }) {
  return (
    <p style={{ fontSize: "11px", marginBottom: "6px", opacity: 0.9, wordBreak: "break-all" }}>
      {icon} {text}
    </p>
  );
}

function MainSection({ title, children }) {
  return (
    <div style={{ marginBottom: "22px" }}>
      <h2 style={{
        fontSize: "14px", fontWeight: "bold",
        color: "#4f46e5", borderBottom: "2px solid #4f46e5",
        paddingBottom: "4px", marginBottom: "12px",
        textTransform: "uppercase", letterSpacing: "1px",
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

ModernTemplate.displayName = "ModernTemplate";
export default ModernTemplate;
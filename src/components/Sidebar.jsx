const sections = [
  { id: "personal",   label: "Personal Info",   icon: "👤", desc: "Your basic details" },
  { id: "summary",    label: "Summary",          icon: "📝", desc: "Professional overview" },
  { id: "experience", label: "Work Experience",  icon: "💼", desc: "Jobs & roles" },
  { id: "education",  label: "Education",        icon: "🎓", desc: "Degrees & courses" },
  { id: "skills",     label: "Skills",           icon: "🛠️", desc: "Your tech stack" },
  { id: "projects",   label: "Projects",         icon: "🚀", desc: "What you've built" },
];

function Sidebar({ activeSection, setActiveSection }) {
  return (
    <aside
      className="w-64 min-h-screen flex-shrink-0 py-6 px-3"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Header */}
      <div className="px-3 mb-6">
        <p className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.25)" }}>
          Resume Sections
        </p>
        <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.15)" }}>
          Fill each section completely
        </p>
      </div>

      {/* Progress Bar */}
      <div className="px-3 mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-xs text-slate-500">Completion</span>
          <span className="text-xs font-semibold text-indigo-400">
            {Math.round((sections.indexOf(
              sections.find(s => s.id === activeSection)
            ) + 1) / sections.length * 100)}%
          </span>
        </div>
        <div className="h-1 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.07)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${((sections.indexOf(
                sections.find(s => s.id === activeSection)
              ) + 1) / sections.length * 100)}%`,
              background: "linear-gradient(90deg, #6366f1, #a78bfa)",
            }}
          />
        </div>
      </div>

      {/* Divider */}
      <hr className="section-divider mx-3" />

      {/* Section Links */}
      <ul className="space-y-1">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          return (
            <li key={section.id}>
              <button
                onClick={() => setActiveSection(section.id)}
                className="w-full text-left px-3 py-3 rounded-xl 
                           flex items-center gap-3 group transition-all 
                           duration-200 card-hover"
                style={isActive ? {
                  background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(167,139,250,0.1))",
                  border: "1px solid rgba(99,102,241,0.3)",
                  boxShadow: "0 4px 15px rgba(99,102,241,0.15)",
                } : {
                  background: "transparent",
                  border: "1px solid transparent",
                }}
              >
                {/* Step Number / Icon */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center 
                             justify-center text-sm flex-shrink-0 
                             transition-all duration-200"
                  style={isActive ? {
                    background: "linear-gradient(135deg, #6366f1, #a78bfa)",
                    boxShadow: "0 4px 10px rgba(99,102,241,0.4)",
                  } : {
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="text-base">{section.icon}</span>
                </div>

                {/* Label + Desc */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold transition-colors
                    ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
                    {section.label}
                  </p>
                  <p className="text-xs truncate"
                    style={{ color: "rgba(255,255,255,0.2)" }}>
                    {section.desc}
                  </p>
                </div>

                {/* Active indicator dot */}
                {isActive && (
                  <div className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      background: "#a78bfa",
                      boxShadow: "0 0 6px #a78bfa",
                    }} />
                )}

                {/* Step number badge */}
                {!isActive && (
                  <span className="text-xs font-bold flex-shrink-0"
                    style={{ color: "rgba(255,255,255,0.15)" }}>
                    {index + 1}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* ── Bottom Card ── */}
      <div className="mx-3 mt-8 p-4 rounded-xl"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(167,139,250,0.08))",
          border: "1px solid rgba(99,102,241,0.2)",
        }}
      >
        <p className="text-xs font-bold text-indigo-300 mb-1">
          💡 Pro Tip
        </p>
        <p className="text-xs leading-relaxed"
          style={{ color: "rgba(255,255,255,0.4)" }}>
          Fill all sections and save before previewing your resume!
        </p>
      </div>

    </aside>
  );
}

export default Sidebar;
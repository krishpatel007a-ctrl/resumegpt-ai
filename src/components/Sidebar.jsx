const sections = [
  { id: "personal",    label: "👤 Personal Info",   },
  { id: "summary",     label: "📝 Summary",          },
  { id: "experience",  label: "💼 Work Experience",  },
  { id: "education",   label: "🎓 Education",        },
  { id: "skills",      label: "🛠️ Skills",           },
  { id: "projects",    label: "🚀 Projects",         },
];

function Sidebar({ activeSection, setActiveSection }) {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-6 shadow-sm">

      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
        Resume Sections
      </p>

      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm transition
                ${activeSection === section.id
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>

    </aside>
  );
}

export default Sidebar;
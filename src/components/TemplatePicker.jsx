const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional, ATS-friendly",
    emoji: "📄",
    colors: ["#111", "#fff", "#333"],
  },
  {
    id: "modern",
    name: "Modern",
    description: "Sidebar layout, creative",
    emoji: "🎨",
    colors: ["#4f46e5", "#fff", "#e0e7ff"],
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, elegant, spacious",
    emoji: "🌿",
    colors: ["#fff", "#111", "#f9fafb"],
  },
];

function TemplatePicker({ selected, onSelect }) {
  return (
    <div className="bg-white border-b border-gray-100 px-6 py-4 
                    flex items-center gap-4 shadow-sm">

      <p className="text-sm font-semibold text-gray-500 whitespace-nowrap">
        Choose Template:
      </p>

      <div className="flex gap-3">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl 
                        border-2 text-sm font-medium transition
              ${selected === t.id
                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                : "border-gray-200 text-gray-600 hover:border-indigo-300 hover:bg-gray-50"
              }`}
          >
            {/* Mini color preview */}
            <div className="flex gap-0.5">
              {t.colors.map((color, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: color }}
                  className="w-3 h-3 rounded-sm border border-gray-200"
                />
              ))}
            </div>
            <span>{t.emoji} {t.name}</span>
            {selected === t.id && (
              <span className="text-indigo-500 text-xs">✓</span>
            )}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 ml-2">
        {templates.find((t) => t.id === selected)?.description}
      </p>

    </div>
  );
}

export default TemplatePicker;
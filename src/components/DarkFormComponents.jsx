/* ── Shared dark-theme form components used across all forms ── */

export function DarkCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl p-6 ${className}`}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
      }}
    >
      {children}
    </div>
  );
}

export function DarkInput({
  label, name, value, onChange,
  placeholder, type = "text", disabled = false,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.4)" }}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-4 py-3 rounded-xl text-sm font-medium 
                   disabled:opacity-40"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#e2e8f0",
        }}
      />
    </div>
  );
}

export function DarkTextarea({
  label, name, value, onChange, placeholder, rows = 4,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.4)" }}>
          {label}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 rounded-xl text-sm resize-none"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#e2e8f0",
        }}
      />
    </div>
  );
}

export function DarkSelect({ label, name, value, onChange, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.4)" }}>
          {label}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl text-sm font-medium"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#e2e8f0",
        }}
      >
        {children}
      </select>
    </div>
  );
}

export function PrimaryButton({ onClick, disabled, loading, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full py-3 rounded-xl font-semibold text-sm text-white 
                 flex items-center justify-center gap-2 transition-all"
      style={disabled || loading ? {
        background: "rgba(99,102,241,0.3)",
        cursor: "not-allowed",
      } : {
        background: "linear-gradient(135deg, #6366f1, #4f46e5)",
        boxShadow: "0 4px 15px rgba(99,102,241,0.4)",
      }}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white 
                         border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}

export function SaveButton({ onClick, children = "Save ✅" }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 rounded-xl font-semibold text-sm text-white 
                 transition-all"
      style={{
        background: "linear-gradient(135deg, #10b981, #059669)",
        boxShadow: "0 4px 15px rgba(16,185,129,0.3)",
      }}
    >
      {children}
    </button>
  );
}

export function ErrorBox({ message }) {
  if (!message) return null;
  return (
    <div className="px-4 py-3 rounded-xl text-sm" style={{
      background: "rgba(239,68,68,0.1)",
      border: "1px solid rgba(239,68,68,0.3)",
      color: "#fca5a5",
    }}>
      ⚠️ {message}
    </div>
  );
}

export function SectionHeader({ title, desc }) {
  return (
    <div>
      <h3 className="text-base font-bold text-white">{title}</h3>
      {desc && (
        <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
          {desc}
        </p>
      )}
    </div>
  );
}

export function TipsCard({ title = "💡 Tips", tips, color = "amber" }) {
  const colors = {
    amber: {
      bg: "rgba(245,158,11,0.08)",
      border: "rgba(245,158,11,0.2)",
      title: "#fbbf24",
      dot: "text-amber-400",
    },
    indigo: {
      bg: "rgba(99,102,241,0.08)",
      border: "rgba(99,102,241,0.2)",
      title: "#818cf8",
      dot: "text-indigo-400",
    },
  };
  const c = colors[color] || colors.amber;

  return (
    <div className="rounded-2xl p-5" style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
    }}>
      <p className="text-sm font-semibold mb-3" style={{ color: c.title }}>
        {title}
      </p>
      <ul className="space-y-2">
        {tips.map((tip) => (
          <li key={tip} className="text-xs flex items-start gap-2"
            style={{ color: "rgba(255,255,255,0.35)" }}>
            <span className={c.dot}>✓</span> {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  return (
    <div className="w-72 min-h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 p-6">

      {/* Logo */}
      <h1 className="text-3xl font-bold text-purple-400 mb-10">
        ResumeGPT
      </h1>

      {/* Menu */}
      <div className="space-y-4">

        <button className="flex items-center gap-3 w-full p-4 rounded-2xl bg-purple-600 hover:bg-purple-700 transition">
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button className="flex items-center gap-3 w-full p-4 rounded-2xl hover:bg-white/10 transition">
          <FileText size={20} />
          My Resumes
        </button>

        <button className="flex items-center gap-3 w-full p-4 rounded-2xl hover:bg-white/10 transition">
          <Sparkles size={20} />
          AI Assistant
        </button>

        <button className="flex items-center gap-3 w-full p-4 rounded-2xl hover:bg-white/10 transition">
          <Settings size={20} />
          Settings
        </button>

      </div>

      {/* Logout */}
      <div className="absolute bottom-10 left-6 right-6">
        <button className="flex items-center gap-3 w-full p-4 rounded-2xl bg-red-500 hover:bg-red-600 transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
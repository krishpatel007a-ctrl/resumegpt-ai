import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] text-white overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">

          {/* Resume Form */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl">
            <ResumeForm />
          </div>

          {/* Resume Preview */}
          <div className="bg-white text-black rounded-3xl p-6 shadow-xl min-h-[700px]">
            <ResumePreview />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";

function Dashboard() {
  const [resumeData, setResumeData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
  });

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

      <div className="relative z-10">
        <Sidebar />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
          </div>

          <div className="bg-white text-black rounded-3xl p-6 shadow-2xl min-h-[700px]">
            <ResumePreview resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
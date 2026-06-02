import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import AuthPage from "./components/AuthPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import PreviewPage from "./components/PreviewPage";
import ATSScore from "./components/ATSScore";
import JobMatcher from "./components/JobMatcher";
import PublicResumePage from "./components/PublicResumePage";

function App() {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState("personal");
  const [page, setPage] = useState("editor");

  const path = window.location.pathname;
  const shareMatch = path.match(/^\/resume\/([a-zA-Z0-9]+)$/);

  if (shareMatch) {
    return <PublicResumePage shareId={shareMatch[1]} />;
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0a0a0f" }}
      >
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4"
            style={{
              background: "linear-gradient(135deg, #6366f1, #a78bfa)",
              boxShadow: "0 8px 32px rgba(99,102,241,0.4)",
              animation: "pulse 2s infinite",
            }}
          >
            R
          </div>

          <p className="font-bold text-white text-lg">ResumeGPT</p>

          <p
            className="text-sm mt-1"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Loading your workspace...
          </p>
        </div>
      </div>
    );
  }

  if (!user) return <AuthPage />;

  if (page === "preview") {
    return <PreviewPage onBack={() => setPage("editor")} />;
  }

  if (page === "ats") {
    return <ATSScore onBack={() => setPage("editor")} />;
  }

  if (page === "jobmatcher") {
    return <JobMatcher onBack={() => setPage("editor")} />;
  }

  return (
    <div className="min-h-screen animated-bg">
      <Navbar
        onPreview={() => setPage("preview")}
        onATS={() => setPage("ats")}
        onJobMatch={() => setPage("jobmatcher")}
      />

      <div className="flex">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <MainContent activeSection={activeSection} />
      </div>
    </div>
  );
}

export default App;
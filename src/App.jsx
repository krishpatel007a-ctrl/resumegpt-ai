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
      <div className="min-h-screen flex items-center justify-center animated-bg">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-indigo-100 font-semibold">
            Loading ResumeGPT...
          </p>
        </div>
      </div>
    );
  }

  if (!user) return <AuthPage />;

  if (page === "preview") return <PreviewPage onBack={() => setPage("editor")} />;
  if (page === "ats") return <ATSScore onBack={() => setPage("editor")} />;
  if (page === "jobmatcher") return <JobMatcher onBack={() => setPage("editor")} />;

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
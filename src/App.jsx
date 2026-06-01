import { useState } from "react";
import Navbar      from "./components/Navbar";
import Sidebar     from "./components/Sidebar";
import MainContent from "./components/MainContent";
import PreviewPage from "./components/PreviewPage";
import ATSScore    from "./components/ATSScore";

function App() {
  const [activeSection, setActiveSection] = useState("personal");
  const [page, setPage]                   = useState("editor");

  if (page === "preview") {
    return <PreviewPage onBack={() => setPage("editor")} />;
  }

  if (page === "ats") {
    return <ATSScore onBack={() => setPage("editor")} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onPreview={() => setPage("preview")}
        onATS={() => setPage("ats")}
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
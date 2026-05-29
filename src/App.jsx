import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import PreviewPage from "./components/PreviewPage";

function App() {
  const [activeSection, setActiveSection] = useState("personal");
  const [showPreview, setShowPreview]     = useState(false);

  if (showPreview) {
    return <PreviewPage onBack={() => setShowPreview(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onPreview={() => setShowPreview(true)} />
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
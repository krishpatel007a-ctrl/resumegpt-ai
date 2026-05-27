import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

function App() {
  const [activeSection, setActiveSection] = useState("personal");

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Navigation */}
      <Navbar />

      {/* Body: Sidebar + Main */}
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
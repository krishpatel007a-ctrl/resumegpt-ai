import { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: "", jobTitle: "", email: "",
      phone: "", location: "", linkedin: "",
      github: "", website: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
  });

  function updateSection(section, data) {
    setResumeData((prev) => ({ ...prev, [section]: data }));
  }

  return (
    <ResumeContext.Provider value={{ resumeData, updateSection }}>
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => useContext(ResumeContext);

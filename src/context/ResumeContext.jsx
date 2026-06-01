import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { saveResume, loadResume } from "../utils/resumeDB";

const ResumeContext = createContext();

const defaultResumeData = {
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
};

export function ResumeProvider({ children }) {
  const { user }                      = useAuth();
  const [resumeData, setResumeData]   = useState(defaultResumeData);
  const [saving, setSaving]           = useState(false);
  const [saveMsg, setSaveMsg]         = useState("");
  const [shareId, setShareId]         = useState(null);
  const [isPublic, setIsPublic]       = useState(false);

  // Load resume when user logs in
  useEffect(() => {
    if (user) {
      loadResume(user.id).then(({ data }) => {
        if (data?.data) {
          setResumeData(data.data);
          setShareId(data.share_id);
          setIsPublic(data.is_public);
        }
      });
    } else {
      // Reset when logged out
      setResumeData(defaultResumeData);
      setShareId(null);
      setIsPublic(false);
    }
  }, [user]);

  function updateSection(section, data) {
    setResumeData((prev) => ({ ...prev, [section]: data }));
  }

  async function handleSaveResume() {
    if (!user) return;
    setSaving(true);
    setSaveMsg("");

    const { data, error } = await saveResume(
      user.id,
      resumeData,
      `${resumeData.personal.fullName || "My"} Resume`
    );

    if (error) {
      setSaveMsg("❌ Save failed: " + error.message);
    } else {
      setSaveMsg("✅ Saved!");
      setShareId(data.share_id);
      setTimeout(() => setSaveMsg(""), 3000);
    }
    setSaving(false);
  }

  return (
    <ResumeContext.Provider value={{
      resumeData,
      updateSection,
      handleSaveResume,
      saving,
      saveMsg,
      shareId,
      isPublic,
      setIsPublic,
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}
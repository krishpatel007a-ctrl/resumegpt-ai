import PersonalInfoForm   from "../forms/PersonalInfoForm";
import SummaryForm        from "../forms/SummaryForm";
import WorkExperienceForm from "../forms/WorkExperienceForm";
import EducationForm      from "../forms/EducationForm";
import SkillsForm         from "../forms/SkillsForm";
import ProjectsForm       from "../forms/ProjectsForm";

const sectionMeta = {
  personal:   { icon: "👤", title: "Personal Info",    desc: "Your basic contact details" },
  summary:    { icon: "📝", title: "Summary",          desc: "Your professional overview" },
  experience: { icon: "💼", title: "Work Experience",  desc: "Your jobs and roles" },
  education:  { icon: "🎓", title: "Education",        desc: "Your degrees and courses" },
  skills:     { icon: "🛠️", title: "Skills",           desc: "Your tech stack and abilities" },
  projects:   { icon: "🚀", title: "Projects",         desc: "Things you've built" },
};

function MainContent({ activeSection }) {
  function renderSection() {
    switch (activeSection) {
      case "personal":   return <PersonalInfoForm />;
      case "summary":    return <SummaryForm />;
      case "experience": return <WorkExperienceForm />;
      case "education":  return <EducationForm />;
      case "skills":     return <SkillsForm />;
      case "projects":   return <ProjectsForm />;
      default:
        return (
          <div className="rounded-2xl p-10 text-center" style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}>
            <p style={{ color: "rgba(255,255,255,0.2)" }}>
              ✅ All sections complete!
            </p>
          </div>
        );
    }
  }

  const meta = sectionMeta[activeSection] || {};

  return (
    <main className="flex-1 p-6 overflow-y-auto"
      style={{ minHeight: "calc(100vh - 57px)" }}>
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <div className="mb-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center 
                          justify-center text-2xl flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(167,139,250,0.2))",
              border: "1px solid rgba(99,102,241,0.3)",
            }}>
            {meta.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {meta.title}
            </h2>
            <p className="text-xs mt-0.5"
              style={{ color: "rgba(255,255,255,0.3)" }}>
              {meta.desc} — AI will help you write better content!
            </p>
          </div>
        </div>

        <hr className="section-divider mb-6" />

        {renderSection()}

      </div>
    </main>
  );
}

export default MainContent;
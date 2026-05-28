import PersonalInfoForm from "../forms/PersonalInfoForm";
import SummaryForm from "../forms/SummaryForm";

function MainContent({ activeSection }) {
  function renderSection() {
    switch (activeSection) {
      case "personal":
        return <PersonalInfoForm />;
      case "summary":
        return <SummaryForm />;
      default:
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <p className="text-gray-400 text-center text-sm py-10">
              🏗️ This section is coming in the next steps!
            </p>
          </div>
        );
    }
  }

  return (
    <main className="flex-1 p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">
            {activeSection.replace("-", " ")} ✏️
          </h2>
          <p className="text-gray-400 mt-1 text-sm">
            Fill in your details below. AI will help you write better content!
          </p>
        </div>

        {renderSection()}

      </div>
    </main>
  );
}

export default MainContent;
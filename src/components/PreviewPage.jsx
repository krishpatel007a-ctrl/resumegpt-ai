import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useResume } from "../context/ResumeContext";
import ClassicTemplate  from "../templates/ClassicTemplate";
import ModernTemplate   from "../templates/ModernTemplate";
import MinimalTemplate  from "../templates/MinimalTemplate";
import TemplatePicker   from "./TemplatePicker";

const templateMap = {
  classic: ClassicTemplate,
  modern:  ModernTemplate,
  minimal: MinimalTemplate,
};

function PreviewPage({ onBack }) {
  const { resumeData }          = useResume();
  const [template, setTemplate] = useState("classic");
  const printRef                = useRef();

  const SelectedTemplate = templateMap[template];

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resumeData.personal.fullName || "Resume"}_ResumeGPT`,
  });

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 
                      flex items-center justify-between shadow-sm 
                      sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-indigo-600 font-medium 
                       text-sm transition"
          >
            ← Back to Editor
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-gray-700 font-semibold text-sm">
            Resume Preview
          </span>
        </div>

        <button
          onClick={handlePrint}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl 
                     font-semibold text-sm hover:bg-indigo-700 transition"
        >
          🖨️ Download PDF
        </button>
      </div>

      {/* Template Picker Bar */}
      <TemplatePicker selected={template} onSelect={setTemplate} />

      {/* Preview Area */}
      <div className="py-10 px-4">

        {!resumeData.personal.fullName && (
          <div className="max-w-3xl mx-auto mb-6 bg-amber-50 border 
                          border-amber-200 rounded-2xl p-4 text-center">
            <p className="text-amber-700 text-sm font-medium">
              ⚠️ Your resume looks empty! Go back and fill in your details first.
            </p>
          </div>
        )}

        {/* Template Label */}
        <div className="max-w-3xl mx-auto mb-3 flex items-center 
                        justify-between">
          <p className="text-xs text-gray-400 font-medium uppercase 
                        tracking-widest">
            {template} template
          </p>
          <p className="text-xs text-gray-400">
            💡 Switch templates above — your data stays the same!
          </p>
        </div>

        {/* Rendered Template */}
        <div className="shadow-2xl rounded-lg overflow-hidden">
          <SelectedTemplate ref={printRef} data={resumeData} />
        </div>

      </div>
    </div>
  );
}

export default PreviewPage;
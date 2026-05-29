import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useResume } from "../context/ResumeContext";
import ResumePreview from "./ResumePreview";

function PreviewPage({ onBack }) {
  const { resumeData } = useResume();
  const printRef = useRef();

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
                       text-sm transition flex items-center gap-2"
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
                     font-semibold text-sm hover:bg-indigo-700 transition 
                     flex items-center gap-2"
        >
          🖨️ Download PDF
        </button>
      </div>

      {/* Preview Area */}
      <div className="py-10 px-4">

        {/* Empty State */}
        {!resumeData.personal.fullName && (
          <div className="max-w-3xl mx-auto mb-6 bg-amber-50 border 
                          border-amber-200 rounded-2xl p-4 text-center">
            <p className="text-amber-700 text-sm font-medium">
              ⚠️ Your resume looks empty! Go back and fill in your details first.
            </p>
          </div>
        )}

        <ResumePreview ref={printRef} data={resumeData} />
      </div>

    </div>
  );
}

export default PreviewPage;
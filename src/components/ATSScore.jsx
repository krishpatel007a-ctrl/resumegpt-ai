import { useState } from "react";
import { generateWithAI } from "../utils/aiHelper";
import { useResume } from "../context/ResumeContext";

function ScoreRing({ score }) {
  const color =
    score >= 80 ? "#22c55e" :
    score >= 60 ? "#f59e0b" :
    "#ef4444";

  const label =
    score >= 80 ? "Excellent" :
    score >= 60 ? "Good" :
    "Needs Work";

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div
        style={{ borderColor: color }}
        className="w-36 h-36 rounded-full border-8 flex flex-col 
                   items-center justify-center shadow-lg"
      >
        <span style={{ color }} className="text-4xl font-bold">
          {score}
        </span>
        <span className="text-gray-400 text-xs font-medium">out of 100</span>
      </div>
      <span
        style={{ color }}
        className="mt-3 text-sm font-bold uppercase tracking-widest"
      >
        {label}
      </span>
    </div>
  );
}

function ATSScore({ onBack }) {
  const { resumeData }      = useResume();
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState("");

  async function handleCheck() {
    const { personal, summary, experience, education, skills, projects } = resumeData;

    if (!personal.fullName && !summary && experience.length === 0) {
      setError("Please fill in your resume first before checking ATS score!");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const resumeText = `
      Name: ${personal.fullName}
      Job Title: ${personal.jobTitle}
      Email: ${personal.email}
      Phone: ${personal.phone}
      Location: ${personal.location}
      LinkedIn: ${personal.linkedin}
      GitHub: ${personal.github}

      SUMMARY:
      ${summary}

      WORK EXPERIENCE:
      ${experience.map((j) =>
        `${j.position} at ${j.company} (${j.startDate} - ${j.current ? "Present" : j.endDate})
        ${j.description}`
      ).join("\n\n")}

      EDUCATION:
      ${education.map((e) =>
        `${e.degree} in ${e.field} at ${e.school} (${e.grade})`
      ).join("\n")}

      SKILLS:
      ${skills.map((s) => s.name).join(", ")}

      PROJECTS:
      ${projects.map((p) =>
        `${p.name} - ${p.techStack}\n${p.description}`
      ).join("\n\n")}
    `;

    const prompt = `You are an expert ATS (Applicant Tracking System) analyzer.
      Analyze this resume and return a JSON object with EXACTLY this structure:
      
      {
        "score": <number 0-100>,
        "strengths": [<3-5 specific positive points as strings>],
        "improvements": [<3-5 specific things to fix as strings>],
        "tips": [<3 actionable tips as strings>],
        "keywords": [<5 important keywords found in resume>],
        "missingKeywords": [<5 important keywords that are missing>]
      }
      
      Resume to analyze:
      ${resumeText}
      
      Return ONLY the JSON object, no other text, no markdown, no backticks.`;

    try {
      const raw    = await generateWithAI(prompt);
      const clean  = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (err) {
      setError("AI couldn't parse the result. Please try again!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 
                      flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-indigo-600 
                       font-medium text-sm transition"
          >
            ← Back to Editor
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-gray-700 font-semibold text-sm">
            📊 ATS Score Checker
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header Card */}
        <div className="bg-white rounded-2xl border border-gray-100 
                        shadow-sm p-8 mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ATS Resume Score Checker
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Over 90% of large companies use ATS software to filter resumes.
            Let AI check if your resume will pass the filter!
          </p>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 
                            rounded-xl p-3 text-sm text-red-600">
              ⚠️ {error}
            </div>
          )}

          <button
            onClick={handleCheck}
            disabled={loading}
            className={`mt-6 px-8 py-3 rounded-xl font-semibold 
                        text-sm transition
              ${loading
                ? "bg-indigo-300 text-white cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
          >
            {loading
              ? "🤖 AI is analyzing your resume..."
              : "🔍 Check My ATS Score"
            }
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl border border-gray-100 
                          shadow-sm p-10 text-center">
            <div className="w-12 h-12 border-4 border-indigo-600 
                            border-t-transparent rounded-full animate-spin 
                            mx-auto mb-4" />
            <p className="text-gray-500 font-medium">
              Analyzing your resume against ATS criteria...
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Checking keywords, formatting, completeness...
            </p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="space-y-6">

            {/* Score + Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Score Ring */}
              <div className="bg-white rounded-2xl border border-gray-100 
                              shadow-sm p-6">
                <p className="text-xs font-semibold text-gray-400 
                               uppercase tracking-widest text-center mb-2">
                  Your ATS Score
                </p>
                <ScoreRing score={result.score} />
              </div>

              {/* Found Keywords */}
              <div className="bg-white rounded-2xl border border-gray-100 
                              shadow-sm p-6">
                <p className="text-xs font-semibold text-gray-400 
                               uppercase tracking-widest mb-4">
                  ✅ Keywords Found
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.keywords?.map((kw, i) => (
                    <span key={i}
                      className="bg-green-50 text-green-700 border 
                                 border-green-200 text-xs font-medium 
                                 px-3 py-1 rounded-full">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Keywords */}
              <div className="bg-white rounded-2xl border border-gray-100 
                              shadow-sm p-6">
                <p className="text-xs font-semibold text-gray-400 
                               uppercase tracking-widest mb-4">
                  ❌ Missing Keywords
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords?.map((kw, i) => (
                    <span key={i}
                      className="bg-red-50 text-red-600 border 
                                 border-red-200 text-xs font-medium 
                                 px-3 py-1 rounded-full">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Strengths + Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Strengths */}
              <div className="bg-white rounded-2xl border border-gray-100 
                              shadow-sm p-6">
                <p className="text-sm font-bold text-gray-700 mb-4 
                               flex items-center gap-2">
                  <span className="text-green-500 text-lg">✅</span>
                  What You Did Well
                </p>
                <ul className="space-y-3">
                  {result.strengths?.map((s, i) => (
                    <li key={i}
                      className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="text-green-500 mt-0.5 
                                       font-bold shrink-0">
                        ✓
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="bg-white rounded-2xl border border-gray-100 
                              shadow-sm p-6">
                <p className="text-sm font-bold text-gray-700 mb-4 
                               flex items-center gap-2">
                  <span className="text-amber-500 text-lg">⚠️</span>
                  What Needs Improvement
                </p>
                <ul className="space-y-3">
                  {result.improvements?.map((imp, i) => (
                    <li key={i}
                      className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="text-amber-500 mt-0.5 
                                       font-bold shrink-0">
                        !
                      </span>
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Action Tips */}
            <div className="bg-indigo-50 border border-indigo-200 
                            rounded-2xl p-6">
              <p className="text-sm font-bold text-indigo-700 mb-4 
                             flex items-center gap-2">
                <span className="text-xl">💡</span>
                Action Tips to Improve Your Score
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.tips?.map((tip, i) => (
                  <div key={i}
                    className="bg-white rounded-xl p-4 border 
                               border-indigo-100 shadow-sm">
                    <span className="text-indigo-400 font-bold 
                                     text-lg block mb-1">
                      {i + 1}.
                    </span>
                    <p className="text-sm text-gray-600">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Re-check Button */}
            <div className="text-center">
              <button
                onClick={handleCheck}
                className="bg-white border border-indigo-300 text-indigo-600 
                           px-6 py-2.5 rounded-xl font-semibold text-sm 
                           hover:bg-indigo-50 transition"
              >
                🔄 Re-check After Edits
              </button>
            </div>

          </div>
        )}

        {/* Empty state — before checking */}
        {!result && !loading && (
          <div className="bg-white rounded-2xl border border-gray-100 
                          shadow-sm p-10 text-center">
            <p className="text-6xl mb-4">📋</p>
            <p className="text-gray-500 font-medium mb-2">
              Ready to analyze your resume
            </p>
            <p className="text-gray-400 text-sm">
              Make sure you've filled in and saved at least
              Personal Info, Summary, and Skills before checking.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default ATSScore;
import { useState } from "react";
import { generateWithAI } from "../utils/aiHelper";
import { useResume } from "../context/ResumeContext";

function MatchScoreRing({ score }) {
  const color =
    score >= 80 ? "#22c55e" :
    score >= 60 ? "#f59e0b" :
    "#ef4444";

  const label =
    score >= 80 ? "Great Match!" :
    score >= 60 ? "Good Match" :
    "Weak Match";

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div
        style={{ borderColor: color }}
        className="w-32 h-32 rounded-full border-8 flex flex-col 
                   items-center justify-center shadow-lg"
      >
        <span style={{ color }} className="text-4xl font-bold">
          {score}
        </span>
        <span className="text-gray-400 text-xs">out of 100</span>
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

function JobMatcher({ onBack }) {
  const { resumeData, updateSection } = useResume();
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle]             = useState("");
  const [company, setCompany]               = useState("");
  const [loading, setLoading]               = useState(false);
  const [result, setResult]                 = useState(null);
  const [error, setError]                   = useState("");
  const [applied, setApplied]               = useState(false);

  async function handleAnalyze() {
    if (!jobDescription.trim()) {
      setError("Please paste a job description first!");
      return;
    }
    if (!resumeData.personal.fullName && !resumeData.summary) {
      setError("Please fill in your resume first!");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setApplied(false);

    const resumeText = `
      Name: ${resumeData.personal.fullName}
      Current Title: ${resumeData.personal.jobTitle}
      Summary: ${resumeData.summary}
      Skills: ${resumeData.skills.map((s) => s.name).join(", ")}
      Experience: ${resumeData.experience.map((j) =>
        `${j.position} at ${j.company}: ${j.description}`
      ).join(" | ")}
      Projects: ${resumeData.projects.map((p) =>
        `${p.name} (${p.techStack})`
      ).join(", ")}
    `;

    const prompt = `You are an expert resume coach and job matching specialist.
      
      Analyze how well this resume matches the job description and return 
      a JSON object with EXACTLY this structure:
      
      {
        "matchScore": <number 0-100>,
        "jobTitle": "<detected job title from description>",
        "matchedKeywords": [<5-8 keywords from job description found in resume>],
        "missingKeywords": [<5-8 important keywords from job description NOT in resume>],
        "tailoredSummary": "<rewrite the resume summary to match this specific job, 3-4 sentences>",
        "skillsToAdd": [<4-6 specific skills to add for this job>],
        "experiencetips": [<3 tips to reframe existing experience for this job>],
        "actionPlan": [<3 specific actions to increase match score>]
      }
      
      RESUME:
      ${resumeText}
      
      JOB DESCRIPTION:
      ${jobDescription}
      
      Return ONLY the JSON object, no markdown, no backticks, no extra text.`;

    try {
      const raw    = await generateWithAI(prompt);
      const clean  = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (err) {
      setError("AI couldn't analyze. Please try again!");
    } finally {
      setLoading(false);
    }
  }

  function handleApplySummary() {
    if (result?.tailoredSummary) {
      updateSection("summary", result.tailoredSummary);
      setApplied(true);
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
            🎯 Job Description Matcher
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">

        {/* Input Card */}
        <div className="bg-white rounded-2xl border border-gray-100 
                        shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Job Description Matcher
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Paste any job description below — AI will tailor your 
            resume to match it perfectly!
          </p>

          {/* Job Info Row */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">
                Job Title (optional)
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Developer"
                className="border border-gray-200 rounded-xl px-4 py-2.5 
                           text-sm focus:outline-none focus:ring-2 
                           focus:ring-indigo-400 placeholder-gray-300 
                           transition"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">
                Company (optional)
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Google"
                className="border border-gray-200 rounded-xl px-4 py-2.5 
                           text-sm focus:outline-none focus:ring-2 
                           focus:ring-indigo-400 placeholder-gray-300 
                           transition"
              />
            </div>
          </div>

          {/* Job Description Textarea */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-semibold text-gray-600">
              Job Description *
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={8}
              placeholder="Paste the full job description here...

Example:
We are looking for a Senior Frontend Developer with 3+ years of experience in React, TypeScript, and modern CSS frameworks. The ideal candidate should have experience with REST APIs, Git, and agile methodologies..."
              className="border border-gray-200 rounded-xl px-4 py-3 
                         text-sm focus:outline-none focus:ring-2 
                         focus:ring-indigo-400 placeholder-gray-300 
                         transition resize-none text-gray-800"
            />
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 
                            rounded-xl p-3 text-sm text-red-600">
              ⚠️ {error}
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-sm 
                        transition
              ${loading
                ? "bg-indigo-300 text-white cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
          >
            {loading
              ? "🤖 AI is matching your resume..."
              : "🎯 Analyze Job Match"
            }
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl border border-gray-100 
                          shadow-sm p-10 text-center">
            <div className="w-12 h-12 border-4 border-indigo-600 
                            border-t-transparent rounded-full 
                            animate-spin mx-auto mb-4" />
            <p className="text-gray-500 font-medium">
              Matching your resume to the job description...
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Analyzing keywords, skills, experience alignment...
            </p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="space-y-6">

            {/* Score Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Match Score */}
              <div className="bg-white rounded-2xl border border-gray-100 
                              shadow-sm p-6">
                <p className="text-xs font-semibold text-gray-400 
                               uppercase tracking-widest text-center mb-1">
                  Match Score
                </p>
                {jobTitle || result.jobTitle ? (
                  <p className="text-center text-xs text-indigo-500 
                                 font-medium mb-2">
                    for {jobTitle || result.jobTitle}
                    {company ? ` @ ${company}` : ""}
                  </p>
                ) : null}
                <MatchScoreRing score={result.matchScore} />
              </div>

              {/* Matched Keywords */}
              <div className="bg-white rounded-2xl border border-gray-100 
                              shadow-sm p-6">
                <p className="text-xs font-semibold text-gray-400 
                               uppercase tracking-widest mb-4">
                  ✅ Keywords Matched
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.matchedKeywords?.map((kw, i) => (
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

            {/* Tailored Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 
                            shadow-sm p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-700 mb-1 
                                 flex items-center gap-2">
                    <span className="text-xl">✍️</span>
                    AI-Tailored Summary for This Job
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    This summary is rewritten to match the job description keywords
                  </p>
                  <div className="bg-indigo-50 border border-indigo-200 
                                  rounded-xl p-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {result.tailoredSummary}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleApplySummary}
                disabled={applied}
                className={`mt-4 px-6 py-2.5 rounded-xl font-semibold 
                            text-sm transition
                  ${applied
                    ? "bg-green-100 text-green-600 cursor-default"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
              >
                {applied
                  ? "✅ Applied to Your Resume!"
                  : "⚡ Apply This Summary to My Resume"
                }
              </button>
            </div>

            {/* Skills + Experience Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Skills to Add */}
              <div className="bg-white rounded-2xl border border-gray-100 
                              shadow-sm p-6">
                <p className="text-sm font-bold text-gray-700 mb-4 
                               flex items-center gap-2">
                  <span className="text-xl">🛠️</span>
                  Skills to Add for This Job
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.skillsToAdd?.map((skill, i) => (
                    <span key={i}
                      className="bg-amber-50 text-amber-700 border 
                                 border-amber-200 text-sm font-medium 
                                 px-3 py-1.5 rounded-xl">
                      + {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience Tips */}
              <div className="bg-white rounded-2xl border border-gray-100 
                              shadow-sm p-6">
                <p className="text-sm font-bold text-gray-700 mb-4 
                               flex items-center gap-2">
                  <span className="text-xl">💼</span>
                  How to Reframe Your Experience
                </p>
                <ul className="space-y-3">
                  {result.experienceTips?.map((tip, i) => (
                    <li key={i}
                      className="flex items-start gap-2 text-sm 
                                 text-gray-600">
                      <span className="text-indigo-400 font-bold 
                                       shrink-0 mt-0.5">
                        {i + 1}.
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Action Plan */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-500 
                            rounded-2xl p-6 text-white">
              <p className="text-sm font-bold mb-4 flex items-center gap-2">
                <span className="text-xl">🚀</span>
                Your Action Plan to Get This Job
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.actionPlan?.map((action, i) => (
                  <div key={i}
                    className="bg-white/10 rounded-xl p-4 
                               backdrop-blur-sm">
                    <span className="text-indigo-200 font-bold 
                                     text-2xl block mb-2">
                      {i + 1}
                    </span>
                    <p className="text-sm text-white/90">{action}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Re-analyze Button */}
            <div className="text-center">
              <button
                onClick={handleAnalyze}
                className="bg-white border border-indigo-300 
                           text-indigo-600 px-6 py-2.5 rounded-xl 
                           font-semibold text-sm hover:bg-indigo-50 
                           transition"
              >
                🔄 Re-analyze After Edits
              </button>
            </div>

          </div>
        )}

        {/* Empty state */}
        {!result && !loading && (
          <div className="bg-white rounded-2xl border border-gray-100 
                          shadow-sm p-10 text-center">
            <p className="text-6xl mb-4">🎯</p>
            <p className="text-gray-500 font-medium mb-2">
              Ready to match your resume to any job!
            </p>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Copy a job description from LinkedIn, Indeed, or any job 
              site and paste it above. AI will tell you exactly how 
              to tailor your resume!
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default JobMatcher;
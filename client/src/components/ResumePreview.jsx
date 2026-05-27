function ResumePreview() {
  return (
    <div>

      <h1 className="text-4xl font-bold mb-2">
        Krish Patel
      </h1>

      <p className="text-gray-600 mb-6">
        Frontend Developer
      </p>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">
          Professional Summary
        </h2>

        <p className="text-gray-700 leading-7">
          Passionate frontend developer skilled in React,
          Tailwind CSS, and modern UI design.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">
          Skills
        </h2>

        <div className="flex gap-3 flex-wrap">
          <span className="px-4 py-2 bg-gray-200 rounded-xl">
            React
          </span>

          <span className="px-4 py-2 bg-gray-200 rounded-xl">
            Tailwind
          </span>

          <span className="px-4 py-2 bg-gray-200 rounded-xl">
            JavaScript
          </span>
        </div>
      </div>

    </div>
  );
}

export default ResumePreview;
const CodingFilters = ({ filters, setFilters, options }) => {
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      topic: "",
      sheet: "",
      difficulty: "",
      platform: "",
    });
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 border">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold">
          Filters
        </h2>

        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Topic */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Topic
          </label>

          <select
            name="topic"
            value={filters.topic}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">All Topics</option>

            {options.topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        {/* Sheet */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Sheet
          </label>

          <select
            name="sheet"
            value={filters.sheet}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">All Sheets</option>

            {options.sheets.map((sheet) => (
              <option key={sheet} value={sheet}>
                {sheet}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Difficulty
          </label>

          <select
            name="difficulty"
            value={filters.difficulty}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">All Difficulties</option>

            {options.difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Platform
          </label>

          <select
            name="platform"
            value={filters.platform}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">All Platforms</option>

            {options.platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
};

export default CodingFilters;
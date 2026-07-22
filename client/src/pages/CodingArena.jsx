import { useEffect, useState } from "react";
import codingService from "../services/codingService";
import CodingFilters from "../components/CodingArena/CodingFilters";
import ProgressCard from "../components/CodingArena/ProgressCard";
import ProblemTable from "../components/CodingArena/ProblemTable";
const CodingArena = () => {
  const [filters, setFilters] = useState({
    topic: "",
    sheet: "",
    difficulty: "",
    platform: "",
    search: "",
  });

  const [filterOptions, setFilterOptions] = useState({
    topics: [],
    sheets: [],
    difficulties: [],
    platforms: [],
  });

  const [problems, setProblems] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const [options, problemData, progressData] = await Promise.all([
        codingService.getFilters(),
        codingService.getProblems(filters),
        codingService.getProgress(),
      ]);

      setFilterOptions(options);
      setProblems(problemData);
      setProgress(progressData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  const markCompleted = async (problemId) => {
    try {
      await codingService.completeProblem(problemId);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl">
        Loading Coding Arena...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold">Coding Arena</h1>

      <ProgressCard progress={progress} />
        <div className="bg-white border rounded-xl shadow-md p-4">
          <input
            type="text"
            placeholder="Search problems..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                search: e.target.value,
              }))
            }
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
      </div>
      <CodingFilters
        filters={filters}
        setFilters={setFilters}
        options={filterOptions}
      />

      <ProblemTable
        problems={problems}
        onComplete={markCompleted}
      />
    </div>
  );
};

export default CodingArena;
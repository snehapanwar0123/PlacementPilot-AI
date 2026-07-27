import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function PlanningZone() {
  const [formData, setFormData] = useState({
    role: "",
    currentLevel: "Beginner",
    duration: "3 Months",
    dailyHours: 2,
  });
  const [loading, setLoading] = useState(false);
  const [roadmaps, setRoadmaps] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "dailyHours"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };
const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const token = JSON.parse(localStorage.getItem("user")).token;

    const response = await axios.post(
      "http://localhost:5000/api/roadmaps",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Roadmap Created:", response.data);

    alert("Roadmap generated successfully!");
    await fetchRoadmaps();

    setFormData({
      role: "",
      currentLevel: "Beginner",
      duration: "3 Months",
      dailyHours: 2,
    });
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
        "Failed to generate roadmap."
        );
    } finally {
        setLoading(false);
    }
    };
    const fetchRoadmaps = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;

    const response = await axios.get(
      "http://localhost:5000/api/roadmaps",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRoadmaps(response.data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchRoadmaps();
}, []);

console.log(roadmaps);

return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          🧠 Planning Zone
        </h1>

        <p className="text-slate-400 mb-10">
          Generate personalized AI roadmaps for any skill.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 rounded-xl p-8 space-y-6"
        >
          <div>
            <label className="block mb-2">
              What do you want to learn?
            </label>

            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Example: DevOps"
              className="w-full rounded-lg bg-slate-800 p-3 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2">
              Current Level
            </label>

            <select
              name="currentLevel"
              value={formData.currentLevel}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 p-3"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">
              Target Duration
            </label>

            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 p-3"
            >
              <option>1 Month</option>
              <option>2 Months</option>
              <option>3 Months</option>
              <option>6 Months</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">
              Daily Study Hours
            </label>

            <select
              name="dailyHours"
              value={formData.dailyHours}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 p-3"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-violet-600 py-3 font-semibold transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
            {loading ? "Generating..." : "✨ Generate AI Roadmap"}
            </button>
        </form>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            My Learning Plans
          </h2>
          {roadmaps.length === 0 ? (
  <div className="bg-slate-900 rounded-xl p-6 text-slate-400">
    No learning plans yet.
  </div>
) : (
  <div className="space-y-4">
    {roadmaps.map((roadmap) => (
      <div
        key={roadmap._id}
        className="bg-slate-900 rounded-xl p-6 border border-slate-800"
      >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">
              {roadmap.role}
            </h3>

            <p className="text-slate-400">
              {roadmap.currentLevel} • {roadmap.duration}
            </p>
          </div>

          <button
            onClick={() => navigate(`/roadmap/${roadmap._id}`)}
            className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg"
          >
            Open Plan
          </button>
        </div>
      </div>
    ))}
  </div>
)}
        </div>

      </div>
    </div>
  );
}
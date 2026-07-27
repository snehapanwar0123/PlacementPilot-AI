import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LearningCanvas from "../components/learningHub/LearningCanvas";

export default function Roadmap() {
  const { id } = useParams();

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoadmap();
  }, [id]);

  const fetchRoadmap = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;

      const response = await axios.get(
        `http://localhost:5000/api/roadmaps/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Roadmap:", response.data);

      setRoadmap(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-white text-2xl">
        Loading Roadmap...
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-red-400 text-2xl">
        No Roadmap Found
      </div>
    );
  }

  return <LearningCanvas roadmap={roadmap} />;
}
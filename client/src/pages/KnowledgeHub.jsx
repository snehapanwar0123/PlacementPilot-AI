import { useEffect, useState } from "react";
import axios from "axios";
import TopicCard from "../components/knowledgeHub/TopicCard";

const KnowledgeHub = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const filtered = notes.filter((note) =>
      note.topic.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredNotes(filtered);
  }, [search, notes]);

  const fetchNotes = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;

      const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/notes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes(data);
      setFilteredNotes(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Knowledge Hub
        </h1>

        <p className="text-slate-400 mb-8">
          Explore all AI-generated learning topics.
        </p>

        <input
          type="text"
          placeholder="Search topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 mb-10 outline-none focus:border-cyan-500"
        />

        {filteredNotes.length === 0 ? (
          <div className="text-center text-slate-500 mt-20">
            No topics found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note) => (
              <TopicCard
                key={note._id}
                note={note}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default KnowledgeHub;
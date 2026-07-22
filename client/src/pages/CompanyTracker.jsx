import { useEffect, useState } from "react";
import { getCompanies } from "../services/companyService";

export default function CompanyTracker() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      setLoading(true);

      const data = await getCompanies();
      setCompanies(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load companies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl p-8">

        <h1 className="mb-8 text-4xl font-bold text-violet-400">
          Company Application Tracker
        </h1>

        {loading ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            Loading companies...
          </div>
        ) : companies.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
            No applications added yet.
          </div>
        ) : (
          <pre className="overflow-auto rounded-xl border border-slate-800 bg-slate-900 p-6">
            {JSON.stringify(companies, null, 2)}
          </pre>
        )}

      </div>
    </div>
  );
}
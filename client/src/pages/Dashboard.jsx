import DashboardLayout from "../components/layout/DashboardLayout";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      navbar={<Navbar />}
    >
      <div>
        <h1 className="text-4xl font-bold">
          Welcome back, {user?.name} 👋
        </h1>

        <p className="mt-2 text-slate-400">
          Here's an overview of your placement preparation.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-slate-400">Resume Score</h3>
            <p className="mt-2 text-4xl font-bold text-violet-500">78%</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-slate-400">Companies Applied</h3>
            <p className="mt-2 text-4xl font-bold text-green-400">12</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-slate-400">DSA Problems Solved</h3>
            <p className="mt-2 text-4xl font-bold text-yellow-400">154</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-slate-400">Upcoming Interviews</h3>
            <p className="mt-2 text-4xl font-bold text-red-400">2</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            🤖 AI Career Coach
          </h2>

          <p className="text-slate-300">
            Good to see you, <strong>{user?.name}</strong>! Here are today's
            recommendations:
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-400">
            <li>Solve 2 Graph problems on LeetCode.</li>
            <li>Review your resume before applying.</li>
            <li>Apply to at least one new company today.</li>
            <li>Spend 30 minutes on your MERN project.</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
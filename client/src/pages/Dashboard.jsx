import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import StatCard from "../components/dashboard/StatCard";
import ActivityCard from "../components/dashboard/ActivityCard";
import AICoachCard from "../components/dashboard/AICoachCard";
import settingsService from "../services/settingsService";
import { useAuth } from "../context/AuthContext";

import {
  FileText,
  Building2,
  Code2,
  BriefcaseBusiness,
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  const [settings, setSettings] = useState(null);

  const loadSettings = async () => {
    try {
      const data = await settingsService.getSettings();
      setSettings(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      navbar={<Navbar />}
    >
      <h1 className="text-4xl font-bold">
        Welcome back, {user?.name} 👋
      </h1>

      <p className="mt-2 text-slate-400">
        Here's your placement preparation overview.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Resume Score"
          value="78%"
          icon={FileText}
          color="text-violet-500"
        />

        <StatCard
          title="Companies Applied"
          value="12"
          icon={Building2}
          color="text-green-400"
        />

        <StatCard
          title="DSA Solved"
          value="154"
          icon={Code2}
          color="text-yellow-400"
        />

        <StatCard
          title="Interviews"
          value="2"
          icon={BriefcaseBusiness}
          color="text-red-400"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ActivityCard />

        <AICoachCard />

        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Your Profile
          </h2>

          {settings ? (
            <div className="space-y-2 text-slate-300">
              <p>
                <strong>Target Role:</strong> {settings.targetRole}
              </p>

              <p>
                <strong>Experience:</strong> {settings.experienceLevel}
              </p>

              <p>
                <strong>Daily Study:</strong> {settings.dailyStudyHours} hrs
              </p>

              <p>
                <strong>Language:</strong> {settings.preferredLanguage}
              </p>

              <p>
                <strong>Skills:</strong>{" "}
                {settings.skills.length
                  ? settings.skills.join(", ")
                  : "None"}
              </p>
            </div>
          ) : (
            <p className="text-slate-400">Loading...</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
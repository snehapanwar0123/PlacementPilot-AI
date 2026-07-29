import { useEffect, useState } from "react";
import dashboardService from "../services/dashboardService";
import DashboardLayout from "../components/layout/DashboardLayout";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import StatCard from "../components/dashboard/StatCard";
import ActivityCard from "../components/dashboard/ActivityCard";
import AICoachCard from "../components/dashboard/AICoachCard";
import settingsService from "../services/settingsService";
import { useAuth } from "../context/AuthContext";
import RecentApplications from "../components/dashboard/recentApplications";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";
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
    const loadDashboardStats = async () => {
    try {
      const data = await dashboardService.getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
      }
    };
      const [stats, setStats] = useState({
    resumeScore: 0,
    companiesApplied: 0,
    interviews: 0,
    offers: 0,
    applicationProgress: 0,
    recentApplications: [],
    upcomingDeadlines: [],
  });

      useEffect(() => {
      loadSettings();
      loadDashboardStats();
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
            value={`${stats.resumeScore}%`}
            icon={FileText}
            color="text-violet-500"
            link="/resume"
        />

        <StatCard
            title="Companies Applied"
            value={stats.companiesApplied}
            icon={Building2}
            color="text-green-400"
            link="/company-tracker"
        />

        <StatCard
            title="DSA Solved"
            value="154"
            icon={Code2}
            color="text-yellow-400"
            link="/coding-arena"
        />

        <StatCard
            title="Interviews"
            value={stats.interviews}
            icon={BriefcaseBusiness}
            color="text-red-400"
            link="/company-tracker"
        />
      </div>
          

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ActivityCard stats={stats} />

        <AICoachCard stats={stats} />

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
            {(settings.skills || []).length
              ? settings.skills.join(", ")
              : "None"}
          </p>
            </div>
          ) : (
            <p className="text-slate-400">Loading...</p>
          )}
        </div>
        
       
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7 h-full">
          <RecentApplications
            applications={stats.recentApplications || []}
          />
        </div>

        <div className="xl:col-span-5 h-full">
          <UpcomingDeadlines
            deadlines={stats.upcomingDeadlines || []}
          />
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
}
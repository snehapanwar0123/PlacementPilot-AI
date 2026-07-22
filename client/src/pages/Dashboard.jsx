import DashboardLayout from "../components/layout/DashboardLayout";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import StatCard from "../components/dashboard/StatCard";
import ActivityCard from "../components/dashboard/ActivityCard";
import AICoachCard from "../components/dashboard/AICoachCard";

import { useAuth } from "../context/AuthContext";

import {
  FileText,
  Building2,
  Code2,
  BriefcaseBusiness,
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

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
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ActivityCard />
        <AICoachCard />
      </div>

      
    </DashboardLayout>
  );
}
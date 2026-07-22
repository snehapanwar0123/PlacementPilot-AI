import DashboardLayout from "../components/layout/DashboardLayout";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import ResumeUpload from "../components/resume/ResumeUpload";

export default function ResumeAnalyzer() {
  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      navbar={<Navbar />}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            Resume Analyzer
          </h1>

          <p className="text-slate-400 mt-2">
            Upload your resume and receive an AI-powered ATS analysis.
          </p>
        </div>

        <ResumeUpload />
      </div>
    </DashboardLayout>
  );
}
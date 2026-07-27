import { Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../company/StatusBadge";

export default function RecentApplications({ applications = [] }) {
  const navigate = useNavigate();

  return (
    <div className="h-full rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="mb-5 flex items-center gap-2">
        <Building2 className="text-violet-400" />
        <h2 className="text-xl font-bold">Recent Applications</h2>
      </div>

      {applications.length === 0 ? (
        <p className="text-slate-400">No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app._id}
              onClick={() => navigate("/company-tracker")}
              className="cursor-pointer rounded-xl border border-slate-800 p-4 transition hover:border-violet-500 hover:bg-slate-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{app.companyName}</h3>
                  <p className="text-sm text-slate-400">{app.role}</p>
                </div>

                <StatusBadge status={app.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
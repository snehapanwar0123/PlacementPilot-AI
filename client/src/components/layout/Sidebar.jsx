import {
  LayoutDashboard,
  FileText,
  
  Code2,
  Building2,
  BrainCircuit,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Resume Analyzer",
      icon: FileText,
      path: "/resume",
    },
    
    {
      name: "Coding Arena",
      icon: Code2,
      path: "/coding-arena",
    },
    {
      name: "Company Tracker",
      icon: Building2,
      path: "/company-tracker",
    },
    {
      name: "Roadmap",
      icon: BrainCircuit,
      path: "/roadmap",
    },
    {
      name: "Knowledge Hub",
      icon: BookOpen,
      path: "/knowledge",
    },
    {
      name: "Planning Zone",
      icon: BrainCircuit,
      path: "/planning-zone",
    },
    {
      name: "Calendar",
      icon: Calendar,
      path: "/calendar",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <aside className="flex h-[calc(100vh-64px)] w-64 flex-col border-r border-slate-800 bg-slate-900">
      <div className="flex-1 overflow-y-auto p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      <button
        onClick={logout}
        className="m-4 flex items-center gap-3 rounded-xl bg-red-500 px-4 py-3 text-white transition hover:bg-red-600"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}
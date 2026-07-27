import {
  User,
  Palette,
  Lock,
  Bell,
  Sparkles,
  Briefcase,
  Shield,
  LifeBuoy,
  TriangleAlert,
} from "lucide-react";

const items = [
  { id: "general", label: "General", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "placement", label: "Placement", icon: Briefcase },
  { id: "ai", label: "AI Preferences", icon: Sparkles },
  { id: "privacy", label: "Privacy", icon: Shield },
  { id: "support", label: "Support", icon: LifeBuoy },
  { id: "danger", label: "Danger Zone", icon: TriangleAlert },
];

const SettingsSidebar = ({ active, setActive }) => {
  return (
    <div className="w-72 rounded-3xl bg-[#1E2247]/95 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">

      <h2 className="text-white text-2xl font-bold mb-8">
        ⚙ Settings
      </h2>

      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              ${
                active === item.id
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-white/10"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default SettingsSidebar;
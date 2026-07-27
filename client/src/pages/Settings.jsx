import { useEffect, useState } from "react";
import settingsService from "../services/settingsService";
import { useTheme } from "../context/ThemeContext";
import SettingsSidebar from "../components/settings/SettingsSidebar";
import SettingsHeader from "../components/settings/SettingsHeader";
import SettingsCard from "../components/settings/SettingsCard";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Monitor,
  Smartphone,
} from "lucide-react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";


const Settings = () => {
  const navigate = useNavigate();
          
  const [settings, setSettings] = useState({
    college: "",
    branch: "",
    graduationYear: "",
    targetRole: "SDE",
    skills: [],
    experienceLevel: "Beginner",
    dailyStudyHours: 2,
    preferredLanguage: "C++",
    theme: "system",
    notifications: {
      calendar: true,
      interview: true,
      oa: true,
      weeklySummary: true,
      

    },
  });

  const [skillInput, setSkillInput] = useState("");
  

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await settingsService.getSettings();
      setSettings(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;

    if (settings.skills.includes(skillInput.trim())) return;

    setSettings({
      ...settings,
      skills: [...settings.skills, skillInput.trim()],
    });

    setSkillInput("");
  };

  const removeSkill = (skill) => {
    setSettings({
      ...settings,
      skills: settings.skills.filter((s) => s !== skill),
    });
  };

  const saveSettings = async () => {
    try {
      const updated = await settingsService.updateSettings(settings);
      setSettings(updated);
      alert("Settings saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save settings.");
    }
  };
  const [active, setActive] = useState("placement");
  const { theme, setTheme } = useTheme();
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({
  current: "",
  new: "",
  confirm: "",
});

const [showPassword, setShowPassword] = useState({
  current: false,
  new: false,
  confirm: false,
});
const getPasswordStrength = () => {
  const pwd = passwords.new;

  let score = 0;

  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 2)
    return {
      text: "Weak",
      color: "bg-red-500",
    };

  if (score <= 4)
    return {
      text: "Medium",
      color: "bg-yellow-500",
    };

  return {
    text: "Strong",
    color: "bg-green-500",
  };
};
const handlePasswordChange = async () => {

    if (
        passwords.new !== passwords.confirm
    ) {
        return alert("Passwords do not match");
    }

    if (passwords.new.length < 6) {
        return alert(
            "Password must be at least 6 characters."
        );
    }

    try {

        const res =
            await settingsService.changePassword({

                currentPassword:
                    passwords.current,

                newPassword:
                    passwords.new,

            });

        alert(res.message);

        setPasswords({
            current: "",
            new: "",
            confirm: "",
        });

    } catch (err) {

        alert(
            err.response?.data?.message ||
            "Unable to change password"
        );

    }
    
};
const handleLogout = () => {
  authService.logout();
  navigate("/", { replace: true });
};
  return (
  <div className="min-h-screen bg-gradient-to-br from-[#EEF4FF] via-[#F8F5FF] to-[#DCE9FF] p-8">

    <SettingsHeader />

    <div className="flex gap-8 items-start">

      <SettingsSidebar
        active={active}
        setActive={setActive}
      />

      <div className="flex-1">

        {/* Placement */}

        {active === "placement" && (
          <SettingsCard title="Placement Preferences">

            <label className="block mb-2 font-medium">
              Target Role
            </label>

            <select
              name="targetRole"
              value={settings.targetRole}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 p-3"
            >
              <option>SDE</option>
              <option>Full Stack</option>
              <option>Product Analyst</option>
              <option>Data Analyst</option>
              <option>ML Engineer</option>
            </select>

          </SettingsCard>
        )}

        {/* AI */}

        {active === "ai" && (
          <SettingsCard title="AI Preferences">

            <div className="grid grid-cols-2 gap-6">

              <div>
                <label className="font-medium">
                  Experience Level
                </label>

                <select
                  name="experienceLevel"
                  value={settings.experienceLevel}
                  onChange={handleChange}
                  className="w-full mt-2 rounded-xl border p-3"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div>
                <label className="font-medium">
                  Daily Study Hours
                </label>

                <input
                  type="number"
                  name="dailyStudyHours"
                  value={settings.dailyStudyHours}
                  onChange={handleChange}
                  className="w-full mt-2 rounded-xl border p-3"
                />
              </div>

            </div>
            

          </SettingsCard>
        )}
        {/* Appearance */}

{active === "appearance" && (
  <SettingsCard title="Appearance">

    <p className="text-slate-600 mb-6">
      Choose how PlacementPilot looks.
    </p>

    <div className="space-y-4">

      {["light", "dark", "system"].map((mode) => (
        <button
          key={mode}
          onClick={() => setTheme(mode)}
          className={`w-full flex justify-between items-center rounded-xl border p-4 transition
          ${
            theme === mode
              ? "border-indigo-600 bg-indigo-50"
              : "border-slate-200 hover:bg-slate-50"
          }`}
        >
          <span className="capitalize font-medium">
            {mode}
          </span>

          {theme === mode && (
            <span className="text-indigo-600 font-semibold">
              ✓
            </span>
          )}
        </button>
      ))}

    </div>

  </SettingsCard>
)}
{active === "security" && (
  <SettingsCard title="Security">
    <div className="space-y-6">

      {/* Current Password */}

      <div>
        <label className="font-medium block mb-2">
          Current Password
        </label>

        <div className="relative">
          <input
            type={showPassword.current ? "text" : "password"}
            value={passwords.current}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                current: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3 pr-12"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword({
                ...showPassword,
                current: !showPassword.current,
              })
            }
            className="absolute right-4 top-4"
          >
            {showPassword.current ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      </div>

      {/* New Password */}

      <div>
        <label className="font-medium block mb-2">
          New Password
        </label>

        <div className="relative">
          <input
            type={showPassword.new ? "text" : "password"}
            value={passwords.new}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                new: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3 pr-12"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword({
                ...showPassword,
                new: !showPassword.new,
              })
            }
            className="absolute right-4 top-4"
          >
            {showPassword.new ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password */}

      <div>
        <label className="font-medium block mb-2">
          Confirm Password
        </label>

        <input
          type={showPassword.confirm ? "text" : "password"}
          value={passwords.confirm}
          onChange={(e) =>
            setPasswords({
              ...passwords,
              confirm: e.target.value,
            })
          }
          className="w-full rounded-xl border p-3"
        />
      </div>

      {/* Password Strength */}

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Password Strength</span>
          <span>{getPasswordStrength().text}</span>
        </div>

        <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
          <div
            className={`h-full ${getPasswordStrength().color}`}
            style={{
              width:
                getPasswordStrength().text === "Weak"
                  ? "35%"
                  : getPasswordStrength().text === "Medium"
                  ? "70%"
                  : "100%",
            }}
          />
        </div>
      </div>

     <button
        disabled={changingPassword}
        onClick={handlePasswordChange}
        className="px-6 py-3 rounded-xl bg-indigo-600 text-white disabled:opacity-50"
    >
        {changingPassword
            ? "Changing..."
            : "Change Password"}
    </button>

      <hr />

      <div>
        <h3 className="font-semibold text-lg mb-4">
          Active Sessions
        </h3>

        <div className="space-y-4">

          <div className="flex justify-between items-center rounded-xl border p-4">
            <div className="flex gap-3 items-center">
              <Monitor />
              <div>
                <p className="font-medium">
                  Chrome • Windows
                </p>
                <p className="text-sm text-slate-500">
                  Current Device
                </p>
              </div>
            </div>

            <ShieldCheck className="text-green-500" />
          </div>

          <div className="flex justify-between items-center rounded-xl border p-4">
            <div className="flex gap-3 items-center">
              <Smartphone />
              <div>
                <p className="font-medium">
                  Safari • iPhone
                </p>
                <p className="text-sm text-slate-500">
                  Last active 2 days ago
                </p>
              </div>
            </div>
          </div>

        </div>

            <button
      onClick={handleLogout}
      className="mt-6 px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
    >
      Logout
    </button>
      </div>

    </div>
  </SettingsCard>
)}

        {/* General */}

        {active === "general" && (
          <SettingsCard title="Skills">

            <div className="flex gap-3">

              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="React, Laravel, SQL..."
                className="flex-1 rounded-xl border p-3"
              />

              <button
                onClick={addSkill}
                className="px-6 rounded-xl bg-indigo-600 text-white"
              >
                Add
              </button>

            </div>

            <div className="flex flex-wrap gap-3 mt-6">

              {settings.skills.map((skill) => (
                <div
                  key={skill}
                  className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700"
                >
                  {skill}

                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2"
                  >
                    ×
                  </button>

                </div>
              ))}

            </div>

          </SettingsCard>
        )}

        <div className="mt-8 flex justify-end">

          <button
            onClick={saveSettings}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>

  </div>
);
};

export default Settings;
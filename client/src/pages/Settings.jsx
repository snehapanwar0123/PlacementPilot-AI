import { useEffect, useState } from "react";
import settingsService from "../services/settingsService";

const Settings = () => {
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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      {/* Placement Preferences */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Placement Preferences
        </h2>

        <label className="block mb-2 font-medium">
          Target Role
        </label>

        <select
          name="targetRole"
          value={settings.targetRole}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full"
        >
          <option>SDE</option>
          <option>Full Stack</option>
          <option>Product Analyst</option>
          <option>Data Analyst</option>
          <option>ML Engineer</option>
        </select>
      </div>

      {/* Skills */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Skills
        </h2>

        <div className="flex gap-2">
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="Add Skill"
            className="border rounded-lg p-2 flex-1"
          />

          <button
            onClick={addSkill}
            className="bg-blue-600 text-white px-4 rounded-lg"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {settings.skills.map((skill) => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
            >
              {skill}

              <button
                className="ml-2"
                onClick={() => removeSkill(skill)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* AI Preferences */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          AI Preferences
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label>Experience Level</label>

            <select
              name="experienceLevel"
              value={settings.experienceLevel}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div>
            <label>Daily Study Hours</label>

            <input
              type="number"
              min="1"
              max="12"
              name="dailyStudyHours"
              value={settings.dailyStudyHours}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label>Preferred Language</label>

            <select
              name="preferredLanguage"
              value={settings.preferredLanguage}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            >
              <option>C++</option>
              <option>Java</option>
              <option>Python</option>
            </select>
          </div>

        </div>
      </div>

      <button
        onClick={saveSettings}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
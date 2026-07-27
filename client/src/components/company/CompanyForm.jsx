import { useEffect, useState } from "react";

const initialState = {
  companyName: "",
  role: "",
  status: "Wishlist",
  location: "",
  salary: "",
  deadline: "",
  notes: "",
};

export default function CompanyForm({
  company,
  onSubmit,
  onClose,
}) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (company) {
      setFormData({
        ...company,
        deadline: company.deadline
          ? company.deadline.split("T")[0]
          : "",
      });
    }
  }, [company]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 p-8">

        <h2 className="mb-6 text-2xl font-bold text-white">
          {company ? "Edit Company" : "Add Company"}
        </h2>

        <form
          onSubmit={submitHandler}
          className="space-y-5"
        >
          <input
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            required
          />

          <input
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          >
            <option>Wishlist</option>
            <option>Applied</option>
            <option>OA Scheduled</option>
            <option>OA Completed</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />

          <input
            name="salary"
            placeholder="Salary (e.g. 45 LPA)"
            value={formData.salary}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />

          <textarea
            rows="4"
            name="notes"
            placeholder="Notes..."
            value={formData.notes}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-slate-700 px-6 py-3 text-white hover:bg-slate-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-6 py-3 text-white hover:bg-violet-700"
            >
              {company ? "Update" : "Add Company"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
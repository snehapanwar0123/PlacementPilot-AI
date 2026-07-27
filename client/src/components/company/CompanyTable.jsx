import CompanyRow from "./CompanyRow";

export default function CompanyTable({
  companies,
  onEdit,
  onDelete,
}) {
  if (companies.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
        <h2 className="text-xl font-semibold text-white">
          No Applications Yet
        </h2>

        <p className="mt-3 text-slate-400">
          Start tracking your placement journey by adding your first company.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">

      <table className="min-w-full">

        <thead className="bg-slate-800">
          <tr>

            <th className="px-6 py-4 text-left">Company</th>

            <th className="px-6 py-4 text-left">Role</th>

            <th className="px-6 py-4 text-left">Status</th>

            <th className="px-6 py-4 text-left">Deadline</th>

            <th className="px-6 py-4 text-left">Salary</th>

            <th className="px-6 py-4 text-left">Actions</th>

          </tr>
        </thead>

        <tbody>

          {companies.map((company) => (
            <CompanyRow
              key={company._id}
              company={company}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
}
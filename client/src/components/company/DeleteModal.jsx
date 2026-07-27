export default function DeleteModal({
  company,
  onConfirm,
  onCancel,
}) {
  if (!company) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-6">

        <h2 className="text-2xl font-bold text-white">
          Delete Company
        </h2>

        <p className="mt-4 text-slate-300">
          Are you sure you want to delete
          <span className="font-semibold text-red-400">
            {" "}
            {company.companyName}
          </span>
          ?
        </p>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onCancel}
            className="rounded-lg bg-slate-700 px-5 py-2 text-white hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(company._id)}
            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}
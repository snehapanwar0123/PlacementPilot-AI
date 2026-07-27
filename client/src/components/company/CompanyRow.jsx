import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function CompanyRow({
  company,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="border-b border-slate-800 hover:bg-slate-900 transition">

      <td className="px-6 py-4 font-medium">
        {company.companyName}
      </td>

      <td className="px-6 py-4">
        {company.role}
      </td>

      <td className="px-6 py-4">
        <StatusBadge status={company.status} />
      </td>

      <td className="px-6 py-4">
        {company.deadline
          ? new Date(company.deadline).toLocaleDateString()
          : "-"}
      </td>

      <td className="px-6 py-4">
        {company.salary || "-"}
      </td>

      <td className="px-6 py-4">
        <div className="flex gap-3">

          <button
            onClick={() => onEdit(company)}
            className="text-blue-400 hover:text-blue-300"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(company)}
            className="text-red-400 hover:text-red-300"
          >
            <Trash2 size={18} />
          </button>

        </div>
      </td>

    </tr>
  );
}
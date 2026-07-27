export default function StatusBadge({ status }) {
  const statusStyles = {
    Wishlist: "bg-slate-600 text-white",
    Applied: "bg-blue-600 text-white",
    "OA Scheduled": "bg-yellow-500 text-black",
    "OA Completed": "bg-orange-500 text-white",
    Interview: "bg-purple-600 text-white",
    Offer: "bg-green-600 text-white",
    Rejected: "bg-red-600 text-white",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[status] || "bg-slate-700 text-white"
      }`}
    >
      {status}
    </span>
  );
}
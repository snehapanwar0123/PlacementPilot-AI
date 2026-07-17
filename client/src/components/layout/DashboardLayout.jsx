export default function DashboardLayout({ sidebar, navbar, children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {navbar}

      <div className="flex">
        {sidebar}

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
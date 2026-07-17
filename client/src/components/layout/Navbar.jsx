import {
  Bell,
  Search,
  UserCircle,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-8">

      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          placeholder="Search..."
          className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2 pl-10 pr-4 text-white outline-none focus:border-violet-500"
        />
      </div>

      <div className="flex items-center gap-6">

        <Bell
          size={22}
          className="cursor-pointer text-slate-300 hover:text-white"
        />

        <div className="flex items-center gap-3">

          <UserCircle
            size={36}
            className="text-violet-500"
          />

          <div>
            <p className="font-semibold">
              {user?.name}
            </p>

            <p className="text-sm text-slate-400">
              {user?.email}
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}
import { NavLink, Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="flex h-full w-full flex-col items-center gap-8 p-4 sm:p-6 lg:p-8 mt-25">
      <div className="w-2/3 min-w-100">
        <h1 className="text-4xl text-slate-800 dark:text-slate-200 mb-5">User Settings</h1>
        <div className="flex flex-col min-h-150 w-full max-w-4xl rounded border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-800/50">
          <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
            <NavLink to="" end className={({ isActive }) => `
              px-4 py-2 font-medium hover:text-slate-800 dark:hover:text-slate-200
              ${isActive ? "border-b-2 border-blue-500 text-blue-500" : "text-slate-500 dark:text-slate-400 border-b-transparent"}
            `}>
              <button className="cursor-pointer">
                Settings
              </button>
            </NavLink>
            <NavLink to="schedule" className={({ isActive }) => `
              px-4 py-2 font-medium hover:text-slate-800 dark:hover:text-slate-200
              ${isActive ? "border-b-2 border-blue-500 text-blue-500" : "text-slate-500 dark:text-slate-400 border-b-transparent"}
            `}>
              <button className="cursor-pointer">
                My Schedule
              </button>
            </NavLink>
          </div>
          <div className="p-2 pt-6 flex flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
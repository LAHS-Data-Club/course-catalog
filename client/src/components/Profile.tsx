import { useContext } from "react";
import { Periods, PeriodsContext } from "./contexts/PeriodsContext";

export default function Profile() {
  const { periods, setPeriods } = useContext(PeriodsContext);
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPeriods((prev: Periods) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="flex h-full w-full flex-col items-center gap-8 p-4 sm:p-6 lg:p-8 mt-25">
      <div className="w-2/3 min-w-100">
        <h1 className="text-4xl text-slate-800 dark:text-slate-200 mb-5">User Profile</h1>
        <div className="w-full max-w-4xl rounded  border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-800/50">
          <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
            <button className="border-b-2 border-blue-500 px-4 py-2 font-semibold text-blue-500">
              My Schedule
            </button>
            <button className="px-4 py-2 font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200">
              Profile
            </button>
          </div>
          <div className="p-2 pt-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Your Classes</h2>
            <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">Enter your class names for each period. This will be shown on the home page.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(periods).map((period) => (
                <div key={period}>
                  <label htmlFor={period} className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {period.replace(/[{}]/g, "")}
                  </label>
                  <input
                    id={period}
                    type="text"
                    name={period}
                    placeholder="e.g. AP Calculus BC"
                    value={periods[period]}
                    onChange={handleInputChange}
                    className="w-full rounded-xs border border-slate-300 bg-white p-2 px-3 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

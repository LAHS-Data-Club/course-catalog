import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { PeriodsContext } from "../components/contexts/PeriodsContext";

function AppLayout() {
  const defaultPeriods = {
    "{Period 1}": "", "{Period 2}": "", "{Period 3}": "", "{Period 4}": "",
    "{Period 5}": "", "{Period 6}": "", "{Period 7}": "",
  };

  const [periods, setPeriods] = useState(() => {
    try {
      const stored = localStorage.getItem("periods");
      return stored ? JSON.parse(stored) : defaultPeriods;
    } catch {
      return defaultPeriods;
    }
  });

  useEffect(() => {
    localStorage.setItem("periods", JSON.stringify(periods));
  }, [periods]);

  return (
    <PeriodsContext.Provider value={{ periods, setPeriods }}>
      <div className="flex min-h-screen h-fit bg-slate-50 text-slate-800 dark:bg-gray-900 dark:text-slate-300">
        <Sidebar />
        <main className="w-full ml-22">
          <Outlet />
        </main>
      </div>
    </PeriodsContext.Provider>
  );
}

export default AppLayout;
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { PeriodsContext } from "../contexts/PeriodsContext";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

// TODO:
const defaultPeriods = {
  "{Period 1}": "", "{Period 2}": "", "{Period 3}": "", "{Period 4}": "",
  "{Period 5}": "", "{Period 6}": "", "{Period 7}": "",
};

export default function AppLayout() {
  const [isExpanded, setIsExpanded] = useState(false);

  // TODO: why is only one part try catched
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
      <div className="flex min-h-screen">
        {/** for normal & large screens */}
        <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <main className={`${isExpanded ? "lg:pl-60" : "lg:pl-22"} w-full flex-1 pb-16 lg:pb-0 p-4`}>
          <Outlet />
        </main>
        {/** for small screens */}
        <Navbar />  
      </div>
    </PeriodsContext.Provider>
  );
}
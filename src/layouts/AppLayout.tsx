import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { PeriodsContext } from "../components/PeriodsContext";

function AppLayout() {
  // maybe could just pass down instead of using context 
  // idk if this is right practice but someone else can figure it out :D
  const defaultPeriods = {
    "{Period 1}": "",
    "{Period 2}": "",
    "{Period 3}": "",
    "{Period 4}": "",
    "{Period 5}": "",
    "{Period 6}": "",
    "{Period 7}": ""
  };
  const storedPeriods = JSON.parse(localStorage.getItem('periods'));
  const [periods, setPeriods] = useState(storedPeriods || defaultPeriods);
  
  useEffect(() => {
    localStorage.setItem('periods', JSON.stringify(periods));
  }, [periods]);

  return (
    <PeriodsContext.Provider value={{ periods, setPeriods }}>
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-full ml-15 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </PeriodsContext.Provider>
  );
}

export default AppLayout;
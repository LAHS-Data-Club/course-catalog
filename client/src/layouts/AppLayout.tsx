import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { userOptions, scheduleOptions } from "../functions/queryOptions";
import { UserContext } from "../contexts/UserContext";

export default function AppLayout() {
  const [isExpanded, setIsExpanded] = useState(false); // sidebar
  // TODO: this isnt working and sometimes takes like 300 seconds to load
  const userQuery = useQuery(userOptions());

  const scheduleQuery = useQuery({
    ...scheduleOptions(),
    enabled: !!userQuery.data, 
  });

  console.log(scheduleQuery.data);

  return (
    <UserContext.Provider value={{ userQuery, scheduleQuery }}>
      <div className="flex min-h-screen">
        {/** for normal & large screens */}
        <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <main className={`${isExpanded ? "lg:pl-60" : "lg:pl-22"} w-full flex-1 pb-16 lg:pb-0 p-4`}>
          <Outlet />
        </main>
        {/** for small screens */}
        <Navbar />
      </div>
    </UserContext.Provider>
  );
}

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full ml-15 mt-5 overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
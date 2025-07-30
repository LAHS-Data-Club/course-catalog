import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaRegCalendarAlt, FaRegUserCircle, FaPeopleCarry } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="flex dark:bg-slate-900 fixed top-0 left-0 bottom-0 w-22 flex-col items-center border-r-4 border-slate-200 dark:border-slate-800 ">
      <div className="h-23 w-full dark:bg-slate-800"></div>
    
      <nav className="flex flex-col w-full">
        <SidebarItem path={"/"}>
          <FaHome className="w-7 h-7"/>
          <p>Home</p>
        </SidebarItem>
        <SidebarItem path={"/courses"}>
          <FaRegCalendarAlt className="w-7 h-7"/>
          <p>Courses</p>
        </SidebarItem>
        <SidebarItem path={"/clubs"}>
          <FaPeopleCarry className="w-7 h-7"/>
          <p>Clubs</p>
        </SidebarItem>
        <SidebarItem path={"/profile"}>
          <FaRegUserCircle className="w-7 h-7"/>
          <p>User</p>
        </SidebarItem>
      </nav>
      <div />
    </div>
  );
}

function SidebarItem({ path, children }) {
  const location = useLocation();
  const selected = location.pathname.startsWith(path) && path !== "/" || location.pathname === path

  return (
    <div className={`py-4 w-full cursor-pointer
      ${selected
        ? "bg-blue-500 text-white"
        : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"}
    `}>
      <NavLink to={path} className="flex gap-1 flex-col justify-center items-center">
        {children}
      </NavLink>
    </div>
  );
}
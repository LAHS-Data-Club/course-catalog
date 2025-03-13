import { NavLink, useLocation } from "react-router-dom";
import { Book, Home, User } from "lucide-react";

function Sidebar() {
  const currentRoute = useLocation().pathname;
  return (
    <div className="shadow-black shadow-md w-15 items-center fixed top-0 bottom-0 bg-secondary flex flex-col p-5 justify-between">
      <div className="w-5 h-5 bg-amber-50"></div>
      <nav className="flex flex-col gap-10 pb-5">
        <NavLink to="/">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              currentRoute === "/" ? "bg-gray-100/15" : ""
            }`}
          >
            <Home />
          </div>
        </NavLink>
        <NavLink to="/courses">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              currentRoute === "/courses" ? "bg-gray-100/15" : ""
            }`}
          >
            <Book />
          </div>
        </NavLink>
        <NavLink to="/profile">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              currentRoute === "/profile" ? "bg-gray-100/15" : ""
            }`}
          >
            <User />
          </div>
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;

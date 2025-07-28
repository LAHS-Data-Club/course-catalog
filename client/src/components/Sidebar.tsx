import { NavLink, useLocation } from "react-router-dom";
import { Book, Home, User } from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const navLinkClass = (path: string) => `
    flex h-12 w-12 items-center justify-center rounded-lg transition-colors
    ${
      location.pathname.startsWith(path) && path !== "/" || location.pathname === path
        ? "bg-blue-500 text-white"
        : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
    }
  `;

  return (
    <div className="fixed top-0 left-0 bottom-0 flex w-20 flex-col items-center justify-between border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/50">
      {/* Logo Placeholder */}
      <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
      
      <nav className="flex flex-col gap-4">
        <NavLink to="/">
          <div className={navLinkClass("/")}>
            <Home />
          </div>
        </NavLink>
        <NavLink to="/courses">
          <div className={navLinkClass("/courses")}>
            <Book />
          </div>
        </NavLink>
        <NavLink to="/profile">
          <div className={navLinkClass("/profile")}>
            <User />
          </div>
        </NavLink>
      </nav>

      {/* Spacer */}
      <div />
    </div>
  );
}

export default Sidebar;
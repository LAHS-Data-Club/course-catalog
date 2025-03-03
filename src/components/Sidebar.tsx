import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="shadow-black shadow-md w-15 items-center fixed top-0 bottom-0 bg-secondary flex flex-col p-5 justify-between">
      <div className="w-5 h-5 bg-amber-50"></div>
      <nav className="flex flex-col gap-5">
        <NavLink to='/'>
          <div className="cursor-pointer w-5 h-5 bg-amber-50"></div>
        </NavLink>
        <NavLink>
          <div className="w-5 h-5 bg-amber-50"></div>
        </NavLink>
        <NavLink to='/profile'>
          <div className="cursor-pointer w-5 h-5 bg-amber-50"></div>
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
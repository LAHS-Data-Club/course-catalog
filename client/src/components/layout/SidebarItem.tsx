import { NavLink } from "react-router-dom";
import { IconType } from "react-icons/lib";

interface Props {
  to: string;
  icon: IconType;
  isExpanded: boolean;
  children?: React.ReactNode;
}

export default function SidebarItem({ isExpanded, to, icon, children }: Props) {
  const Icon = icon;
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        overflow-hidden flex-1 flex justify-center lg:justify-normal items-center gap-3 px-7 py-5 transition-colors
        ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}
      `}
    >
      <span><Icon size={27} className="text-white" /></span>
      {isExpanded && (<span>{children}</span>)}
    </NavLink>
  );
}
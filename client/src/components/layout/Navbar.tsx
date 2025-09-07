import SidebarItem from "./SidebarItem";
import { routes } from "../../functions/routes";

export default function Navbar() {
  return (
    <div className="z-20 lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-gray-900 border-t border-gray-700 flex">
      {routes.map(({ path, icon }) => (
        <SidebarItem 
          key={path}
          to={path} 
          icon={icon} 
          isExpanded={false}
        />
      ))}
    </div>
  );
}
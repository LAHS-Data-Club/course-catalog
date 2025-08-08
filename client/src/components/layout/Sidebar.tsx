import SidebarItem from "./SidebarItem";
import { routes } from "../../functions/routes";
import { FaBars } from "react-icons/fa";

interface Props {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ isExpanded, setIsExpanded }: Props) {
  return (
    <div
      className={`transition-all hidden lg:flex flex-col items-center fixed top-0 left-0 bottom-0 bg-gray-800 ${
        isExpanded ? "w-60" : "w-22"
      }`}
    >
      <div className={`${isExpanded ? "justify-between" : "justify-center"} h-25 flex items-center w-full px-4 py-6 border-b border-gray-700`}>
        {isExpanded && (
          <h1 className="text-3xl font-bold text-white px-2">
            lahs.<span className="text-blue-400">-</span>
          </h1>
        )}
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="p-2 rounded hover:bg-gray-700 cursor-pointer transition"
        >
          <FaBars size={22} className="text-white" />
        </button>
      </div>

      <nav className="flex flex-col w-full">
        {routes.map(({ path, icon, label }) => (
          <SidebarItem 
            key={path}
            to={path} 
            icon={icon} 
            isExpanded={isExpanded}
          >
            {label}
          </SidebarItem>
        ))}
      </nav>
    </div>
  );
}

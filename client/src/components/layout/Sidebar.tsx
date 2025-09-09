import SidebarItem from "./SidebarItem";
import { routes } from "../../functions/routes";
import { FaBars } from "react-icons/fa";
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import { userOptions } from "../../functions/queryOptions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ isExpanded, setIsExpanded }: Props) {
  const [showSignOut, setShowSignOut] = useState(false);
  const userQuery = useQuery(userOptions());
  // redirect to google oauth page
  // TODO: repeated logic
  function handleSignIn() {
    const redirect = encodeURIComponent(window.location.href);
    window.location.href = `/api/login?redirect=${redirect}`;
  }
  

  return (
    <div
      className={`hidden lg:flex flex-col items-center fixed top-0 left-0 bottom-0 bg-gray-900 border-r border-gray-700  ${
        isExpanded ? "w-60" : "w-22"
      }`}
    >
      <div className={`${isExpanded ? "justify-between" : "justify-center"} h-25 flex items-center w-full px-4 py-6 border-b border-gray-700`}>
        {isExpanded && (
          <h1 className="text-3xl font-bold text-white px-2">
            lahs.<span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">+</span>
          </h1>
        )}
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="p-2 rounded hover:bg-gray-700 cursor-pointer transition"
        >
          <FaBars size={22} className="text-white" />
        </button>
      </div>

      <nav className="flex flex-col w-full justify-between flex-1">
        <div>
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
        </div> 
        {userQuery.data ? 
        <div className="relative">
          <button 
            onClick={() => setShowSignOut(prev => !prev)}
            className='w-full cursor-pointer hover:bg-gray-700 border-t border-gray-700 overflow-hidden flex justify-center lg:justify-normal items-center px-4.5 py-4.5'
          >
            <span><img src={userQuery.data.picture} className="w-12 rounded-full border-gray-700 border-4 grayscale-[10%] brightness-90 contrast-90"/></span>
            {isExpanded && (<p className = "px-4 font-semibold">{userQuery.data.name}</p>)}
          </button>   
          {showSignOut &&
          <button className="absolute top-0 left-full ml-2 text-white px-6 rounded-sm whitespace-nowrap py-6 flex gap-2 bg-slate-800 cursor-pointer hover:bg-gray-700 border border-gray-700 ">
            <span><PiSignOutBold size={27} className="text-white"/></span>
            Sign out 
          </button>}
        </div>
        : 
        <button 
          onClick={handleSignIn}
          className='cursor-pointer hover:bg-gray-700 border-t border-gray-700 overflow-hidden flex justify-center lg:justify-normal items-center gap-3 px-7 py-5 transition-colors'
        >
          <span><PiSignInBold size={27} className="text-white" /></span>
          {isExpanded && (<p>Sign In</p>)}
        </button>}
      </nav>
    </div>
  );
}

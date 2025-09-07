import { useContext, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import Schedule from "./Schedule";
import ShareDialog from "./ShareDialog";
import { UserContext } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import { groupOptions } from "../../functions/queryOptions";
import { useQuery } from "@tanstack/react-query";
import { createInvite } from "../../functions/api";

export default function ScheduleGroup() {
  const { id } = useParams(); 
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false); 
  const { userQuery } = useContext(UserContext);
  const groupQuery = useQuery(groupOptions());

  const group = groupQuery.data?.find((g) => g.id.toString() === id);
  if (!group) return <p>Group not found</p>;
  
  return (
    <div className="flex flex-col lg:flex-row h-full w-full max-w-350 gap-8">

      {/* Main Content */}
      <div className="flex-1 flex-col flex gap-2 justify-end">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedIndex((selectedIndex - 1) % group.members.length)}
            className="cursor-pointer rounded border px-2 py-2 transition w-20 flex justify-center border-slate-700 text-slate-300 bg-slate-800 hover:bg-slate-700"
          >
            <FaAngleLeft size={20} />
          </button>
          <button
            onClick={() => setSelectedIndex((selectedIndex + 1) % group.members.length)}
            className="cursor-pointer rounded border px-2 py-2 transition w-20 flex justify-center border-slate-700 text-slate-300 bg-slate-800 hover:bg-slate-700"
          >
            <FaAngleRight size={20} />
          </button>
        </div>
        <Schedule user={userQuery.data} group={group} selectedIndex={selectedIndex} />
      </div>

      {/* Side Panel */}
      <div className="w-70 flex flex-col rounded border border-slate-700 bg-slate-800">
        <div className="flex items-center justify-between border-b px-5 py-4 border-slate-700">
          <h3 className="text-sm font-semibold text-slate-200">
            {`Members (${group.members.length})`}
          </h3>
          <button 
            className="cursor-pointer flex items-center gap-2 rounded border px-3 py-1.5 text-sm transition-colors border-slate-700 text-slate-300 hover:bg-slate-700"
            onClick={() => setShowShareMenu(true)}
          >
            <IoPersonAddOutline size={17}/>
            Add
          </button>
        </div>
        
        {/** Members List */}
        <div className="overflow-auto p-4">
          <p className="text-xs text-slate-400 mb-4">Click to jump to a schedule.</p>
          <ul className="space-y-1">
            {group.members.map((member, i) => {
              const isActive = i === selectedIndex;
              return (
                <li key={member.id}>
                  <button
                    onClick={() => setSelectedIndex(i)}
                    className={`
                      cursor-pointer flex w-full items-center justify-between rounded p-3 transition border hover:bg-blue-900/70
                      ${isActive 
                        ? "border-blue-900 bg-blue-900/50 text-blue-300"
                        : "text-slate-300"}
                    `}
                  >
                    <p>{member.name} {member.id === userQuery.data.id && "(You)"}</p>
                    {isActive && (
                      <span className="rounded-full border px-2 py-0.5 text-xs border-blue-300 text-blue-300">
                        Viewing
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/** Dialogs TODO: idk if it should go here */}
      <ShareDialog
        open={showShareMenu}
        onClose={() => setShowShareMenu(false)}
        groupId={group.id}
      />
    </div>
  );
}
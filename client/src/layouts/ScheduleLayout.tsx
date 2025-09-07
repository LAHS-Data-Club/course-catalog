import { useState } from "react";
import { NavLink } from "react-router-dom";
import { createGroup } from "../functions/api"; // add createGroup(title: string)
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { groupOptions } from "../functions/queryOptions";
import { IoIosAdd } from "react-icons/io";
import GroupDialog from "../components/schedules/GroupDialog";
import { Outlet } from "react-router-dom";
import { useOutlet } from "react-router-dom";

export default function ScheduleLayout() {
  const queryClient = useQueryClient();
  const outlet = useOutlet();
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const groupsQuery = useQuery(groupOptions());
  const groupsMutation = useMutation({
    mutationFn: (groupName: string) => createGroup(groupName),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["schedule", "groups"] }),
  });

  // TODO: sanitize all user inputs 
  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = (e.target as HTMLFormElement).name.value.trim(); // TODO: 
    groupsMutation.mutate(name);
    setShowCreateGroup(false);
  };  

  if (groupsQuery.isPending) return <p>Loading...</p>;

  return (
    <div className="mx-auto max-w-7xl p-3 sm:p-5 lg:p-6 mt-12 w-full">
      <h1 className="text-4xl text-slate-200 mb-1">Schedule Sharing</h1>
      <p className="max-w-2xl text-slate-400 mb-5">
        Create groups to share your schedule with others.
      </p>
      <nav className="mb-10 border-b border-slate-700 flex space-x-3 overflow-x-scroll">
        {/** Add Group */}
        <button
          onClick={() => setShowCreateGroup(true)}
          className={`p-4 cursor-pointer border-x border-t border-slate-700 transition hover:bg-slate-800`}
        >
          <IoIosAdd size={23} />
        </button>
        {/** Groups */}
        <div className="flex flex-nowrap">
          {groupsQuery.data.map((group) => (
            <NavLink
              key={group.id}
              to={`${group.id}`}
              className={({ isActive }) => `
                whitespace-nowrap p-4 transition-colors cursor-pointer 
                ${isActive ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-800'}
              `}
            >
              {group.title}
            </NavLink>
          ))}
          {/** Optimistic UI */}
          {groupsMutation.isPending && (
            <button
              disabled={true}
              className="cursor-not-allowed whitespace-nowrap p-4 transition-colors hover:bg-slate-100 text-slate-300 opacity-50"
            >
              {groupsMutation.variables}
            </button>
          )}
        </div>
      </nav>
      
      {/** Group Creation Screen */} {/** TODO: idk if they should go here */}
      <GroupDialog open={showCreateGroup} onClose={() => setShowCreateGroup(false)} onSubmit={handleCreateGroup} />

      {/** Main Content */}
      {outlet ? <Outlet /> : <p className="text-center text-slate-500">Please select a group.</p>}
    </div>
  );
}

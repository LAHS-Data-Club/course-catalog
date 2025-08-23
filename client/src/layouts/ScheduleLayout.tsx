import { useEffect, useState, useContext } from "react";
import ScheduleGroup from "../functions/schedules/ScheduleGroup";
import { fetchGroups, createGroup } from "../functions/api"; // add createGroup(title: string)
import { UserContext } from "../contexts/UserContext";
import type { Group } from "../lib/types";
import Modal from "../components/Modal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { groupOptions } from "../functions/queryOptions";


// TODO: cache user or smth like that idk... but display it first w like a staletime
// TODO: creating groups does not work properly

export default function ScheduleLayout() {
  const queryClient = useQueryClient();
  const { userQuery } = useContext(UserContext);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  // TODO: it doesnt update...
  const groupsQuery = useQuery(groupOptions());
  const groupsMutation = useMutation({
    mutationFn: (groupName: string) => createGroup(groupName),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['schedule', 'groups'] }),
  });

  // TODO: sanitize all user inputs kms 
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = (e.target as HTMLFormElement).name.value.trim(); 
    setShowCreateGroup(false);
    groupsMutation.mutate(name);
  };

  if (groupsQuery.isPending) return <p>Loading...</p>;

  return (
    <div className="mx-auto max-w-7xl p-3 sm:p-5 lg:p-6 mt-12 w-full">
      <h1 className="text-4xl text-slate-800 dark:text-slate-200 mb-5">Schedule Sharing</h1>
      <p className="max-w-2xl text-slate-600 dark:text-slate-400 mb-5">
        <span className="text-slate-700 dark:text-blue-400 font-semibold">Click</span> a group to view schedules or <span className="text-slate-700 font-semibold dark:text-blue-400">create</span> a new one.
      </p>

      <div className="mb-7 border-b border-slate-200 dark:border-slate-700"> 
        <nav className="flex space-x-3 overflow-x-scroll overflow-y-hidden justify-between">
          <div>
            {groupsQuery.data.map((group) => (
              <button
                onClick={() => setSelectedGroup(group)}
                key={group.id}
                className={`whitespace-nowrap p-4 transition-colors cursor-pointer ${
                  selectedGroup?.id === group.id
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {group.title}
              </button>
            ))}
            {/** optimistic updates */}
            {groupsMutation.isPending && (
              <button
                disabled={true}
                className="cursor-not-allowed whitespace-nowrap p-4 transition-colors text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800' opacity-50"
              >
                {groupsMutation.variables}
              </button>
            )}
          </div>
          <button
            onClick={() => setShowCreateGroup(true)}
            className={`p-4 cursor-pointer dark:bg-slate-700 transition hover:bg-blue-500`}
          >
              Create +
            </button>
        </nav>
      </div>

      {showCreateGroup && (
        <Modal onClose={() => setShowCreateGroup(false)}>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Create a new group
          </h3>
          <form
            onSubmit={handleCreate}
            className="flex gap-5 justify-center items-center"
          >
            <label htmlFor="name">Group Name:</label>
            <input
              name="name"
              id="name"
              type="text"
              placeholder="Enter group name..."
              className="w-full flex-1 rounded border border-slate-300 bg-white p-2.5 px-4 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            />
            <button
              type="submit"
              className="cursor-pointer max-w-30 flex-1 rounded border border-slate-300 bg-white p-2.5 px-4 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"me="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
            >
              Create
            </button> 
          </form>
        </Modal>
      )}

      {/** TODO: main */}
      {selectedGroup && <ScheduleGroup user={userQuery.data} group={selectedGroup} />}
    </div>
  );
}

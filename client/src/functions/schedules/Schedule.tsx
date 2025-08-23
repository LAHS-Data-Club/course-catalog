import type { Group, User } from "../../lib/types";

interface Props {
  user: any;
  group: Group;
  member: User;
}

export default function Schedule({ user, group, member }: Props) {
  const isUserSchedule = member.google_id === user.id; 

  return (
    <div className="max-w-2xl bg-white dark:bg-slate-800 rounded p-6">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
        {isUserSchedule ? "Your Schedule" : `${member.name}'s Schedule`}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {Object.entries(member.schedule).map(([period, course]) => {
          // people in the group who share the same class
          const sharedWith = group.members
            .filter((m) => m.schedule[period] === course)
            .filter((m) => !(isUserSchedule && m.google_id === user.id));
            
          return (
            <div
              key={period}
              className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-4 space-y-1"
            >
              <p>{period.replace(/[{}]/g, "")}</p>
              <p className="font-semibold">{course}</p>
              {sharedWith.length > 0 && (
                <p className="text-sm font-medium text-slate-500">
                  {"with: "}
                  <span>
                    {sharedWith.map((u, i) => {
                      const isUser = u.google_id === user.id;
                      return (
                        <span 
                          key={u.google_id} 
                          className={`${isUser && "text-blue-400 font-semibold"}`}
                        >
                          {isUser ? "You" : u.name}{i < sharedWith.length - 1 && ", "}
                        </span>
                      );
                    })}
                  </span>
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}
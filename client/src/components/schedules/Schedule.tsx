import type { Group } from "../../lib/types";

interface Props {
  user: any;
  group: Group;
  selectedIndex: number;
}

export default function Schedule({ user, group, selectedIndex }: Props) {
  const member = group.members[selectedIndex];
  const yourSchedule = member.id === user.id; 

  // TODO: incl. teachers req
  function inSameClass(periodNum: number, course: string) {
    return group.members
      .filter((m) => m.schedule[periodNum].class === course)
      .filter((m) => m.id !== user.id);
  }

  console.log(member);
  console.log(group);

  return (
    <div className="max-w-300 w-full bg-slate-800 rounded-sm p-6 border border-slate-700">
      <h2 className="text-xl text-slate-800 dark:text-slate-100 mb-4">
        {`${member.name} ${yourSchedule && "(You)"}`}
      </h2>
      <div className="space-y-2">
        {Object.entries(member.schedule).map(([key, period]) => {
          const classmates = inSameClass(key, period.class);
          return (
            <div
              key={key} // period #
              className="w-full h-16 flex rounded border border-slate-600" 
            >
              <div className="flex-shrink-0 text-lg border-r border-slate-600 w-15 flex items-center justify-center">
                {key}
              </div>
              <div className="px-4 flex flex-col justify-center overflow-hidden">
                <p className="text-nowrap truncate w-full">
                  <span className="font-semibold">{period.class || "Free"}</span>
                  <span className="text-slate-500 text-nowrap"> {period.teacher ? " — " + period.teacher : ""}</span> {/** TODO: replace with teacher */}
                </p>
                {classmates.length > 0 && (
                  <p className="text-sm font-medium text-slate-400">
                    {"with: "}
                    <span>
                      {classmates.map((u, i) => {
                        const isUser = u.id === user.id;
                        return (
                          <span 
                            key={u.id} 
                            className={`${isUser && "text-blue-400"}`}
                          >
                            {isUser ? "You" : u.name}{i < classmates.length - 1 && ", "}
                          </span>
                        );
                      })}
                    </span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
import { DateTime } from "luxon";
import { useContext } from "react";
import { useCalendar } from "../../functions/calendar/useCalendar";
import { UserContext } from "../../contexts/UserContext";

export default function ClassList({ date }: { date: DateTime }) {
  const { scheduleQuery } = useContext(UserContext);
  const { data, isError, isPending } = useCalendar(date);

  if (isError) return <div>Sorry, a network error occurred.</div>;
  if (isPending) return <div>Loading...</div>;

  // this is so incredibly awfully written help
  const scheduleData = Object.values(data)[0].schedule;
  const keys = Object.keys(scheduleData);
  const schedule = keys
    .map((time, index) => ({
      startTime: time,
      endTime: keys[index + 1],
      name: scheduleData[time],
    }))
    .filter((x) => !(x.name.includes("Free") || x.name.includes("Passing")));

  return (
    <div className="w-full">
      {schedule.length > 0 ? (
        <div className="space-y-2.5"> 
          {schedule.map((item) => (
            <div 
              key={item.startTime} 
              className="flex flex-col rounded-sm p-3.5 ring-1 ring-slate-200/80 dark:ring-slate-700 border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-800"
            > 
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {item.name.replace(/[{}]/g, "")}
                  </p>
                  {scheduleQuery.data[item.name] && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">{scheduleQuery.data[item.name]}</p>
                  )}
                </div>
                <div className="text-slate-500 dark:text-slate-400">
                  {item.startTime} - {item.endTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center rounded-xl border-dashed border-2 border-slate-300 dark:border-slate-700 p-12">
          <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">No School Today</h4>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Enjoy your day off!</p>
        </div>
      )}
    </div>
  );
}
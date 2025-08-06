import { DateTime } from "luxon";
import { getSchedule } from "../../functions/schedules";
import { useContext } from "react";
import { PeriodsContext } from "../../contexts/PeriodsContext";
import { useCalendar } from "../../functions/useCalendar";

export default function ClassList({ date }: { date: DateTime}) {
  const { periods } = useContext(PeriodsContext);
  const { events, isError, isPending } = useCalendar(date);

  if (isError) return <div>Sorry, a network error occurred.</div>;
  if (isPending) return <div>Loading...</div>;

  const data = getSchedule(date, events);
  // TODO: maybe change the structure of schedule so that this isnt so silly
  const keys = Object.keys(data.schedule);
  const schedule = keys
    .map((curr, index) => ({
      startTime: curr,
      endTime: keys[index + 1],
      name: data.schedule[curr],
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
                  {periods[item.name] && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">{periods[item.name]}</p>
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
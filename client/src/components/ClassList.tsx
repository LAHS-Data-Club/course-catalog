import { DateTime } from "luxon";
import { getSchedule } from "./functions/schedules";
import { useEffect, useState, useContext } from "react";
import { PeriodsContext } from "./contexts/PeriodsContext";

interface Period {
  startTime: string;
  endTime: string;
  name: string;
}

interface Props {
  date: DateTime;
}

export default function ClassList({ date }: Props) {
  const { periods } = useContext(PeriodsContext);
  const [schedule, setSchedule] = useState<Period[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // make this more readable
  useEffect(() => {
    async function formatSchedule() {
      setLoaded(false);
      try {
        const res = await getSchedule(date);
        if (res && res.schedule) {
          const keys = Object.keys(res.schedule);
          const formattedSchedule = keys
            .map((curr, index) => ({
              startTime: curr,
              endTime: keys[index + 1],
              name: res.schedule[curr],
            }))
            .filter(
              (item) =>
                !item.name.includes("Passing") && !item.name.includes("Free")
            );
          setSchedule(formattedSchedule);
        } else {
          setSchedule([]);
        }
      } catch (err) {
        console.log(err);
        setError(true);
      }
      setLoaded(true);
    }
    formatSchedule();
  }, [date]);

  if (error) return <div>Sorry, a network error occurred.</div>;
  if (!loaded) return <div>Loading...</div>;

  return (
    <div className="w-full">
      {schedule.length > 0 ? (

        <div className="space-y-2.5"> 
          {schedule.map((item) => (
            <div key={item.startTime} className="rounded-sm border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-800"> 
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
        <div className="text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-12">
          <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">No School Today</h4>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Enjoy your day off!</p>
        </div>
      )}
    </div>
  );
}
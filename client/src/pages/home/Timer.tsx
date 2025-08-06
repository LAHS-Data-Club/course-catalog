import { useState, useEffect, useContext } from "react";
import { DateTime, Duration } from "luxon";
import { useCurrEvent } from "../../functions/useCalendar2";
import { PeriodsContext } from "../../contexts/PeriodsContext";

const offset = { hours: 0 }; // for testing

// this is really silly - version using google calendar api
// TODO: version using bell.plus txt file
export default function Timer() {
  const { periods } = useContext(PeriodsContext);
  const { startTime, endTime, isLoading, update } = useCurrEvent(); 
  const [timeRemaining, setTimeRemaining] = useState<Duration | null>(null);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (!isLoading) {
        const now = DateTime.now()
          .setZone("America/Los_Angeles")
          .plus(offset);
        setTimeRemaining(endTime.diff(now));
        update();
      }
    }, 100);
    return () => clearInterval(countdownInterval);
  }, [endTime, isLoading, update]);

  // TODO: isLoading isnt working ehhh
  // TODO: timeRemaining isn't set until AFTER render and effect runs so theres a delay
  const formattedTime = timeRemaining && timeRemaining.toMillis() > 0
      ? timeRemaining.toFormat("h:mm:ss")
      : "";

  let percentDone = 0;
  if (timeRemaining) {
    const total = endTime.diff(startTime).toMillis();
    const passed = total - timeRemaining.toMillis();
    percentDone = (passed / total) * 100;
  }
  
  return (
    <div className="w-full rounded ring-1 ring-slate-200/80 dark:ring-slate-700">
      <div className="bg-white shadow-sm dark:bg-slate-900 w-full h-2 rounded-t-sm overflow-hidden">
        <div
          style={{ width: `${percentDone}%` }}
          className="transition-all duration-300 ease-in-out h-full bg-blue-500"
        />
      </div>
      <div className="flex h-45 flex-wrap items-center justify-between gap-4 p-6 rounded-b ring-1 bg-white dark:bg-slate-800 ring-slate-200/80 dark:ring-slate-700">
        {!isLoading ? (
          <>
            <div className="flex items-end text-5xl sm:text-6xl tracking-wide text-slate-800 dark:text-slate-100">
              {formattedTime}
            </div>
            <div className="text-right text-slate-500 dark:text-slate-400">
              {/* <div className="font-semibold text-slate-700 dark:text-slate-300">
                {periods[currentEvent.name] || currentEvent.name.replace(/[{}]/g, "")}
              </div> */}
              {/* <div className="text-sm">{currentEvent.scheduleType}</div> */}
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

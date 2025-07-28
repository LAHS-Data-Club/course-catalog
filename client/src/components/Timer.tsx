import { useState, useEffect, useRef, useContext } from "react";
import { DateTime, Duration } from "luxon";
import getCurrentEvent from "./functions/util";
import { PeriodsContext } from "./contexts/PeriodsContext";
import { Square } from "ldrs/react";

const offset = { days: 0 };

interface Event {
  endTime: DateTime;
  startTime: DateTime;
  scheduleType: string;
  name: string;
}

function Timer() {
  const { periods } = useContext(PeriodsContext);
  const [loaded, setLoaded] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<Duration | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    async function updateEvent() {
      try {
        const event = await getCurrentEvent();
        setCurrentEvent(event);
        setLoaded(true);
      } catch (e) {
        console.error("Failed to get current event", e);
      }
    }
    
    updateEvent();
  
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(async () => {
      const now = DateTime.now().setZone("America/Los_Angeles").plus(offset);
      if (currentEvent && now > currentEvent.endTime) {
        setLoaded(false);
        await updateEvent();
      } else if (currentEvent) {
        setTimeRemaining(currentEvent.endTime.diff(now));
      }
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentEvent?.endTime]);

  const [h, m, s] = timeRemaining ? timeRemaining.toFormat("h:m:s").split(':') : ["0", "00", "00"];

  let percentDone = 0;
  if (currentEvent && timeRemaining) {
    const totalDuration = currentEvent.endTime.diff(currentEvent.startTime).toMillis();
    const remainingDuration = timeRemaining.toMillis();
    if (totalDuration > 0) {
      percentDone = ((totalDuration - remainingDuration) / totalDuration) * 100;
    }
  }
  
  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
      <div className="w-full h-2 bg-slate-200 dark:bg-slate-900/50 rounded-t-xl overflow-hidden">
        <div
          style={{ width: `${percentDone}%` }}
          className="h-full bg-indigo-500 transition-all duration-500 ease-linear"
        />
      </div>
      <div className="flex min-h-[6rem] flex-wrap items-center justify-between gap-4 p-6">
        {loaded && currentEvent ? (
          <>
            <div className="flex items-end font-bold text-5xl sm:text-6xl tracking-tight text-slate-800 dark:text-slate-100">
              <span>{h}</span>
              <span className="mb-1 mx-1 text-4xl text-slate-400 dark:text-slate-500 font-medium">:</span>
              <span>{m}</span>
              <span className="mb-1 mx-1 text-4xl text-slate-400 dark:text-slate-500 font-medium">:</span>
              <span>{s}</span>
            </div>
            <div className="text-right text-slate-500 dark:text-slate-400">
              <div className="font-semibold text-slate-700 dark:text-slate-300">
                {periods[currentEvent.name] || currentEvent.name.replace(/[{}]/g, "")}
              </div>
              <div className="text-sm">{currentEvent.scheduleType}</div>
            </div>
          </>
        ) : (
          <div className="flex w-full items-center justify-center">
             <Square size="35" stroke="5" stroke-length="0.25" bg-opacity="0.1" speed="1.2" color="currentColor" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Timer;
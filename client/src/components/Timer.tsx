import { useState, useEffect, useRef, useContext } from "react";
import { DateTime, Duration } from "luxon";
import getCurrentEvent from "./functions/util";
import { PeriodsContext } from "./contexts/PeriodsContext";
import { Square } from "ldrs/react";

const offset = { days: 0 }; // for testing

interface Event {
  endTime: DateTime;
  startTime: DateTime;
  scheduleType: string;
  name: string;
}

// check if its still off from bell
function Timer() {
  const { periods } = useContext(PeriodsContext);
  const [loaded, setLoaded] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<Duration | null>(null);
  const showNextRef = useRef(true); // i dont know why this exists someone save me aaaaaaaaaaaaaa

  useEffect(() => {
    async function initialize() {
      const currentEvent = await getCurrentEvent();
      const now = DateTime.now().setZone("America/Los_Angeles").plus(offset);
      setCurrentEvent(currentEvent);
      setTimeRemaining(currentEvent.endTime.diff(now));
      setLoaded(true);
    }
    initialize();
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(async () => {
      if (loaded && showNextRef.current) {
        const now = DateTime.now().setZone("America/Los_Angeles").plus(offset);
        let remaining = currentEvent?.endTime.diff(now);
        if (remaining && remaining.milliseconds <= 0) {
          showNextRef.current = false;
          setLoaded(false);
          const newEvent = await getCurrentEvent();
          remaining = newEvent.endTime.diff(now);
          setCurrentEvent(newEvent);
          showNextRef.current = true;
          setLoaded(true);
        }
        setTimeRemaining(remaining || null);
      }
    }, 100);

    return () => clearInterval(countdownInterval);
  }, [currentEvent, loaded]);

  const formattedTime = timeRemaining
    ? Duration.fromObject({
        milliseconds: timeRemaining.toMillis() - 1,
      }).toFormat("h:mm:ss")
    : "0:00:00";

  let percentDone = 0;
  if (currentEvent) {
    const total = currentEvent.endTime.diff(currentEvent.startTime);
    const passed = total.toMillis() - (timeRemaining?.toMillis() || 0);
    percentDone = (passed / total.toMillis()) * 100;
  }
  
  return (
    <div className="w-full rounded border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
      <div className="w-full h-2 bg-slate-200 dark:bg-slate-900 rounded-t-sm overflow-hidden">
        <div
          style={{ width: `${percentDone}%` }}
          className="h-full bg-blue-500"
        />
      </div>
      <div className="flex min-h-[10rem] flex-wrap items-center justify-between gap-4 p-6">
        {loaded && currentEvent ? (
          <>
            <div className="flex items-end text-5xl sm:text-6xl tracking-wide text-slate-800 dark:text-slate-100">
              {formattedTime}
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
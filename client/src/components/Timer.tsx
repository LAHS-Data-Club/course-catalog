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
  }, [currentEvent]);

  const formattedTime = timeRemaining
    ? Duration.fromObject({
        milliseconds: timeRemaining.toMillis() - 1,
      }).toFormat("h:mm:ss")
    : "0:00:00";

  let percentDone;
  if (currentEvent) {
    const total = currentEvent.endTime.diff(currentEvent.startTime);
    const passed = total.toMillis() - (timeRemaining?.toMillis() || 0);
    percentDone = (passed / total.toMillis()) * 100;
  }

  return (
    <div className="w-[calc(43%+120px)] mt-4">
      {/** annoying css for small screens -- like the free/no school part bounces around */}
      <div
        style={{ width: (percentDone || 0) + "%" }}
        className="bg-blue-400 h-1.5"
      ></div>
      <div className=" h-35 p-6 bg-secondary flex-wrap min-w-fit flex items-center justify-between rounded-r-md rounded-bl-md">
        {loaded ? (
          <>
            <div className="text-6xl drop-shadow-lg">{formattedTime}</div>
            <div className="text-right self-end">
              <div>
                {currentEvent &&
                  (periods[currentEvent.name] ||
                    currentEvent.name.replace(/[{}]/g, ""))}
              </div>
              <div>{currentEvent?.scheduleType}</div>
            </div>
          </>
        ) : (
          <div className="w-full flex justify-center">
            <Square
              size="35"
              stroke="5"
              stroke-length="0.25"
              bg-opacity="0.1"
              speed="1.2"
              color="white"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Timer;

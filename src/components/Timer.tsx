import { useState, useEffect, useRef } from "react";
import { DateTime, Duration } from 'luxon';
import getCurrentEvent from "../functions/util";
import { square } from 'ldrs';
square.register();

const offset = { hours: 0 }; // for testing

interface Event {
  endTime: DateTime,
  startTime: DateTime, 
  scheduleType: string,
  name: string
}

function Timer({ periods }) {
  const [loaded, setLoaded] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event>(null);
  const [timeRemaining, setTimeRemaining] = useState<Duration>(null);
  const showNextRef = useRef(true); // i dont know someone save me aosndoajsdoiasdoasdddddd

  /** i have no clue how to code someone fixif dixifixiifixifixifiisxifixi please thanks
   * bad transition between events due to async
   * off by bell by 1 sec :skull:
   * maybe we can just steal from bell lol
   */
  useEffect(() => {
    async function initialize() {
      const currentEvent = await getCurrentEvent();
      const now = DateTime.now().setZone('America/Los_Angeles').plus(offset);
      setCurrentEvent(currentEvent);
      setTimeRemaining(currentEvent.endTime.diff(now));
      setLoaded(true);
    }
    initialize();
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(async () => {
      if (loaded && showNextRef.current) {
        const now = DateTime.now().setZone('America/Los_Angeles').plus(offset);
        let remaining = currentEvent.endTime.diff(now);
        if (remaining <= 0) { 
          showNextRef.current = false; 
          setLoaded(false);
          const newEvent = await getCurrentEvent();
          remaining = newEvent.endTime.diff(now);
          setCurrentEvent(newEvent);
          showNextRef.current = true;
          setLoaded(true);
        }
        setTimeRemaining(remaining);
      }
    }, 200); // this might be too much but it was out of sync when i had 500

    return (() => clearInterval(countdownInterval));
  }, [currentEvent]); 

  const formattedTime = Duration.fromObject({ milliseconds: timeRemaining }).toFormat('h:mm:ss');
  
  let percentDone;
  if (currentEvent) {
    const total = currentEvent.endTime.diff(currentEvent.startTime);
    const passed = total - timeRemaining;
    percentDone = passed/total * 100;
  }

  return (
    <div className="w-[calc(43%+120px)] mt-4">
      {/** bar randomly shows up its kinda weird */}
      <div style={{width: (percentDone || 0) + '%'}} className="bg-blue-secondary h-1.5"></div>
      <div className=" h-35 p-6 bg-secondary flex-wrap min-w-fit flex items-center justify-between rounded-r-md rounded-bl-md">
        {loaded ? (
          <>
            <div className="text-6xl drop-shadow-lg">{formattedTime}</div>
            <div className="text-right self-end">
              <div>{periods[currentEvent.name] || currentEvent.name.replace(/[{}]/g, '')}</div>
              {/** shows odd block/schedule name even when its free -- should we keep that ? */}
              <div>{currentEvent.scheduleType}</div>
            </div>
          </>
        ) : (
          <l-square className="w-full flex justify-center" size="35" stroke="5" stroke-length="0.25" bg-opacity="0.1" speed="1.2" color="white"></l-square>
        )}
      </div>
    </div>

  );
}

export default Timer;
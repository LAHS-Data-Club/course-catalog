import { useState, useEffect, useRef } from "react";
import { DateTime, Duration } from 'luxon';
import { getNextEvent } from "../functions/util";
import { square } from 'ldrs'
square.register()

function Countdown() {
  const [loaded, setLoaded] = useState(false);
  const [endTime, setEndTime] = useState<DateTime>(null);
  const [timeRemaining, setTimeRemaining] = useState<Duration>(null);
  const showNextRef = useRef(true); // i dont know someone save me aosndoajsdoiasdoasdddddd

  /** i have no clue how to code someone fixif dixifixiifixifixifiisxifixi please thanks
   * race conditions due to async cause weird transition between events
   * off by bell by 1 sec
   * maybe we can just steal from bell lol
   */
  useEffect(() => {
    async function initialize() {
      const nextEvent = await getNextEvent();
      setEndTime(nextEvent);
      setTimeRemaining(nextEvent.diff(DateTime.now().plus({ days: 0 }))); // testing
      setLoaded(true);
    }
    initialize();
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(async () => {
      if (loaded && showNextRef.current) {
        const now = DateTime.now().plus({ days: 0 });
        let remaining = endTime.diff(now);
        if (remaining <= 0) { 
          showNextRef.current = false; // its so bad someone helop save meaoshdioqwoiejqowiheoiqhweoihqwoiehqoiwehoqiwehoi
          setLoaded(false);
          const newEnd = await getNextEvent();
          remaining = newEnd.diff(now);
          setEndTime(newEnd);
          showNextRef.current = true;
          setLoaded(true);
        }
        setTimeRemaining(remaining);
      }
    }, 100); // this might be too much but it was out of sync when i had 1000

    return (() => clearInterval(countdownInterval));
  }, [endTime]); 

  const formattedTime = Duration.fromObject({ milliseconds: timeRemaining }).toFormat('h:mm:ss');

  return(
    <div className="w-[calc(43%+120px)] mt-4">
      {/** replace - bar representing how far into clas will go here */}
      <div className="bg-blue-secondary h-1.5 w-2/3"></div> 
      <div className=" h-35 p-6 bg-secondary flex-wrap min-w-fit flex items-center justify-between rounded-r-md rounded-bl-md">
        {loaded ? (
          <>
            <div className="text-6xl drop-shadow-lg">{formattedTime}</div>
            <div className="text-right self-end">
              <div>Period 4</div> {/** replace */}
              <div>Even Block</div> {/** replace */}
            </div>
          </>
        ): (
          <l-square className="w-full flex justify-center" size="35" stroke="5" stroke-length="0.25" bg-opacity="0.1" speed="1.2" color="white"></l-square>
        )}
      </div>
    </div>

  );
}

export default Countdown;
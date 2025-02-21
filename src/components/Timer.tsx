import { useState, useEffect } from "react";
import { DateTime, Duration } from 'luxon';
import { getNextEvent } from "../functions/util";

function Countdown() {
  // /**  mock that returns dateTime of next event  */
  // function getNextDateTime() {
  //   return DateTime.now().plus({ seconds: 10 });
  // }

  // datetime, duration objects respectively
  const [endTime, setEndTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState();

  useEffect(() => {
    async function initialize() {
      setEndTime(await getNextEvent());
      console.log(endTime);
      setTimeRemaining(endTime.diff(DateTime.now()));
    }
    initialize();
  }, []);
  
  // fix akghhhaisdhoqwheihqwehqiuwheoiqwheoiffhHAHHHH it kinda works (lie)
  useEffect(() => {
    const countdownInterval = setInterval(async () => {
      const now = DateTime.now(); 
      let remaining = endTime.diff(now);
      if (remaining <= 0) { // think can just do <= 0
        const newEnd = await getNextEvent();
        remaining = newEnd.diff(now).minus({ seconds: 1 }); // idkkk
        setEndTime(newEnd);
      }
      setTimeRemaining(remaining);
    }, 1000);

    return (() => clearInterval(countdownInterval));
  }, [endTime]); // starts with 10 then jumps to 8 fix at some point

  const formattedTime = Duration.fromObject({ milliseconds: timeRemaining }).toFormat('h:mm:ss');

  return(
    <div className="w-2/3 mt-4">
      {/** bar representing how far into clas will go here */}
      <div className="bg-blue-400 h-1.5 w-3/4"></div> 
      <div className="h-35 p-6 bg-gray-700 justify-between flex items-center shadow-lg rounded-r-md rounded-bl-md">
        <div className="text-6xl drop-shadow-lg">{formattedTime}</div>
        <div className="text-right self-end">
          <div>Period 4</div> {/** replace */}
          <div>Even Block</div> {/** replace */}
        </div>
      </div>
    </div>

  );
}

export default Countdown;
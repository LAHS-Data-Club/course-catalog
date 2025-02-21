import { DateTime } from 'luxon';
import Timer from './Timer';

function Home() {
  const date = DateTime.now();
  const weekday = date.weekday;

  // if weekend: return no school
  // else parse calendar : if special schedule, return that
  // else parse weekday: mon - a, tues/thurs...


  // attempt at implementing a timer
  return (
    <div className="flex flex-col p-6 items-center">
      <div className="font-bold text-2xl w-fit">{date.weekdayLong}</div>
      <div className="text-lg w-fit">{date.toLocaleString(DateTime.DATE_FULL)}</div>
      <Timer />
      <div className="h-35 bg-amber-50 w-2/3 rounded"></div>
    </div>
  )
}

export default Home;
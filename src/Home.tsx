import { DateTime } from 'luxon';
import getSchedulefromName from './calendar/schedules';
import getSchedule from './calendar/calendar';

async function Home() {

  // regular schedule
  // 1-7 where monday is 1 and sunday is 7
  // function getScheduleFromDate(weekday: number): string {
  //   switch(weekday) {
  //     case 1:
  //       return 'a-schedule';
  //     case 2:
  //     case 4:
  //       return 'b-schedule';
  //     case 3:
  //     case 5:
  //       return 'c-schedule';
  //   }
  // }

  // const date = DateTime.now();
  // const weekday = date.weekday;

  // // if weekend: return no school
  // // else parse calendar : if special schedule, return that
  // // else parse weekday: mon - a, tues/thurs...
  // let scheduleName;
  // if (weekday === 6 || weekday === 7) {
  //   scheduleName = 'weekend';
  // } else {
  //   const schedule = await getSchedule();
  //   console.log(schedule);
  //   if (schedule) {
  //     scheduleName = getSchedulefromName(schedule);
  //   } else {

  //   }
  // }

  

  return (
    <div className="flex flex-col p-6 items-center">
      <div className="font-bold text-2xl w-fit">{date.weekdayLong}</div>
      <div className="text-lg w-fit">{date.toLocaleString(DateTime.DATE_FULL)}</div>
      <div className="h-35 bg-amber-50 w-2/3 rounded"></div>
    </div>
  )
}

export default Home;
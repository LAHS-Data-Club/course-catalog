import { DateTime } from 'luxon';
import scheduleData from '../../scripts/output/schedules.json'; 

async function getSpecialSchedule(date: DateTime) {
  try {
    const url = `http://localhost:3000/api/calendar/${date.toFormat('M-dd-yyyy')}`;
    const response = await fetch(url, { mode: 'cors' });
    const events = await response.json();

    // todo this
    // TODO :
    // add finals schedule (includes final)
    // psat/sat schedule
    // handle weekend/holidays
    for (const event of events) {
      const name = event.summary.toLowerCase();
      if (name.includes('recess') || name.includes('no school')) {
        return 'no-school';   
      }
      if (name.includes('schedule')) {
        const schedule = event.summary.substring(0, 10).toLowerCase().replace(' ', '-');
        return schedule;
      // gets a lil dubious from here on out
      } else if (name === 'a day') { 
        return 'schedule-a';
      }
    }
    return false;
  } catch (err) { // deal with error handling at some point
    console.log(err);
  } 
}

// 1-7 where monday is 1 and sunday is 7
function getScheduleFromDate(weekday: number) {
  switch(weekday) {
    case 1:
      return 'schedule-a';
    case 2:
    case 4:
      return 'schedule-b';
    case 3:
    case 5:
      return 'schedule-c';
  }
}

async function getScheduleName(date: DateTime) {
  const weekday = date.weekday;

  // if its a weekend, no need to check 
  if (weekday === 6 || weekday === 7) return 'weekend'; 
  const specialSchedule = await getSpecialSchedule(date);
  if (specialSchedule) return specialSchedule;
  return getScheduleFromDate(weekday);
}

async function getSchedule(date: DateTime) {
  const scheduleName = await getScheduleName(date);
  try {
    return scheduleData[scheduleName];
  } catch(err) {
    console.log(err); // deal with errors at some point
    throw new Error('wuh oh');
  }
}

export { getSchedule, getScheduleName };

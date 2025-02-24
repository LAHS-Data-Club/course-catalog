import { DateTime } from 'luxon';
import scheduleData from '../scripts/output/schedules.json'; 

// we could also just make this with a txt file :skull:
async function getSpecialSchedule(date: DateTime) {
  const calendarUrl = 'c_e281ee0055e616856c4f83178cad4a88da4cd3e11bc8b5354efb1ea14f45617e@group.calendar.google.com';
  const key = 'AIzaSyDk2Ugd-qDjl3NQPCxJ6mibVgrbdv6J_5o'; 
  const timeMin = date.startOf('day').toISO();
  const timeMax = date.endOf('day').toISO();
  const params = `timeMin=${timeMin}&timeMax=${timeMax}&timeZone=America/Los_Angeles`;

  const url = 
      `https://www.googleapis.com/calendar/v3/calendars/` +
      `${calendarUrl}` +
      `/events?key=${key}&` +
      `${params}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    const events = json.items;
    // TODO :
    // add finals schedule (includes final)
    // psat/sat schedule
    // handle weekend/holidays
    for (const event of events) {
      if (event.summary) {
        const name = event.summary.toLowerCase();
        if (name.includes('recess') || name.includes('no school')) {
          return 'no-school';   
        }
        if (name.includes('schedule')) {
          const schedule = event.summary.substring(0, 10).toLowerCase().replace(' ', '-');
          return schedule;
        } else if (name === 'a day') { // really unoptimal but wtv its like the one exception and i dont wanna risk other stuff breaking
          return 'schedule-a';
        }
      }
    }
    return false; // seems ehh but wtv
  } catch (err) {
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
    console.log(err);
    throw new Error('wuh oh');
  }
}

export { getSchedule, getScheduleName };




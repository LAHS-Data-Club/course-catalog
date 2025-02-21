import { DateTime } from 'luxon';
import scheduleData from '../scripts/output/schedules.json'; 

// we could also just make this a txt file idkkk if calendar is better :skull:
async function getSpecialSchedule(date: DateTime) {
  const calendarUrl = 'c_e281ee0055e616856c4f83178cad4a88da4cd3e11bc8b5354efb1ea14f45617e@group.calendar.google.com';
  const key = 'AIzaSyDk2Ugd-qDjl3NQPCxJ6mibVgrbdv6J_5o'; 
  const timeMin = date.startOf('day').toISO();
  const timeMax = date.endOf('day').toISO();
  // const timeMin = '2025-03-20T00:00:00-07:00';
  // const timeMax = '2025-03-20T23:59:00-07:00'; 
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

  if (weekday === 6 || weekday === 7) return 'weekend'; 
  // else check is there a special schedule on this day
  const specialSchedule = await getSpecialSchedule(date);
  if (specialSchedule) return specialSchedule;
  // if not get normal schedule
  return getScheduleFromDate(weekday);
}

async function getSchedule(date: DateTime) {
  // ehhhh idk why i did this
  // const res = await fetch('http://localhost:3000/api/schedules', { mode: 'cors' });
  // const data = await res.json();
  const scheduleName = await getScheduleName(date);
  try {
    return scheduleData[scheduleName];
  } catch(err) {
    console.log(err);
    throw new Error('wuh oh');
  }
}

export { getSchedule, getScheduleName };




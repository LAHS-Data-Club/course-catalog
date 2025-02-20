import { DateTime } from 'luxon';

async function getSchedule() {
  const date = DateTime.now(); // repetition; watt made it a usecontext could do that yeah

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
    // console.log(events);
    events.forEach(event => {
      if (event.summary) {
        const name = event.summary.toLowerCase();
        // if there is no school
        if (name.includes('recess') || name.includes('no school')) {
          return 'no-school'; // im not too sure what we want to return 
        }
        if (name.includes('schedule')) {
          const schedule = event.summary.substring(0, 10).toLowerCase().replace(' ', '-');
          return schedule;
        } else if (name === 'a day') { // really unoptimal but wtv its like the one exception and i dont wanna risk other stuff breaking
          return 'schedule-a';
        }
      }
    });
    return;
  } catch (err) {
    console.log(err);
  }
}

export default getSchedule;




import { DateTime } from "luxon";
import { config } from "dotenv";
config();

export async function fetchCalendarData(formattedDate: string) {
  const date = DateTime.fromFormat(formattedDate, "M-dd-yyyy");
  const calendarUrl =
    "c_e281ee0055e616856c4f83178cad4a88da4cd3e11bc8b5354efb1ea14f45617e@group.calendar.google.com";
  const key = process.env.API_KEY;
  const timeMin = date.startOf("week");
  const timeMax = date.endOf("week");
  const params = 
    `timeMin=${timeMin.toISO()}` +
    `&timeMax=${timeMax.toISO()}` +
    `&timeZone=America/Los_Angeles` +
    `&singleEvents=true`;

  const url =
    `https://www.googleapis.com/calendar/v3/calendars/` +
    `${calendarUrl}` +
    `/events?key=${key}&` +
    `${params}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const json = await response.json();
  const events = json.items;

  const schedule: any[] = [];
  let checkingDate = timeMin;
  while (checkingDate <= timeMax) {
    const key = checkingDate.toFormat("M-dd-yyyy");
    const val: any[] = [];

    for (const item of events) {
      if (item.status !== "cancelled") {

        const eventStartDay = DateTime.fromISO(
          item.start.dateTime || item.start.date
        ).startOf('day');

        // either google calendar is stupid or i am stupid
        let eventEndDay = item.end.dateTime || item.end.date;
        if (eventEndDay.includes('T')) {
          eventEndDay = DateTime.fromISO(eventEndDay);
        } else {
          eventEndDay = DateTime.fromISO(eventEndDay).startOf('day'); 
        }

        if (
          checkingDate >= eventStartDay &&
          checkingDate < eventEndDay
        ) {
          val.push(item);
        }
      }
    }
    schedule.push({ key, val }); 
    checkingDate = checkingDate.plus({ days: 1 });
  }
  return schedule;
}

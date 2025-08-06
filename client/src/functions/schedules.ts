import { DateTime } from "luxon";
import scheduleData from "../scripts/output/schedules.json";

export interface ScheduleDay {
  name: string; 
  schedule: { [key: string]: string };
}

// export interface ScheduleData {
//   [key: string]: ScheduleDay;
// }

export function getSchedule(
  date: DateTime, 
  events: any, // TODO:
): ScheduleDay {
  // use special schedule if exists, else use defaults
  const key = getSpecialSchedule(date, events) || getScheduleFromDate(date.weekday);
  return scheduleData[key as keyof typeof scheduleData];
}

// TODO: OH I FORGOT ABOUT STUPID DUMB THING
// its so stupid its hardcoded uhghhhhhh
function getSpecialSchedule(
  date: DateTime, 
  events: any, // TODO:
) {
  // events becomes undefined
  console.log(events)
  for (const event of events) {
    const name = event.summary.toLowerCase();

    // TODO: an use a txt instead...
    if (name.includes("recess") || name.includes("no school")) {
      return "no-school";
    }
    
    // in the form: A Day, Schedule A, A Schedule:
    if (/^[A-Z] Day /.test(name)) { 
      return "schedule-" + name[0].toLowerCase();
    } else if ( /^Schedule [A-Z] /.test(name)) { 
      return "schedule-" + name.split(" ")[1].toLowerCase(); 
    } else if (/^[A-Z] Schedule:/.test(name)) {
      return "schedule-" + name[0];
    }

    if (name.substring(0, 6) === "finals") {
      return "finals-" + date.weekdayShort?.toLowerCase();
    } else if (name.includes("psat")) {
      return "psat-testing";
    }
  }
  return false;
}

function getScheduleFromDate(weekday: number) {
  switch (weekday) {
    case 1:
      return "schedule-a";
    case 2:
    case 4:
      return "schedule-b";
    case 3:
    case 5:
      return "schedule-c";
    case 6:
    case 7:
      return "weekend";
  }
}
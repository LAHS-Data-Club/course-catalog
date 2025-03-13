import { DateTime } from "luxon";
import scheduleData from "../../scripts/output/schedules.json";

async function getSpecialSchedule(date: DateTime) {
  const url = `${import.meta.env.VITE_API_URL}/api/calendar/${date.toFormat(
    "M-dd-yyyy"
  )}`;
  const response = await fetch(url, { mode: "cors" });
  const events = await response.json();

  for (const event of events) {
    const name = event.summary.toLowerCase();
    // gets a lil (VERY) dubious from here on out
    // not super reusable :sob: may need to update based on what they name things
    if (name.includes("recess") || name.includes("no school")) {
      return "no-school";
    } else if (name.includes("schedule")) {
      return name.substring(0, 10).replace(" ", "-");
    } else if (name.substring(2, 5) === "day") {
      return "schedule-" + name.substring(0, 1).toLowerCase();
    } else if (name.substring(0, 6) === "finals") {
      return "finals-" + date.weekdayShort.toLowerCase();
    } else if (name.includes("psat")) {
      return "psat-testing";
    }
  }
  return false;
}

// 1-7 where monday is 1 and sunday is 7
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
  }
}

async function getScheduleName(date: DateTime) {
  const weekday = date.weekday;

  // if its a weekend, no need to check
  if (weekday === 6 || weekday === 7) return "weekend";
  const specialSchedule = await getSpecialSchedule(date);
  if (specialSchedule) return specialSchedule;
  return getScheduleFromDate(weekday);
}

// oops i got rid of everything and this has one line now
async function getSchedule(date: DateTime) {
  const scheduleName = await getScheduleName(date);
  return scheduleData[scheduleName];
}

export { getSchedule };

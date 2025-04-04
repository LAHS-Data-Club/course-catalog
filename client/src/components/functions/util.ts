import { getSchedule, ScheduleDay } from "./schedules";
import { DateTime } from "luxon";

const offset = { days: 0 }; // for testing

async function getCurrentEvent() {
  const currentTime = DateTime.now()
    .setZone("America/Los_Angeles")
    .plus(offset);
  const currentSchedule = await getSchedule(currentTime);

  const endTime = await getEventEnd(currentTime, currentSchedule);
  const { startTime, name } = await getEventStart(currentTime, currentSchedule);
  const scheduleType = currentSchedule.name;

  return { endTime, startTime, scheduleType, name };
}

async function getEventEnd(startDate: DateTime, startSchedule: ScheduleDay) {
  let checkingDate = startDate;
  let res = startSchedule;
  while (true) {
    if (res.schedule) {
      for (const period of Object.keys(res.schedule)) {
        const [hours, minutes] = period.split(":");
        const periodTime = checkingDate.set({
          hour: parseInt(hours),
          minute: parseInt(minutes),
          second: 0,
          millisecond: 0,
        });
        if (periodTime > checkingDate) {
          return periodTime;
        }
      }
    }
    checkingDate = checkingDate.plus({ days: 1 }).startOf("day");
    res = await getSchedule(checkingDate);
  }
}


async function getEventStart(startDate: DateTime, startSchedule: ScheduleDay) {
  let checkingDate = startDate;
  let res = startSchedule;
  while (true) {
    if (res.schedule) {
      for (const period of Object.keys(res.schedule).reverse()) {
        const [hours, minutes] = period.split(":");
        const periodTime = checkingDate.set({
          hour: parseInt(hours),
          minute: parseInt(minutes),
          second: 0,
          millisecond: 0,
        });
        if (periodTime < checkingDate) {
          const formattedKey = periodTime.toFormat("H:mm");
          return { startTime: periodTime, name: res.schedule[formattedKey] };
        }
      }
    }
    checkingDate = checkingDate.plus({ days: -1 }).endOf("day");
    res = await getSchedule(checkingDate);
  }
}

export default getCurrentEvent;

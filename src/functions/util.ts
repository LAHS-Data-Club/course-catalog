import { getSchedule } from './schedules';
import { DateTime } from 'luxon';

const offset = { hours: 0 }; // for testing

// idk what to name file
// function takes a long time bc im really stupid and did bad api call system
async function getCurrentEvent() {
  const currentTime = DateTime.now().setZone('America/Los_Angeles').plus(offset);
  const currentSchedule = await getSchedule(currentTime);

  const endTime = await getEventEnd(currentTime, currentSchedule);
  const { startTime, name } = await getEventStart(currentTime, currentSchedule); 
  const scheduleType = currentSchedule.name;
 
  return { endTime, startTime, scheduleType, name };
}

async function getEventEnd(startDate, startSchedule) {
  let checkingDate = startDate;
  let res = startSchedule;
  while (true) { // prolly exit in case error super long for some reason
    if (res.schedule) {
      for (const period of Object.keys(res.schedule)) {
        const [hours, minutes] = period.split(':');
        const periodTime = checkingDate.set({ 
          hour: parseInt(hours), 
          minute: parseInt(minutes),
          seconds: 0,
          millisecond: 0,
        });
        if (periodTime > checkingDate) {
          return periodTime;
        }
      }
    } 
    checkingDate = checkingDate.plus({ days: 1 }).startOf('day');
    res = await getSchedule(checkingDate);
  }
}

// the same exact function but like 3 changes + bad return asdjkl
// i dont know how to code :sob: someone fix the repetition and this file :pray: ty
async function getEventStart(startDate, startSchedule) {
  let checkingDate = startDate;
  let res = startSchedule;
  while (true) { // prolly exit in case error super long for some reason
    if (res.schedule) { 
      for (const period of Object.keys(res.schedule).reverse()) {
        const [hours, minutes] = period.split(':');
        const periodTime = checkingDate.set({ 
          hour: parseInt(hours), 
          minute: parseInt(minutes),
          seconds: 0,
          millisecond: 0,
        });
        if (periodTime < checkingDate) {
          const formattedKey = periodTime.toFormat('H:mm');
          return { startTime: periodTime, name: res.schedule[formattedKey] };
        }
      }
    } 
    checkingDate = checkingDate.plus({ days: -1 }).endOf('day');
    res = await getSchedule(checkingDate);
  }
}

export default getCurrentEvent;

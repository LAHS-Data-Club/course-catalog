import { getSchedule } from './schedules';
import { DateTime } from 'luxon';

// idk what to name file
const offset = { days: 0 }; // for testing 

async function getNextEvent(): DateTime {
  let checkingDate = DateTime.now().plus(offset);
  let schedule = await getSchedule(checkingDate);

  while (true) { // prolly exit in case error super long for sum reason
    if (schedule.schedule) { // truly peak names :sob: fix
      for (const period of Object.keys(schedule.schedule)) {
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
    schedule = await getSchedule(checkingDate);
  }
}

// the same exact function but like 3 changes, wtv.
async function getLastEvent() {
  let checkingDate = DateTime.now().plus(offset);
  let schedule = await getSchedule(checkingDate);

  while (true) { // prolly exit in case error super long for sum reason
    if (schedule.schedule) { // truly peak names :sob: fix
      for (const period of Object.keys(schedule.schedule).reverse()) {
        const [hours, minutes] = period.split(':');
        const periodTime = checkingDate.set({ 
          hour: parseInt(hours), 
          minute: parseInt(minutes),
          seconds: 0,
          millisecond: 0,
        });
        if (periodTime < checkingDate) {
          return periodTime; 
        }
      }
    } 
    checkingDate = checkingDate.plus({ days: -1 }).endOf('day');
    schedule = await getSchedule(checkingDate);
  }
}

export { getNextEvent, getLastEvent };
import fs from 'fs';
import readline from 'readline';
import { DateTime } from 'luxon';


let arrSchedule = [];

fs.readFile('./calendar/schedules.txt', (err, data) => {
  if (err) {
    console.log(err);
    throw err;
  }

  //console.log(data.toString()); 

  let schedule = "schedule-a"; // Example schedule

  const file = readline.createInterface({
    input: fs.createReadStream('./calendar/schedules.txt'),
    output: process.stdout,
    terminal: false
  });

  let scheduleSelected = false;

  file.on('line', (line) => {
    if (scheduleSelected && line.substring(0, 1) === "*") {
      scheduleSelected = false;
    }
    if (line.substring(0, schedule.length + 2) === "* " + schedule) {
      scheduleSelected = true;
    }
    if (scheduleSelected) {
      arrSchedule.push(line);
    }
  });

  file.on('close', () => {
    for (let item of arrSchedule) {
      console.log(item)
    }
    countdown();
  })
});


async function countdown() {
  const date = DateTime.now(); // repetition; watt made it a usecontext could do that yeah
  const time = [date.toFormat('hh'), date.toFormat('mm'), date.toFormat('ss')];
  console.log(time);

  let upcomingEvent;
  let secondsUntilEvent;
  
  for (let event of arrSchedule) {
    let eventHour, eventMinute;
    if (event[1] === ':') {
      const eventTime = event.substring(0, 4);
      eventHour = parseInt(eventTime.substring(0, 1));
      eventMinute = parseInt(eventTime.substring(2, 4));
    }
    else {
      const eventTime = event.substring(0, 5);
      eventHour = parseInt(eventTime.substring(0, 2));
      eventMinute = parseInt(eventTime.substring(3, 5));
    }

    const currentTotalSeconds = parseInt(time[0]*3600) + parseInt(time[1]*60) + parseInt(time[2]);
    const eventTotalSeconds = eventHour*3600 + eventMinute*60;

    if (eventTotalSeconds > currentTotalSeconds) {
      upcomingEvent = event;
      secondsUntilEvent = eventTotalSeconds-currentTotalSeconds;
      break;
    }
  }

  console.log(secondsUntilEvent);
  console.log(upcomingEvent);
}

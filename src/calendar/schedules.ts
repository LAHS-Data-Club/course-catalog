import fs from 'fs';
import readline from 'readline';

function getSchedulefromName(schedule: string) {
  fs.readFile('./schedules.txt', (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    }
  
    const arrSchedule = [];
  
    const file = readline.createInterface({
      input: fs.createReadStream('./schedules.txt'),
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
      console.log(arrSchedule);
    });

    return arrSchedule;
  });
}

export default getSchedulefromName;
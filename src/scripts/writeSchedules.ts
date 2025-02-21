import fs from 'fs';

function writeSchedules() {
  const file = fs.readFileSync('./input/schedules.txt', 'utf8');
  const lines = file.split('\n').filter((line) => line.length > 0); 

  let schedules = {};
  // this is where it gets a little dubious x2
  let currentSchedule;
  for (const line of lines) { 
    if (line[0] === '*') { 
      const name = line.substring(1, line.indexOf('#')).trim(); // idk this or index-1 wtv
      const writtenName = line.substring(line.indexOf('#')+1).trim();
      schedules[name] = { name: writtenName };
      currentSchedule = name;
    } else {
      const time = line.substring(0, line.indexOf(' '));
      const str = line.substring(line.indexOf(' ')+1);
      schedules[currentSchedule]['schedule'] = { ...schedules[currentSchedule]['schedule'], [time]: str };
    }
  }
  
  fs.writeFileSync('./output/schedules.json', JSON.stringify(schedules, null, 2));
  console.log('dubious code over (lie)');
}

writeSchedules();
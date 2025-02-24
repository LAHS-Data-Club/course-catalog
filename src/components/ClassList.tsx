import { DateTime } from 'luxon';
import { getSchedule } from '../functions/schedules';
import { useEffect, useState } from 'react';
import bird from '../../public/bird.jpg';

// im so sorry this might be the worst code ive ever written someone help pls
// i also have no clue when to add types im just doing it when red underline
interface Period {
  startTime: string,
  endTime: string,
  name: string,
}

interface Props {
  date: DateTime
  periods: Record<string, string>
}

function ClassList({ date, periods }: Props) {

  console.log(periods)

  const [schedule, setSchedule] = useState<Period[]>([]);
  const [loaded, setLoaded] = useState(false);

  // i should start error handling at some point :sob:
  useEffect(() => {
    async function formatSchedule() {
      setLoaded(false);
      const res = await getSchedule(date);
      if (res.schedule) {
        const keys = Object.keys(res.schedule);
        const formattedSchedule = keys
          .map((curr, index) => ({
            startTime: curr,
            endTime: keys[index + 1],
            name: res.schedule[curr]
          }))
          .filter(item => !item.name.includes('Passing') && !item.name.includes('Free'));
        setSchedule(formattedSchedule);
      } else {
        setSchedule([]);
      }
      setLoaded(true);
    }
    formatSchedule();
  }, [date]);

  return (
    <div className='w-[calc(43%+120px)] flex flex-col gap-4 items-center'>
      {loaded && (
        schedule.length ? (
          schedule.map(item => (
            <div className="text-white px-5 py-1.5 flex justify-between h-16 w-full bg-secondary rounded-md">
              <div className="self-center">
                <div className="text-lg font-semibold">{item.name.replace(/[{}]/g, '')}</div>
                {/** this doesnt work for ie. Period 2/A, Period 2/B fix at some point */}
                {periods[item.name] && (<div className='text-sm'>{periods[item.name]}</div>)}
              </div>
              <div className="self-end">{item.startTime} - {item.endTime}</div>
            </div>
          ))
        ) : (
          <>
            <div className="text-lg">No School!</div>
            <div className="h-fit w-80 p-7 bg-secondary">
              something here because its so empty
              <img src={bird} />
            </div>
          </>
        )
      )}
    </div>
  );
}

export default ClassList;
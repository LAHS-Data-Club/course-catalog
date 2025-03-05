import { DateTime } from 'luxon';
import { getSchedule } from './functions/schedules';
import { useEffect, useState, useContext } from 'react';
import { PeriodsContext } from './PeriodsContext';

// i also have no clue when to add types im just doing it when red underline
interface Period {
  startTime: string,
  endTime: string,
  name: string,
}

interface Props {
  date: DateTime
}

function ClassList({ date }: Props) {
  const { periods } = useContext(PeriodsContext);
  const [schedule, setSchedule] = useState<Period[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // make this more readable
  useEffect(() => {
    async function formatSchedule() {
      setLoaded(false);
      try {
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
      } catch(err) {
        console.log(err);
        setError(true);
      }
      setLoaded(true);
    }
    formatSchedule();
  }, [date]);

  if (error) return <div>Sorry, a network error occurred.</div>

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
            </div>
          </>
        )
      )}
    </div>
  );
}

export default ClassList;
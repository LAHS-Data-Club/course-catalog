import { useState } from 'react';
import { DateTime } from 'luxon';

// TODO, DEAL WITH TIMEZONES
import Timer from './Timer';
import ClassList from './ClassList';

function Home() {
  const [displayDate, setDisplayDate] = useState(DateTime.now());
  const showPopup = !DateTime.now().hasSame(displayDate, 'day');

  return (
    <div className="flex flex-col p-6 items-center">

      {/** i think im just purely stealing from watt oops but like */}
      {showPopup && (
        <div className='flex justify-between fixed bg-black top-5 py-2 px-4 rounded opacity-75 min-w-fit w-[calc(53%+100px)]'>
          <div>You are viewing the schedule for {displayDate.toFormat('LLL dd')}</div>
          <div className='flex gap-3'>
            <div className='underline cursor-pointer' onClick={() => setDisplayDate(DateTime.now())}>Jump to Present</div>
            <div className='cursor-pointer'>x</div> {/** add functionality */}
          </div>
        </div>
      )}
 
      <div className="font-bold text-2xl w-fit">{displayDate.weekdayLong}</div>
      <div className="flex gap-2 text-lg items-center"> 
        <div className="cursor-pointer hover:bg-secondary px-2 rounded transition"
          onClick={() => setDisplayDate(prev => prev.plus({ days: -1 }))}
        >&#8249;</div> {/** make into actual icons or smth */}
        <div>{displayDate.toLocaleString(DateTime.DATE_FULL)}</div>
        <div className="cursor-pointer hover:bg-secondary px-2 rounded transition"
          onClick={() => setDisplayDate(prev => prev.plus({ days: 1 }))}
        >&#8250;</div>
      </div>
      
      {/** css silly when smaller window fix later */}
      <Timer />
      <hr className="text-neutral-700 w-[calc(43%+120px)] my-4 border-2 rounded" />
      <ClassList date={displayDate}/>
    </div>
  )
}

export default Home;
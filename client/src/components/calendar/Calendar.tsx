import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import EventPopup from './EventPopup';
import { calendarOptions } from '../../functions/queryOptions';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CalendarCard from './CalendarCard';
import Error from '../../components/Error';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// this is kinda cooked idk...
export default function Calendar() {  
  const queryClient = useQueryClient();
  const [currDate, setCurrDate] = useState<DateTime>(DateTime.now().startOf('month'));
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    queryClient.prefetchQuery(calendarOptions(currDate.plus({ month: 1 })));
    queryClient.prefetchQuery(calendarOptions(currDate.plus({ month: -1 })));
  }, [currDate, queryClient]);

  const { data: calendarData, isPending, isError } = useQuery(calendarOptions(currDate));
  if (isPending) return <div className="p-8 text-center text-slate-500">Loading calendar...</div>;
  if (isError) return <Error message={"Unable to fetch calendar."} />;

  return (
    <div className="mx-auto max-w-screen-xl p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="flex gap-2 text-4xl text-slate-200 mb-1 items-center">
          Calendar
        </h1>
        <div className="flex items-center gap-2 w-60 justify-between">
          <div>
            <button
              onClick={() => setCurrDate((prev) => prev.plus({ month: -1 }))}
              className="p-2 rounded-md hover:bg-slate-700 transition cursor-pointer"
            >
              <MdOutlineChevronLeft className='w-6 h-6' />
            </button>
            <button
              onClick={() => setCurrDate((prev) => prev.plus({ month: 1 }))}
              className="p-2 rounded-md hover:bg-slate-700 transition cursor-pointer"
            >
              <MdOutlineChevronRight className='w-6 h-6' />
            </button>
          </div>
          <h2 className="text-xl font-semibold text-slate-200 min-w-max">
            {currDate.toFormat('MMM yyyy')}
          </h2>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-slate-800/40">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 border-slate-800">
          {WEEKDAYS.map((day) => (
            <div key={day} className="p-2 text-center font-medium bg-slate-800/100">
              {day}
            </div>
          ))}
        </div>
        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {/** Add empty cells for days before the first day of the month */}
          {Array.from({ length: (currDate.startOf('month').weekday % 7) }).map((_, index) => (
            <div key={index} className="h-34 p-1"></div>
          ))}
          {Object.entries(calendarData).map(([date, events]) => (
            <CalendarCard 
              key={date}
              date={date}
              events={events} 
              setSelectedEvent={setSelectedEvent}
            />
          ))}
        </div>
      </div>

      {selectedEvent && (
        <EventPopup 
          event={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      )}
    </div>
  );
};

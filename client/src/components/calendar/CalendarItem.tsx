import { DateTime } from "luxon";
import { useState } from "react";

// TODO: types
export default function CalendarCard({ date, events, setSelectedEvent }) {
  const [showMore, setShowMore] = useState(false);
  const displayEvents = showMore ? events : events.slice(0, 3);
  const dateObj = DateTime.fromFormat(date, "M-dd-yyyy")
  const isToday = DateTime.now().hasSame(dateObj, "day");

  return (
    <div className={`relative h-34 p-0.5 border-1 border-slate-900 ${isToday ? 'bg-blue-100/30' : 'bg-slate-400/30'}`}>
      <div className={`text-sm font-medium mb-1 ${isToday ? 'font-bold' : ''}`}>
        {dateObj.day}
      </div>
      
      <div 
        className={`
          space-y-0.5 text-xs transition duration-300 h-fit
          ${showMore && 'bg-blue-300 p-3 absolute left-[-1em] right-[-1em] top-[-1em] min-bottom-[-1em] z-10 rounded-sm'}
        `}
      >
        {showMore && <p className="text-pink-500">heading for the day</p>}
        {displayEvents.map((event) => {
          return (
            <div
              key={event.id} 
              onClick={() => setSelectedEvent(event)}
              className="h-6 bg-blue-500 hover:bg-blue-400 border border-blue-300 text-white cursor-pointer p-1 rounded transition-colors truncate drop-shadow-sm"
              title={event.summary} 
            >
              <span>{event.start.dateTime && DateTime.fromISO(event.start.dateTime).toFormat("h:mma").toLowerCase()} </span>
              {event.summary}
            </div>
          )
        })}
        {!showMore && events.length > 3 && (
          <div 
            onClick={() => setShowMore(true)}
            className="hover:bg-slate-400/40 cursor-pointer p-1 rounded transition-colors truncate drop-shadow-sm"
          > 
            +{events.length - 3} more... 
          </div>
        )}
      </div>
    </div>
  );
}

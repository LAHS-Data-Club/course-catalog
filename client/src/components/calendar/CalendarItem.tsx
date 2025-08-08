import { DateTime } from "luxon";

// TODO: types
export default function CalendarCard({ date, events, setSelectedEvent }) {
  const dateObj = DateTime.fromFormat(date, "M-dd-yyyy")
  const isToday = DateTime.now().hasSame(dateObj, "day");
  return (
    <div className={`h-34 p-0.5 border-1 border-slate-900 ${isToday ? 'bg-blue-100/30' : 'bg-slate-400/30'}`}>
      <div className={`text-sm font-medium mb-1 ${isToday ? 'font-bold' : ''}`}>
        {dateObj.day}
      </div>
      <div className="space-y-0.5 text-xs">
        {events.slice(0,3).map((event) => {
          return (
            <div
              key={event.id} 
              onClick={() => setSelectedEvent(event)}
              className="bg-blue-500 hover:bg-blue-400 border border-blue-300 text-white cursor-pointer p-1 rounded transition-colors truncate drop-shadow-sm"
              title={event.summary} 
            >
              <span>{event.start.dateTime && DateTime.fromISO(event.start.dateTime).toFormat("h:mma").toLowerCase()} </span>
              {event.summary}
            </div>
          )
        })}
        {events.length > 3 && (
          <div 
            className="hover:bg-slate-400/40 cursor-pointer p-1 rounded transition-colors truncate drop-shadow-sm"
          > {/** onclick should show the rest of the modules */}
            +{events.length - 3} more... 
          </div>
        )}
      </div>
    </div>
  );
}

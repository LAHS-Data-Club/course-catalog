import { DateTime } from "luxon";

export default function EventsList({ events, setSelectedEvent}) {
  return (
    <div className="space-y-0.5 text-xs transition duration-300 max-h-fit">
      {events.map((event) => {
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
    </div>
  );
}
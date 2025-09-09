import { useCalendar } from "../../functions/calendar/useCalendar";
import { DateTime } from 'luxon';

export default function EventsSidebar() {
  const start = DateTime.now();
  const { data, isError, isPending } = useCalendar(start, start.plus({ weeks: 2 }));

  if (isPending) return <p>Loading events...</p>
  if (isError) return <p>Error fetching events...</p>

  // TODO: deal with duplicates?
  const events = Object.values(data).flatMap((x) => x.events);
  console.log(events)

  return (
    <div className="h-fit min-h-100 rounded p-5 ring-1 bg-white dark:bg-slate-800 ring-slate-200/80 dark:ring-slate-700">
      <h3 className="text-lg text-slate-900 dark:text-slate-100 mb-3">Upcoming Events</h3>
      <ul className="space-y-1">
        {events.length > 0 ? events.filter((event, index, array) =>
        index === array.findIndex(e => e.id === event.id) && !event.summary?.includes('A Day Schedule') && !event.summary?.includes('B Day Schedule') && !event.summary?.includes('C Day Schedule') && !event.summary?.includes('A La Carte')) // awful code
        .map((event) => {
          const date = event.start.date || event.start.dateTime;
          const formattedDate = date 
            ? DateTime.fromISO(date).toFormat("LLLL d")
            : "";
          return (
            <li 
              key={event.id} 
              className="bg-slate-900/30 p-3 rounded"
            >
              <p className="font-semibold text-slate-800 dark:text-slate-200">{event.summary}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{formattedDate}</p>
            </li>
          )
        }) : (
          <p className="col-span-full text-center text-slate-500 py-7">No upcoming events.</p>
        )}
      </ul>
    </div>
  );
}
import { DateTime } from "luxon";
import { useQueries } from "@tanstack/react-query";
import { calendarOptions } from "../queryOptions";
import { getSchedule } from "./schedules";

interface CalendarData {
  [key: string]: {
    events: any[];
    schedule: any; 
  }
}

// incredibly cooked
// TODO: what is this system????
// TODO: this is a little unreadable
// help help help help

export function useCalendar(
  startDate: DateTime,
  endDate: DateTime = startDate // if no endDate provided, default to events for only startDate
) {
  const keys = [];
  let currMonth = startDate.startOf("month");
  const endMonth = endDate.startOf("month");
  while (currMonth <= endMonth) {
    keys.push(currMonth);
    currMonth = currMonth.plus({ month: 1 });
  }

  const calendarQuery = useQueries({
    queries: keys.map(calendarOptions),
  });

  const data: CalendarData = {};
  for (const query of calendarQuery.values()) {
    for (const [key, events] of Object.entries(query.data ?? {})) {
      const date = DateTime.fromFormat(key, "M-dd-yyyy");
      const include = date >= startDate.startOf("day") && date <= endDate.endOf("day");
      
      if (include) {
        const schedule = getSchedule(date, events);
        data[key] = { events, ...schedule };
      }
    }
  }

  const isPending = calendarQuery.some((res) => res.isPending);
  const isError = calendarQuery.some((res) => res.isError);
  return { data, isError, isPending };
}



// const events = calendarQuery.flatMap((q) =>
//   Object.entries(q.data ?? {})
//     .filter(([date]) =>
//       DateTime.fromFormat(date, "M-dd-yyyy") >= startDate &&
//       DateTime.fromFormat(date, "M-dd-yyyy") <= endDate
//     )
//     .flatMap(([, events]) => events)
// );
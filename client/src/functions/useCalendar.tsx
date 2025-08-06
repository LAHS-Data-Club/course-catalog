import { DateTime } from "luxon";
import { useQueries } from "@tanstack/react-query";
import { calendarOptions } from "./queryOptions";

// TODO: make an event type
export function useCalendar(
  startDate: DateTime,
  endDate: DateTime = startDate // if no endDate provided, default to events for startDate
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

  const events = calendarQuery.flatMap((q) =>
    Object.entries(q.data ?? {})
      .filter(([date]) =>
        DateTime.fromFormat(date, "M-dd-yyyy") >= startDate &&
        DateTime.fromFormat(date, "M-dd-yyyy") <= endDate
      )
      .flatMap(([, events]) => events)
  );

  const isPending = calendarQuery.some((res) => res.isPending);
  const isError = calendarQuery.some((res) => res.isError);

  return { events, isError, isPending };
}
import { DateTime } from "luxon";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getSchedule } from "./schedules";
import { calendarOptions } from "./queryOptions";
import { useEffect, useState } from "react";
import { useCalendar } from "./useCalendar";

// TODO: all of this is kindaaaa dubious...
const offset = { hours: 0 };

interface Event {
  endTime?: DateTime;
  startTime?: DateTime;
  eventName?: string;
}

export function useCalendarDay(date: DateTime) {
  const start = date.startOf("day");
  const calendarQuery = useQuery(calendarOptions(start));

  let events, schedule;
  if (calendarQuery.data) {
    events = Object.entries(calendarQuery.data)
      .find(([key]) => date?.toFormat("M-dd-yyyy") === key)
      ?.[1];
    schedule = getSchedule(date, events);
  }

  return {
    schedule,
    events,
    isPending: calendarQuery.isPending,
    isError: calendarQuery.isError,
  }
}


// interface EventGroup {
//   events: any,
//   schedule: any
// }

// interface UseCalendarResult {
//   isPending: boolean;
//   isError: boolean;
//   data: EventGroup[]
// }


// TODO: get schedule name too

// TODO: :l ummmmmm ummmm this is cooked wtv
export function useCurrEvent() { 
  const now = DateTime.now().setZone("America/Los_Angeles").plus(offset);
  const [event, setEvent] = useState<Event>({});
  const isLoading = !event.startTime || !event.endTime; // TODO: this doesnt work lol

  // TODO: this seems excessive
  const [backTime, setBackTime] = useState(now);
  const [forwardTime, setForwardTime] = useState(now);
  const backQuery = useCalendarDay(backTime);
  const forwardQuery = useCalendarDay(forwardTime);

  function update() {
    const now = DateTime.now().setZone("America/Los_Angeles").plus(offset);
    if (!isLoading && now > event.endTime!) {
      setEvent({});
      setBackTime(now);
      setForwardTime(now);
    }
  }

  // fetch event starting time
  useEffect(() => {
    const schedule = backQuery.schedule?.schedule;
    if (schedule && !event.startTime) {
      for (const period of Object.keys(schedule).reverse()) { 
        const [h, m] = period.split(":").map(Number);
        const periodTime = backTime.set({ hour: h, minute: m, second: 0, millisecond: 0 });
        if (periodTime < backTime) {
          setEvent((prev) => ({ ...prev, startTime: periodTime }));
          return;
        }
      }
      setBackTime((prev) => prev.plus({ days: -1 }).endOf("day"));
    }
  }, [backTime, backQuery.schedule, event.startTime]);

  // fetch event ending time
  useEffect(() => {
    const schedule = forwardQuery.schedule?.schedule;
    if (schedule && !event.endTime) {
      for (const period of Object.keys(schedule)) { 
        const [h, m] = period.split(":").map(Number);
        const periodTime = forwardTime.set({ hour: h, minute: m, second: 0, millisecond: 0 });
        if (periodTime > forwardTime) { 
          setEvent((prev) => ({ ...prev, endTime: periodTime }));
          return;
        }
      }
      setForwardTime((prev) => prev.plus({ days: 1 }).startOf("day"));
    }
  }, [event.endTime, forwardQuery.schedule, forwardTime]);

  return {
    ...event,
    update,
    isLoading,
  };
}


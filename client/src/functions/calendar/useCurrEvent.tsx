import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useCalendar } from "./useCalendar";

// TODO: all of this is kindaaaa dubious...
const offset = { hours: 0 };

interface Event {
  endTime?: DateTime;
  startTime?: DateTime;
  eventName?: string;
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

// TODO: :l ummmmmm ummmm this is cooked wtv
export function useCurrEvent() { 
  const now = DateTime.now().setZone("America/Los_Angeles").plus(offset);
  const [event, setEvent] = useState<Event>({});
  const isLoading = !event.startTime || !event.endTime;

  // TODO: this seems excessive
  const [backTime, setBackTime] = useState(now);
  const [forwardTime, setForwardTime] = useState(now);
  const backQuery = useCalendar(backTime);
  const forwardQuery = useCalendar(forwardTime);

  function update() {
    const now = DateTime.now().setZone("America/Los_Angeles").plus(offset);
    if (!isLoading && now > event.endTime!) {
      setEvent({});
      setBackTime(now);
      setForwardTime(now);
    }
  }

  // fetch event starting time
  // TODO: include event name
  useEffect(() => {
    if (!backQuery.isPending && !event.startTime) {
      const schedule = Object.values(backQuery.data)[0].schedule;
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
  }, [backQuery.data, backQuery.isPending, backTime, event.startTime]);

  // fetch event ending time
  useEffect(() => {
    if (!forwardQuery.isPending && !event.endTime) {
      const schedule = Object.values(forwardQuery.data)[0].schedule;
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
  }, [event.endTime, forwardQuery.data, forwardQuery.isPending, forwardTime]);

  return {
    ...event,
    update,
    isLoading,
  };
}
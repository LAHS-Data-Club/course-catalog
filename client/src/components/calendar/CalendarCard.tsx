import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { DateTime } from "luxon";
import EventsList from "./EventsList";

// TODO: types
export default function CalendarCard({ date, events, setSelectedEvent }) {
  const dateObj = DateTime.fromFormat(date, "M-dd-yyyy")
  const isToday = DateTime.now().hasSame(dateObj, "day");

  return (
    <div className='relative'>
      <div className={`relative h-34 p-0.5 border-1 border-slate-900 ${isToday ? 'bg-blue-100/30' : 'bg-slate-400/30'}`}>
        <p className='mb-1 text-sm font-medium'>{dateObj.day}</p>
        <div>
          <EventsList events={events.slice(0, 3)} setSelectedEvent={setSelectedEvent} />
          {events.length > 3 && (
            <Popover>
              <PopoverButton className="mt-0.5 text-xs w-full text-left p-1 hover:bg-slate-400/40 cursor-pointer rounded transition-colors drop-shadow-sm">
                +{events.length - 3} more...
              </PopoverButton>
              {/** popup displaying all events */}
              <PopoverPanel 
                className="absolute rounded-md p-4 border-slate-900 bg-neutral-700 z-10 top-[-1em] left-[-1em] right-[-1em] min-h-[calc(100%+2em)]"
                // in honor of neil his styling can stay here forever
                // className="absolute rounded-md p-4 border-slate-900 bg-neutral-700 z-10 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                // style = {{ 
                //   height: `${136 + 26.5 * (events.length-3) + 24}px`, /* 136px css styling = 34 px tailwind, 24 margin css = 6 margin tailwind*/
                //   width: `calc(100% + ${24}px)`, 
                // }}
              >
                <p className='mb-1 text-sm font-medium'>{dateObj.day}</p>
                <EventsList events={events} setSelectedEvent={setSelectedEvent} />
              </PopoverPanel>
            </Popover>
          )}
        </div>
      </div> 
    </div>
  );
}
import { useState } from "react";
import { DateTime } from "luxon";
import Timer from "./Timer";
import ClassList from "./PeriodsList";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import EventsSidebar from "./EventsSidebar";

export default function Home() {
  const now = DateTime.now().setZone("America/Los_Angeles");
  const [displayDate, setDisplayDate] = useState(now);

   return (
    <div className="mx-auto max-w-screen-xl p-4 sm:p-6 lg:p-8 mt-12">
      <div className="flex flex-col items-center mb-10">
        <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{displayDate.weekdayLong}</div>
        <div className="w-65 justify-between mt-1 flex items-center gap-2 text-lg text-slate-500 dark:text-slate-400">
          <button 
            className="cursor-pointer rounded-md p-1 hover:bg-slate-200 dark:hover:bg-slate-700 transition" 
            onClick={() => setDisplayDate((prev) => prev.minus({ days: 1 }))}
          >
            <MdOutlineChevronLeft size={20} />
          </button>
          <span>{displayDate.toLocaleString(DateTime.DATE_FULL)}</span>
          <button 
            className="cursor-pointer rounded-md p-1 hover:bg-slate-200 dark:hover:bg-slate-700 transition" 
            onClick={() => setDisplayDate((prev) => prev.plus({ days: 1 }))}
          >
            <MdOutlineChevronRight size={20} />
          </button>
        </div>
      </div> 
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 flex flex-col gap-8 items-center">
          <Timer />
          <hr className="w-full border-t border-slate-200 dark:border-slate-800" />
          <ClassList date={displayDate} />
        </div>
          <EventsSidebar />
      </div>
    </div>
  );
}
import { useState } from "react";
import { DateTime } from "luxon";
import Timer from "./Timer";
import ClassList from "./ClassList";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import EventsSidebar from "./EventsSidebar";

function Home() {
  const now = DateTime.now().setZone("America/Los_Angeles");
  const [displayDate, setDisplayDate] = useState(now);
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const showPopup = !now.hasSame(displayDate, "day") && isPopupVisible;

  return (
    <div className="mx-auto max-w-screen-xl p-4 sm:p-6 lg:p-8">
      {/* {showPopup && (
        <div className="fixed top-5 z-20 left-1/2 -translate-x-1/2 flex w-11/12 max-w-2xl items-center justify-between bg-slate-700/40 px-4 py-2 text-white shadow-lg">
          <p className="text-sm">Viewing schedule for {displayDate.toFormat("LLL dd")}</p>
          <div className="flex items-center gap-4">
            <button className="underline-offset-2 text-sm underline" onClick={() => setDisplayDate(now)}>
              Jump to Present
            </button>
            <button onClick={() => setIsPopupVisible(false)}>
              <X size={20} />
            </button>
          </div>
        </div>
      )} */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-12">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{displayDate.weekdayLong}</div>
            <div className="mt-1 flex justify-center items-center gap-2 text-lg text-slate-500 dark:text-slate-400">
              <button 
                className="cursor-pointer rounded-md p-1 hover:bg-slate-200 dark:hover:bg-slate-700 transition" 
                onClick={() => setDisplayDate((prev) => prev.minus({ days: 1 }))}
              >
                <ChevronLeft size={20} />
              </button>
              <span>{displayDate.toLocaleString(DateTime.DATE_FULL)}</span>
              <button 
                className="cursor-pointer rounded-md p-1 hover:bg-slate-200 dark:hover:bg-slate-700 transition" 
                onClick={() => setDisplayDate((prev) => prev.plus({ days: 1 }))}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <Timer />
          <hr className="w-full border-t border-slate-200 dark:border-slate-800" />
          <ClassList date={displayDate} />
        </div>
        <div className="mt-20">
          <EventsSidebar />
        </div>
      </div>
    </div>
  );
}

export default Home;
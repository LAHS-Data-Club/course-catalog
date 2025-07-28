import { Calendar, Mic, Trophy } from 'lucide-react';

function EventsSidebar() {
  return (
    <div className="space-y-8 sticky top-8">
      {/* Upcoming Events Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Upcoming Events</h3>
        <ul className="mt-4 space-y-4">
          <li className="flex items-start gap-4">
            <div className="flex-shrink-0 rounded-lg bg-indigo-100 p-2 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
              <Calendar size={20} />
            </div>
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Finals Week</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Aug 4 - Aug 8</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="flex-shrink-0 rounded-lg bg-rose-100 p-2 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400">
              <Mic size={20} />
            </div>
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Talent Show</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Aug 15 @ 7:00 PM</p>
            </div>
          </li>
           <li className="flex items-start gap-4">
            <div className="flex-shrink-0 rounded-lg bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
              <Trophy size={20} />
            </div>
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">First Football Game</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Aug 22 @ 6:00 PM</p>
            </div>
          </li>
        </ul>
      </div>

      {/* Quote Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-800">
         <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Quote of the Day</h3>
         <blockquote className="mt-4 border-l-4 border-indigo-300 pl-4 italic text-slate-600 dark:border-indigo-600 dark:text-slate-300">
            "The future belongs to those who believe in the beauty of their dreams."
         </blockquote>
         <p className="mt-2 text-right text-sm text-slate-500 dark:text-slate-400">
            — Eleanor Roosevelt
         </p>
      </div>
    </div>
  );
}

export default EventsSidebar;
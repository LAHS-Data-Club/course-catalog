import { Calendar, Mic, Trophy } from 'lucide-react';

// TODO: work on this
export default function EventsSidebar() {
  return (
    <div className="space-y-8 sticky top-8">

      {/* Upcoming Events Card */}
      <div className="rounded-sm border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-800">
        <h3 className="text-lg text-slate-900 dark:text-slate-100">Upcoming Events</h3>

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

    </div>
  );
}
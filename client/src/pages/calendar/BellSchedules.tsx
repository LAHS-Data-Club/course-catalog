// import React, { useState, useEffect } from 'react';
// import { Period, Schedule, ScheduleData} from '../shared/lib/types';

// const parseScheduleData = (data: string): ScheduleData => {
//   const lines = data.split('\n');
//   const parsed: ScheduleData = {
//     regularSchedules: [],
//     specialSchedules: [],
//     finalSchedules: [],
//   };

//   let currentSection: keyof ScheduleData | null = null;
//   let currentSchedule: Schedule | null = null;

//   const pushSchedule = () => {
//     if (!currentSchedule || !currentSection) return;
//     parsed[currentSection].push(currentSchedule);
//     currentSchedule = null;
//   };

//   for (const line of lines) {
//     const trimmed = line.trim();

//     if (trimmed === '## Regular Weekly Schedules') {
//       pushSchedule();
//       currentSection = 'regularSchedules';
//     } else if (trimmed === '## Special Bell Schedules') {
//       pushSchedule();
//       currentSection = 'specialSchedules';
//     } else if (trimmed === '## Final Bell Schedules') {
//       pushSchedule();
//       currentSection = 'finalSchedules';
//     } else if (trimmed.startsWith('### ')) {
//       pushSchedule();
//       currentSchedule = {
//         name: trimmed.replace(/^### /, ''),
//         title: '',
//         subtitle: '',
//         periods: [],
//       };
//     } else if (/^\*\*.*\*\*$/.test(trimmed)) {
//       if (currentSchedule) currentSchedule.title = trimmed.replace(/\*\*/g, '');
//     } else if (/^\*.*\*$/.test(trimmed)) {
//       if (currentSchedule) currentSchedule.subtitle = trimmed.replace(/\*/g, '');
//     } else if (trimmed.startsWith('[') && trimmed.includes('|')) {
//       const typeMatch = trimmed.match(/\[(\w+)]/);
//       const [, type] = typeMatch || [];
//       const [, name, time] = trimmed.match(/\](.+?)\|(.+)/) || [];

//       if (type && name && time && currentSchedule) {
//         currentSchedule.periods.push({ type, name: name.trim(), time: time.trim() });
//       }
//     }
//   }

//   pushSchedule();
//   return parsed;
// };

// const renderPeriod = (period: Period) => {
//   const base = 'p-1 rounded';
//   const style = {
//     class: 'bg-blue-100/65 text-blue-900',
//     break: 'bg-slate-700/50',
//     special: 'bg-slate-700/50 font-semibold',
//   }[period.type] || 'bg-slate-700/50';

//   return (
//     <div key={`${period.name}-${period.time}`} className={`${base} ${style}`}>
//       <div dangerouslySetInnerHTML={{ __html: period.name.replace(/\*\*/g, '<strong>').replace(/\*\*/g, '</strong>') }} />
//       <div>{period.time}</div>
//     </div>
//   );
// };

// const BellSchedules = () => {
//   const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await fetch('/schedules.txt');
//         if (!res.ok) console.log('Could not fetch bell schedules');
//         const text = await res.text();
//         setScheduleData(parseScheduleData(text));
//       } catch (err) {
//         setError((err as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, []);

//   if (loading) return <div className="text-white">Loading schedules...</div>;
//   if (error) return <div className="text-red-400">Error loading schedules: {error}</div>;
//   if (!scheduleData) return <div className="text-white">No schedule data available</div>;

//   const ScheduleBlock = ({ schedule }: { schedule: Schedule }) => (
//     <div className="bg-slate-800/40 backdrop-blur drop-shadow-xl rounded-sm p-4">
//       <h4 className="font-bold text-white mb-1">{schedule.name}</h4>
//       {schedule.title && <div className="text-blue-300 font-semibold text-sm mb-1">{schedule.title}</div>}
//       {schedule.subtitle && <div className="text-slate-300 text-xs mb-3 italic">{schedule.subtitle}</div>}
//       <div className="space-y-1 text-xs text-slate-200">{schedule.periods.map(renderPeriod)}</div>
//     </div>
//   );

//   return (
//     <div className="mt-8">
//       <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">Bell Schedules</h2>

//       <div className="grid grid-cols-1 md:grid-cols-5 border border-slate-700 mb-6">
//         {scheduleData.regularSchedules.map((s, i) => (
//           <div
//             key={s.name}
//             className={`bg-slate-800 p-4 ${i < scheduleData.regularSchedules.length - 1 ? 'border-r border-slate-700' : ''}`}
//           >
//             <h3 className="font-bold text-white mb-2">{s.name}</h3>
//             {s.title && <div className="text-blue-300 font-semibold mb-2">{s.title}</div>}
//             {s.subtitle && <div className="text-slate-300 text-sm mb-3">{s.subtitle}</div>}
//             <div className="space-y-1 text-xs text-slate-200">{s.periods.map(renderPeriod)}</div>
//           </div>
//         ))}
//       </div>

//       <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Special Bell Schedules</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//         {scheduleData.specialSchedules.map(s => <ScheduleBlock key={s.name} schedule={s} />)}
//       </div>

//       <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Final Bell Schedules</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {scheduleData.finalSchedules.map(s => <ScheduleBlock key={s.name} schedule={s} />)}
//       </div>
//     </div>
//   );
// };

// export default BellSchedules;
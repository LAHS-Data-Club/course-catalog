// import { DateTime } from "luxon";
// import { useState } from "react";
// import { HiX } from "react-icons/hi";

// // TODO: types
// export default function CalendarCard({ date, events, setSelectedEvent }) {
//   const dateObj = DateTime.fromFormat(date, "M-dd-yyyy")
//   let isToday = DateTime.now().hasSame(dateObj, "day");
//   isToday = !isToday;
//   const [isShowMore, setShowMore] = useState(false);

//   if (!isShowMore) {
//     return (
//       <div className={`h-34 p-0.5 border-1 border-slate-900 ${isToday ? 'bg-blue-100/30' : 'bg-slate-400/30'}`}>
//         <div className={`text-sm font-medium mb-1 ${isToday ? 'font-bold' : ''}`}>
//           {dateObj.day}
//         </div>
//         <div className="space-y-0.5 text-xs">
//           {events.slice(0,3).map((event) => {
//             return (
//               <div
//                 key={event.id} 
//                 onClick={() => setSelectedEvent(event)}
//                 className="bg-blue-500 hover:bg-blue-400 border border-blue-300 text-white cursor-pointer p-1 rounded transition-colors truncate drop-shadow-sm"
//                 title={event.summary} 
//               >
//                 <span>{event.start.dateTime && DateTime.fromISO(event.start.dateTime).toFormat("h:mma").toLowerCase()} </span>
//                 {event.summary}
//               </div>
//             )
//           })}
//           {events.length > 3 && (
//             <div 
//               className="hover:bg-slate-400/40 cursor-pointer p-1 rounded transition-colors truncate drop-shadow-sm"
//               onClick = {() => setShowMore(true)}
// > {/** onclick should show the rest of the modules */}
//               +{events.length - 3} more... 
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
//   else {
//     return (
//       <div className="relative">
//         <div 
//           className={`rounded-md p-4 border-slate-900 bg-[rgb(56_58_68)] z-10 mx-auto my-auto -translate-x-1/16 -translate-y-1/16 absolute`}  
//           style = {{ 
//             height: `${136 + 26.5 * (events.length-3) + 24}px`, /* 136px css styling = 34 px tailwind, 24 margin css = 6 margin tailwind*/
//             width: `calc(100% + ${24}px)`, 
//             //top: `${(26.5 * (events.length-3) + 24)/2}px`, 
//             //left: '12px'
//             }} > 
//           <div className={`text-lg font-bold mb-1`}>
//             {dateObj.day}
//           </div>
//           <button
//             onClick={() => setShowMore(false)}
//             className="absolute right-3 top-3 cursor-pointer"
//           >
//             <HiX size={20} />
//           </button>
//           <div className="space-y-0.5 text-xs">
//             {events.map((event) => {
//               return (
//                 <div
//                   key={event.id} 
//                   onClick={() => setSelectedEvent(event)}
//                   className="bg-blue-500 hover:bg-blue-400 border border-blue-300 text-white cursor-pointer p-1 rounded transition-colors truncate drop-shadow-sm"
//                   title={event.summary} 
//                 >
//                   <span>{event.start.dateTime && DateTime.fromISO(event.start.dateTime).toFormat("h:mma").toLowerCase()} </span>
//                   {event.summary}
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//         </div>
//     );
//   }
// }
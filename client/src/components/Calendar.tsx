import { useState, useEffect } from 'react';
<<<<<<<< HEAD:client/src/calendar/Calendar.tsx

import { ChevronLeft, ChevronRight, Clock, MapPin, X } from 'lucide-react'; //asdasd
========
import { ChevronLeft, ChevronRight, Clock, MapPin, X } from 'lucide-react';
import DOMPurify from 'dompurify';
import { DateTime } from 'luxon';
>>>>>>>> e85951c3cd838da4da183f053deb730902fd70b9:client/src/components/Calendar.tsx
import { GoLinkExternal } from "react-icons/go";
import { MdOutlineCalendarToday } from "react-icons/md";
import BellSchedules from './BellSchedules';
import { CalendarEvent, SelectedEventDetails } from '../lib/types';

import DOMPurify from 'dompurify';
import type { CalendarEvent, SelectedEventDetails } from './types';

import { DateTime } from 'luxon';



const API_KEY = 'AIzaSyDTku4CyKHMvZkQ80fDdy4XqfhuqPiD0P0';
const CALENDAR_ID = 'c_e281ee0055e616856c4f83178cad4a88da4cd3e11bc8b5354efb1ea14f45617e@group.calendar.google.com';

<<<<<<<< HEAD:client/src/calendar/Calendar.tsx
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar() {
========

const Calendar = () => {
>>>>>>>> e85951c3cd838da4da183f053deb730902fd70b9:client/src/components/Calendar.tsx
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<SelectedEventDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();  

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const startOfMonth = new Date(year, month, 1).toISOString();
      const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59).toISOString();
      
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?` +
        `key=${API_KEY}&` +
        `timeMin=${startOfMonth}&` +
        `timeMax=${endOfMonth}&` +
        `singleEvents=true&` +
        `orderBy=startTime`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setEvents(data.items || []);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load calendar events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedEvent(null);
      }
    };
    
    if (selectedEvent) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [selectedEvent]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date: number) => {
    const targetDate = new Date(year, month, date);
    return events.filter(event => {
      const eventStart = event.start.dateTime ? 
        new Date(event.start.dateTime) : 
        new Date(event.start.date + 'T00:00:00');
      
      return eventStart.toDateString() === targetDate.toDateString();
    });
  };

  const handleEventClick = (event: CalendarEvent) => {
    const isAllDay = !!event.start.date;
    const startDate = isAllDay ? new Date(event.start.date + 'T00:00:00') : new Date(event.start.dateTime!);
    const endDate = isAllDay ? new Date(event.end.date + 'T00:00:00') : new Date(event.end.dateTime!);

    const formattedStart = isAllDay ? 
      startDate.toLocaleDateString() : 
      DateTime.fromJSDate(startDate).toFormat("LLLL d, h:mm a");    
    const formattedEnd = isAllDay ? 
      endDate.toLocaleDateString() : 
      DateTime.fromJSDate(startDate).toFormat("LLLL d, h:mm a");    
    
    setSelectedEvent({
      ...event,
      formattedStart,
      formattedEnd,
      isAllDay
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 sm:h-32 p-1"></div>
      );
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const isToday = today.getDate() === day && 
                     today.getMonth() === month && 
                     today.getFullYear() === year;
      
      days.push(
        <div key={day} className={`sm:h-34.5 p-0.5 border-1 border-slate-900 ${isToday ? 'bg-blue-100/50' : 'bg-slate-400/30'}`}>
          <div className={`text-sm font-medium mb-1 ${isToday ? 'font-bold' : ''}`}>
            {day}
          </div>
          <div className="space-y-1 overflow-hidden">
            {dayEvents.slice(0, 4).map((event, index) => (
              <div
                key={event.id || index}
                onClick={() => handleEventClick(event)}
                className="text-xs p-1 rounded bg-blue-100/65 text-blue-900 cursor-pointer hover:bg-blue-200/65 transition-colors truncate drop-shadow-sm"
                title={event.summary}
              >
                <strong>{(event.start.date) ? "" : DateTime.fromJSDate(new Date(event.start.dateTime!)).toFormat("h:mma").slice(0, -1).toLowerCase()} </strong>{event.summary}
              </div>
            ))}
            {dayEvents.length > 4 && (
              <div className="text-xs text-gray-600 px-1">
                +{dayEvents.length - 4} more
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-screen-xl p-4 sm:p-6 lg:p-8">
        <div className="text-center bg-white/40 drop-shadow-xl backdrop-blur p-6 rounded-lg">
          <div className="text-lg">Loading calendar...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <MdOutlineCalendarToday className="w-8 h-8"/>
            Calendar
          </h1>
          <div className="flex items-center gap-2 classn">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 min-w-max">
              {monthNames[month]} {year}
            </h2>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
      </div>

      {/* Calendar Grid */}
      <div className="bg-slate-800/40 backdrop-blur drop-shadow-xl rounded-sm overflow-hidden">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 border-slate-800">
          {weekdays.map(day => (
            <div key={day} className="p-2 text-center font-medium bg-slate-800/100">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedEvent(null)}>
          <div className="bg-white dark:bg-slate-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto drop-shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  {selectedEvent.summary}
                </h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Clock size={18} className="text-slate-500 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                  <div className="text-slate-700 dark:text-slate-300">
                    {selectedEvent.isAllDay ? (
                      <div>All day event</div>
                    ) : (
                      <div>
                        <div>Start: {selectedEvent.formattedStart}</div>
                        <div>End: {selectedEvent.formattedEnd}</div>
                      </div>
                    )}
                  </div>
                </div>
                
                {selectedEvent.location && (
                  <div className="flex items-start gap-2">
                    <MapPin size={18} className="text-slate-500 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                    <div className="text-slate-700 dark:text-slate-300">
                      {selectedEvent.location.endsWith(", USA") ? selectedEvent.location.slice(0, -5) : selectedEvent.location}
                    </div>
                  </div>
                )}
                
                {selectedEvent.description && (
                  <div className="text-slate-700 dark:text-slate-300">
                    <div className="font-medium mb-1">Description:</div>
                    <div 
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedEvent.description || '') }}
                    />
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex gap-2">
                <a
                  href={selectedEvent.htmlLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-4 py-2 bg-white/50 dark:bg-slate-700/50 rounded-md drop-shadow-md hover:drop-shadow-lg hover:bg-white/70 dark:hover:bg-slate-700/70 transition duration-75 cursor-pointer"
                >
                  <GoLinkExternal className="w-4 h-4"/>
                  View in Google Calendar
                </a>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-600 rounded-md hover:bg-slate-300 dark:hover:bg-slate-500 transition duration-75 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <BellSchedules/>
    </div>
  );
};
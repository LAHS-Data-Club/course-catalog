import DOMPurify from 'dompurify';
import { FaRegClock, FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";
import Modal from '../../components/Modal';
import { DateTime } from 'luxon';

export default function EventPopup({ event, setSelectedEvent }) {
  // TODO: deal with better date formatting
  const start = event.start.dateTime ? DateTime.fromISO(event.start.dateTime).toFormat("LLLL d, h:mm a") : event.start.date;
  const end = event.end.dateTime ? DateTime.fromISO(event.end.dateTime).toFormat("LLLL d, h:mm a") : event.end.date;
  
  const formattedTime = start + (end ? " - " + end : "");
  const formattedLocation = event.location && event.location.endsWith(", USA") ? event.location.slice(0, -5) : event.location;

  return (
    <Modal onClose={() => setSelectedEvent(null)}>
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
        {event.summary}
      </h3>
      <button>
        <a
          href={event.htmlLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-slate-700/50 drop-shadow-md hover:drop-shadow-lg hover:bg-white/70 dark:hover:bg-slate-700/70 transition duration-75 cursor-pointer"
        >
          <FaExternalLinkAlt size={13} />
          View in Google Calendar
        </a>
      </button>
      <div className="flex flex-col gap-5 mt-6">
        <div className='text-slate-500 dark:text-slate-400 flex flex-col gap-1.5'>
          {event.start && (
            <div className='flex items-center gap-2'>
              <FaRegClock size={20} />
              <p>{formattedTime}</p>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt size={20} />
              <p>{formattedLocation}</p>
            </div>
          )}
        </div>
        {event.description && (
          <div 
            className="text-sm text-slate-700 dark:text-slate-300"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.description || '') }}
          />
        )}
      </div>
    </Modal>
  );
}
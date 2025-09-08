import { generateMailto, parseLocation } from '../../functions/clubs/utilities';
import { IoLocationOutline, IoTimeOutline, IoMailOutline, IoPersonOutline } from 'react-icons/io5';
import type { Club } from '../../lib/types';
import Modal from '../Modal';

interface Props {
  open: boolean;
  onClose: () => void;
  club: Club | null;
}

export default function ClubDialog({
  open,
  onClose,
  club
}: Props) {
  if (!club) return null; // TODO: ehhh someone told me to do this instead of conditional rendering

  return (
    <Modal open={open} onClose={onClose}>
      <h4 className="text-xl font-bold text-slate-100 mb-2">
        {club.name}
      </h4>
      <div className="flex flex-wrap gap-5 mb-4">
        <div className='space-y-1'>
          <div className="flex items-start gap-1">
            <IoTimeOutline size={25} />
            <p>{club.day} {club.time}</p>
          </div>
          <div className="flex items-start gap-1">
            <IoLocationOutline size={25} />
            <p>{parseLocation(club.location)}</p>
          </div>
        </div>
        <div className='space-y-1'>
          <div className="flex items-start gap-1">
            <IoPersonOutline size={25} />
            <p>President: {club.president}</p>
          </div>
          <div className="flex items-start gap-1">
            <IoPersonOutline size={25} />
            <p>Advisor: {club.advisor}</p>
          </div>
        </div>
      </div>
      <p className='text-slate-500 dark:text-slate-400 mb-12'>
        {club.description}
      </p>
      <div className="flex gap-3">
        {club.sign_up && (
          <a
            href={club.sign_up}
            className="flex items-center justify-center gap-2 py-2 px-4 rounded bg-blue-900/50 hover:bg-blue-900/70 transition text-blue-300 drop-shadow-md hover:drop-shadow-lg cursor-pointer"
          >
            <IoMailOutline size={25} />
            <div className="min-w-max">Join!</div>
          </a>
        )}
        <a
          href={generateMailto(club.advisor_email, club.name)}
          className="flex items-center justify-center gap-2 py-2 px-4 rounded bg-blue-900/50 hover:bg-blue-900/70 transition text-blue-300 drop-shadow-md hover:drop-shadow-lg cursor-pointer"
        >
          <IoMailOutline size={25} />
          <div>Contact Advisor</div>
        </a>
        <a
          href={generateMailto(club.president_email, club.name)}
          className="flex items-center justify-center gap-2 py-2 px-4 rounded bg-blue-900/50 hover:bg-blue-900/70 transition text-blue-300 drop-shadow-md hover:drop-shadow-lg cursor-pointer"
        >
          <IoMailOutline size={25}/>
          <div>Contact President</div>
        </a>
      </div>
    </Modal>
  );
}

     
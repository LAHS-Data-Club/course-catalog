import { NavLink, useParams } from 'react-router-dom';
import { generateMailto, parseLocation } from '../../functions/clubs/utilities';
import { IoArrowBackSharp, IoMailOutline, IoPersonOutline } from 'react-icons/io5';
import { clubOptions } from '../../functions/queryOptions';
import { useQuery } from '@tanstack/react-query';
import { HiX } from "react-icons/hi";
import { useState } from 'react';
import Modal from '../Modal';


// TODO: make this a popup/modal in the future
         // can change to ClubPopup
export default function ClubPage() {
        const { id } = useParams() as { id: string };
        const { data: clubs, isPending } = useQuery(clubOptions());
        const targetClub = clubs.find((club) => club.url === id);
        const [clubPopup, setClubPopup] = useState(true);
        
        if (isPending) return <div>Loading club data...</div>;
        if (!targetClub) throw new Error('Club not found');
        
        return (
                <Modal onClose={() => setClubPopup(false)}>
        <div className="p-7">
          { 
                                                <>
                                                <div className="text-lg h-full">
                                        <h1 className="font-display text-3xl md:text-4xl font-bold py-2 md:py-4">
                                                {targetClub.name}
                                        </h1>
                                        <div className="flex flex-wrap gap-5 mb-2">
                                                <div>
                                                        <div className="flex items-start gap-1">
                                                                <IoMailOutline className="w-6 h-6" />
                                                                <p>{targetClub.day} {targetClub.time}</p>
                                                        </div>
                                                        <div className="flex items-start gap-1">
                                                                <IoMailOutline className="w-6 h-6" />
                                                                <p>{parseLocation(targetClub.location)}</p>
                                                        </div>
                                                </div>
                                                <div>
                                                        <div className="flex items-start gap-1">
                                                                <IoPersonOutline className="w-6 h-6" />
                                                                <p>President: {targetClub.president}</p>
                                                        </div>
                                                        <div className="flex items-start gap-1">
                                                                <IoPersonOutline className="w-6 h-6" />
                                                                <p>Advisor: {targetClub.advisor}</p>
                                                        </div>
                                                </div>
                                        </div>
                                        <p className='text-slate-500 dark:text-slate-400 mb-12'>{targetClub.description}</p>
                                </div>
                                <div className="flex gap-3">
                                        {targetClub.sign_up && (
                                                <a
                                                        href={targetClub.sign_up}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="flex items-center justify-center gap-2 py-2 px-4 rounded dark:bg-blue-900/50 hover:bg-blue-900/70 transition dark:t
ext-blue-300 drop-shadow-md hover:drop-shadow-lg cursor-pointer"
                                                >
                                                        <IoMailOutline className="w-6 h-6" />
                                                        <div className="min-w-max">Join!</div>
                                                </a>
                                        )}
                                        <a
                                                href={generateMailto(
                                                        targetClub.advisor_email,
                                                        targetClub.name,
                                                )}
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex items-center justify-center gap-2 py-2 px-4 rounded dark:bg-blue-900/50 hover:bg-blue-900/70 transition dark:text-blue
-300 drop-shadow-md hover:drop-shadow-lg cursor-pointer"
                                        >
                                                <IoMailOutline className="w-6 h-6" />
                                                <div>Contact Advisor</div>
                                        </a>
                                        <a
                                                href={generateMailto(
                                                        targetClub.president_email,
                                                        targetClub.name,
                                                )}
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex items-center justify-center gap-2 py-2 px-4 rounded dark:bg-blue-900/50 hover:bg-blue-900/70 transition dark:text-blue
-300 drop-shadow-md hover:drop-shadow-lg cursor-pointer"
                                        >
                                                <IoMailOutline className="w-6 h-6" />
                                                <div>Contact President</div>
                                        </a>
                                </div>
                                </>}
        </div>
                </Modal>
        )
                                                )}
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex items-center justify-center gap-2 py-2 px-4 rounded dark:bg-blue-900/50 hover:bg-blue-900/70 transition dark:text-blue
-300 drop-shadow-md hover:drop-shadow-lg cursor-pointer"
                                        >
                                                <IoMailOutline className="w-6 h-6" />
                                                <div>Contact President</div>
                                        </a>
                                </div>
                                </>}
        </div>
                </Modal>
        )
}
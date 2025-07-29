import './ClubCard.css';
import { generateMailto } from '../utilities';
import { Link } from 'react-router-dom';

export default function ClubCard({
    day,
    time,
    description,
    location,
    name,
    url,
    advisor,
    advisor_email,
    president,
    president_email,
    tier,
    activities,
}) {
    if (!isNaN(location)) {
        location = 'Room ' + location;
    }

    // if (tags) {
    //     tags = tags.split(', ');
    // }

    return (
        <Link
            to={'clubs/' + url}
            className={
                'bg-white/40' +
                (name === 'Data Club' ? ' glow ' : ' card ') +
                'p-5 rounded-[1rem] drop-shadow-xl font-body lg:flex lg:flex-col justify-between'
            }
        >
            <div className="text-md lg:text-base">
                <p className="font-display text-base lg:text-xl font-bold">
                    {name}
                </p>
                {/* {tags && (
                    <div className="flex flex-wrap gap-2 text-xs mt-2 mb-3">
                        {tags.map((tag) => (
                            <div
                                key={tag}
                                className="bg-white/50 rounded-full drop-shadow-md py-2 px-3"
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                )} */}
                <div className="my-2">
                    <div className="flex items-start gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                            />
                        </svg>
                        <div className="align-baseline">
                            {day} {time}
                        </div>
                    </div>
                    <div className="flex items-start gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            />
                        </svg>

                        <div>{location}</div>
                    </div>
                </div>

                <div>{description}</div>
            </div>
            <div className="flex flex-row gap-3">
                {/* {sign_up && (
                    <a
                        href={sign_up}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="flex items-end gap-1 p-2 rounded-md mt-3 bg-white/50 drop-shadow-md hover:drop-shadow-lg hover:bg-white/70 transition duration-75"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                            />
                        </svg>

                        <div className="min-w-max">Join!</div>
                    </a>
                )} */}
                <a
                    href={generateMailto(advisor_email, name)}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="flex items-end gap-1 p-2 rounded-md mt-3 bg-white/50 drop-shadow-md hover:drop-shadow-lg hover:bg-white/70 transition duration-75"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                    </svg>

                    <div>Contact Advisor</div>
                </a>
                <a
                    href={generateMailto(president_email, name)}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="flex items-end gap-1 p-2 rounded-md mt-3 bg-white/50 drop-shadow-md hover:drop-shadow-lg hover:bg-white/70 transition duration-75"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                    </svg>

                    <div>Contact President</div>
                </a>
            </div>
        </Link>
    );
}
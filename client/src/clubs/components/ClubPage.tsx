import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readClubs } from '../firebase/firebaseRepository';
import { generateMailto, parseLocation } from '../utilities';

export default function ClubPage() {
	let { id } = useParams() as { id: string };

	const [loading, setLoading] = useState(true);
	const RELOAD_LS_TIME = 1000 * 60 * 60 * 24; // reload local storage every x milliseconds (1 day)
	// Call once on component mount: load club from firebase or from local storage
	const [clubs, setClubs] = useState([]);
	const [clubData, setClubData] = useState();

	useEffect(() => {
		setLoading(true);

		// Read values from local storage
		let lastLoaded = Date.parse(localStorage.getItem('last_loaded'));
		let clubs = JSON.parse(localStorage.getItem('clubs'));

		// load clubs from firebase if specified time has passed / clubs is empty
		if (
			isNaN(lastLoaded) ||
			new Date() - lastLoaded >= RELOAD_LS_TIME ||
			clubs == null ||
			clubs.length === 0
		) {
			new Promise(readClubs).then((clubs) => {
				setClubs(clubs);
				setLoading(false);
			});
		} else {
			setClubs(clubs);
			setLoading(false);
			console.log('Loaded clubs from local storage.');
		}
	}, []);

	useEffect(() => {
		setClubData(clubs.find((club) => club.url === id));
	}, [clubs]);

	return (
		<div>
			<div className="w-100 mb-3 text-center bg-white/40 drop-shadow-xl backdrop-blur p-3">
				<div className="text-xl font-display font-bold me-1">
					<Link to="/">LAHS Club List</Link>
				</div>
				<div className="italic text-md">A project by the Data Club</div>
			</div>
			{loading && <div>Loading club data...</div>}
			{clubData && (
				<div className="w-full flex flex-col md:items-center h-full">
					<div className="p-5 font-body h-full max-w-4xl min-w-sm">
						<div className="text-lg h-full">
							<p className="font-display text-3xl md:text-4xl font-bold py-2 md:py-4">
								{clubData.name}
							</p>
							{clubData.tags && (
								<div className="flex flex-wrap gap-2 text-md mb-5">
									{clubData.tags.split(', ').map((tag) => (
										<div
											key={tag}
											className="bg-white/50 rounded-full drop-shadow-md py-2 px-4"
										>
											{tag}
										</div>
									))}
								</div>
							)}
							<div className="flex gap-4">
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
											{clubData.day} {clubData.time}
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

										<div>
											{parseLocation(clubData.location)}
										</div>
									</div>
								</div>
								<div className="my-2">
									<div className="flex items-start gap-1">
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
												d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
											/>
										</svg>
										<div>
											<span>President: </span>
											{clubData.president}
										</div>
									</div>
									<div className="flex items-start gap-1">
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
												d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
											/>
										</svg>
										<div>
											<span>Advisor: </span>
											{clubData.advisor}
										</div>
									</div>
								</div>
							</div>
							<div>{clubData.description}</div>
						</div>
						<div className="flex gap-3">
							{clubData.sign_up && (
								<a
									href={clubData.sign_up}
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
							)}
							<a
								href={generateMailto(
									clubData.advisor_email,
									clubData.name,
								)}
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
								href={generateMailto(
									clubData.president_email,
									clubData.name,
								)}
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
							<Link
								to="/"
								className="flex items-center gap-1 max-h-min p-2 rounded-md mt-3 bg-white/50 drop-shadow-md hover:drop-shadow-lg hover:bg-white/70 transition duration-75"
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
										d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
									/>
								</svg>

								<div>Back to Club List</div>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

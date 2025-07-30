import { NavLink, useParams } from 'react-router-dom';
import { generateMailto, parseLocation } from '../util/utilities';
import { IoMailOutline, IoPersonOutline, IoArrowBackSharp } from "react-icons/io5";
import { useClubs } from '../util/useClubs';

export default function ClubPage() {
	const { id } = useParams() as { id: string };
	const { clubs, isLoading } = useClubs();
	const targetClub = clubs.find((club) => club.url === id);

	return (
		<div>
			{isLoading && <div>Loading club data...</div>}
			{targetClub && (
				<div className="w-full flex flex-col md:items-center h-full">
					<div className="p-5 font-body h-full max-w-4xl min-w-sm">
						<div className="text-lg h-full">
							<p className="font-display text-3xl md:text-4xl font-bold py-2 md:py-4">
								{targetClub.name}
							</p>
							{targetClub.tags && (
								<div className="flex flex-wrap gap-2 text-md mb-5">
									{targetClub.tags.split(', ').map((tag) => (
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
										<IoMailOutline className="w-6 h-6" />
										<div className="align-baseline">
											{targetClub.day} {targetClub.time}
										</div>
									</div>
									<div className="flex items-start gap-1">
										<IoMailOutline className="w-6 h-6" />
										<div>
											{parseLocation(targetClub.location)}
										</div>
									</div>
								</div>
								<div className="my-2">
									<div className="flex items-start gap-1">
										<IoPersonOutline className="w-6 h-6" />
										<div>
											<span>President: </span>
											{targetClub.president}
										</div>
									</div>
									<div className="flex items-start gap-1">
										<IoPersonOutline className="w-6 h-6" />
										<div>
											<span>Advisor: </span>
											{targetClub.advisor}
										</div>
									</div>
								</div>
							</div>
							<div>{targetClub.description}</div>
						</div>
						<div className="flex gap-3">
							{targetClub.sign_up && (
								<a
									href={targetClub.sign_up}
									onClick={(e) => e.stopPropagation()}
									className="flex items-end gap-1 p-2 rounded-md mt-3 bg-white/50 drop-shadow-md hover:drop-shadow-lg hover:bg-white/70 transition duration-75"
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
								className="flex items-end gap-1 p-2 rounded-md mt-3 bg-white/50 drop-shadow-md hover:drop-shadow-lg hover:bg-white/70 transition duration-75"
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
								className="flex items-end gap-1 p-2 rounded-md mt-3 bg-white/50 drop-shadow-md hover:drop-shadow-lg hover:bg-white/70 transition duration-75"
							>
								<IoMailOutline className="w-6 h-6" />
								<div>Contact President</div>
							</a>
							<NavLink
								to="/clubs"
								className="flex items-center gap-1 max-h-min p-2 rounded-md mt-3 bg-white/50 drop-shadow-md hover:drop-shadow-lg hover:bg-white/70 transition duration-75"
							>
								<IoArrowBackSharp />
								<div>Back to Club List</div>
							</NavLink>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

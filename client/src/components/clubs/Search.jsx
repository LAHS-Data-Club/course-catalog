import { useState } from 'react';

export default function Search({
	onChange,
	setDateFilters,
	setTimeFilters,
	setTagFilters,
	dateFilters,
	timeFilters,
	tagFilters,
	dateValues,
	timeValues,
	tagValues,
}) {
	const [open, setOpen] = useState(true); // for testing: TODO: turn back to false

	const FILTER = {
		DATE: 0,
		TIME: 1,
		TAG: 2,
	};

	const handleOpen = () => {
		setOpen(!open);
	};

	const handleCheckOnChange = (e, name, filterType) => {
		name = name.toLowerCase();
		switch (filterType) {
			case FILTER.DATE:
				if (e.target.checked) {
					setDateFilters([...dateFilters, name]);
				} else {
					setDateFilters(
						dateFilters.filter(
							(date) => date.toLowerCase() !== name,
						),
					);
				}
				break;

			case FILTER.TIME:
				if (e.target.checked) {
					setTimeFilters([...timeFilters, name]);
				} else {
					setTimeFilters(
						timeFilters.filter(
							(time) => time.toLowerCase() !== name,
						),
					);
				}
				break;

			case FILTER.TAG:
				if (e.target.checked) {
					setTagFilters([...tagFilters, name]);
				} else {
					setTagFilters(
						tagFilters.filter((tag) => tag.toLowerCase() !== name),
					);
				}
				break;

			default:
				break;
		}
	};

	return (
		<div className="flex flex-col w-full mb-5">
			<div className="flex">
				{/* Search bar */}
				<input
					type="text"
					placeholder="Search for clubs!"
					onChange={onChange}
					className="w-full bg-white/50 p-3 rounded-md drop-shadow-md focus:outline-none focus:drop-shadow-lg focus:bg-white/70 font-body transition duration-100"
				/>
				{/* Filter button */}
				<div className="ms-2">
					<button
						onClick={handleOpen}
						className={`m-0 h-full text-body flex justify-center items-center gap-1 max-w-min p-2 rounded-md ${
							open ? 'bg-white/70' : 'bg-white/50'
						} drop-shadow-md hover:drop-shadow-lg hover:bg-white/70 transition duration-75`}
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
								d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
							/>
						</svg>
						<div>Filter</div>
					</button>
				</div>
			</div>
			{open && (
				// Popup filter
				<div className="relative">
					<div
						className="font-body mt-2 w-full divide-y divide-white rounded-md bg-white/70 backdrop-blur drop-shadow-lg text-black focus:outline-none flex flex-col px-4"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="menu-button"
						tabIndex="-1"
					>
						{/* Date filter */}
						<div className="py-4">
							<div className="font-bold text-lg mb-1">Days</div>
							<div className="flex flex-wrap">
								{dateValues.map((day) => (
									<div
										key={day + '_cb'}
										className="me-3 flex items-center"
									>
										<input
											id={day + '_datecb'}
											className="me-1"
											type="checkbox"
											onChange={(e) =>
												handleCheckOnChange(
													e,
													day,
													FILTER.DATE,
												)
											}
										></input>
										<label
											htmlFor={day + '_datecb'}
											className="capitalize"
										>
											{day}
										</label>
									</div>
								))}
							</div>
						</div>
						{/* Time filter */}
						<div className="py-3">
							<div className="font-bold text-lg mb-1">Times</div>
							<div className="flex flex-wrap">
								{timeValues.map((time) => (
									<div
										key={time + '_cb'}
										className="me-3 flex items-center"
									>
										<input
											id={time + '_timecb'}
											className="me-1"
											type="checkbox"
											onChange={(e) =>
												handleCheckOnChange(
													e,
													time,
													FILTER.TIME,
												)
											}
										></input>
										<label
											htmlFor={time + '_timecb'}
											className="capitalize"
										>
											{time}
										</label>
									</div>
								))}
							</div>
						</div>
						{/* Tags filter */}
						{/* <div className="py-3">
							<div className="font-bold text-lg mb-1">Tags</div>
							<div className="flex flex-wrap gap-3">
								{tagValues.map((tag) => (
									<label
										key={tag + '_cb'}
										className="flex items-center px-3 py-2 rounded-full bg-white/50 drop-shadow-md hover:bg-white/80 hover:drop-shadow-lg"
										htmlFor={tag + '_tagcb'}
									>
										<input
											id={tag + '_tagcb'}
											className="me-1"
											type="checkbox"
											onChange={(e) =>
												handleCheckOnChange(
													e,
													tag,
													FILTER.TAG,
												)
											}
										></input>
										<div
											// htmlFor={tag + "_tagcb"}
											className="capitalize"
										>
											{tag}
										</div>
									</label>
								))}
							</div>
						</div> */}
					</div>
				</div>
			)}
		</div>
	);
}
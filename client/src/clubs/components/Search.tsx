import { SlidersHorizontal } from 'lucide-react';
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
	const [open, setOpen] = useState(true);

	const FILTER = {
		DATE: 0,
		TIME: 1,
		TAG: 2,
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
			<div className="flex gap-2">
				{/* Search bar */}
				<input
          type="text"
					placeholder="Search for clubs..."
					onChange={onChange}
          className="w-full flex-1 rounded border border-slate-300 bg-white p-2.5 px-4 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        />
				{/* Filter button */}
				<button 
          onClick={() => setOpen(!open)}
          className="cursor-pointer flex items-center justify-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filter</span>
        </button>
			</div>
			{open && (
				// Popup filter
				<div className="relative">
					<div
						className="w-full flex-wrap gap-x-6 gap-y-3 rounded-b border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-800/50"
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
					</div>
				</div>
			)}
		</div>
	);
}

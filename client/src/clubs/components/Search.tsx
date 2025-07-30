import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { dateValues } from '../util/clubOptions'; 
import Filter from './Filter';

// kms......
interface Props {
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
	setDateFilters: React.Dispatch<React.SetStateAction<string[]>>,
	setTimeFilters: React.Dispatch<React.SetStateAction<string[]>>,
	dateFilters: string[],
	timeFilters: string[],
	timeValues: string[],
}

export default function Search({
	setSearchQuery,
	setDateFilters,
	setTimeFilters,
	dateFilters,
	timeFilters,
	timeValues,
}: Props) {
	const [isOpen, setIsOpen] = useState(true);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	return (
		<div className="flex flex-col w-full mb-5">
			<div className="flex gap-2">
				{/* Search bar + filter button */}
				<input
          type="text"
					placeholder="Search for clubs..."
					onChange={handleSearch}
          className="w-full flex-1 rounded border border-slate-300 bg-white p-2.5 px-4 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        />
				<button 
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex items-center justify-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filter</span>
        </button>
			</div>
			{/** Filters */}
			{isOpen && (
				<div className="relative">
					<div
						className="w-full flex-wrap gap-x-6 gap-y-3 rounded-b border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-800/50"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="menu-button"
					>
						<div>
							<div className="font-bold text-lg mb-1">Days</div>
							<Filter 
								filterValues={dateValues} 
								setFilterValues={setDateFilters} 
								filter={dateFilters}
							/>
						</div>
						<hr className='dark:text-slate-600 my-3' />
						<div>
							<div className="font-bold text-lg mb-1">Times</div>
							<Filter 
								filterValues={timeValues} 
								setFilterValues={setTimeFilters} 
								filter={timeFilters}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
import { useState, useEffect } from 'react';
import ClubCard from './ClubCard/ClubCard';
import Search from './Search';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getSearchResults } from '../util/search';
import { useClubs } from '../util/useClubs';
import { Club } from '../lib/types';

export default function ClubCollection() {
	const [searchQuery, setSearchQuery] = useState('');
	const [dateFilters, setDateFilters] = useState<string[]>([]);
	const [timeFilters, setTimeFilters] = useState<string[]>([]);
	// const [tagFilters, setTagFilters] = useState<string[]>([]); // TODO: will we ever use tags 
	const [searchResults, setSearchResults] = useState<Club[]>([]);
	const [displayedResults, setDisplayedResults] = useState<Club[]>([]);
	const { clubs, isLoading } = useClubs();

	// When the search query changes, update the data
	useEffect(() => {
		const results = getSearchResults(
			clubs,
			searchQuery,
			dateFilters,			
			timeFilters,
		);
		setSearchResults(results);
		setDisplayedResults(results.slice(0, 10));
	}, [searchQuery, dateFilters, timeFilters, clubs]);

	const uniqueTimeValues = [...new Set(clubs.map((c) => c.time))]
		.map((value) => value === '' ? 'No Time Specified' : value);

	if (isLoading) return <div className="p-8 text-center text-slate-500">Loading clubs...</div>;

	return (
		<div className="mx-auto max-w-7xl p-3 sm:p-5 lg:p-6 mt-12">
			<h1 className="text-4xl text-slate-800 dark:text-slate-200 mb-1">
				Clubs List
			</h1>
			<p className="max-w-2xl text-slate-600 dark:text-slate-400 mb-5">
				<span className="text-slate-700 dark:text-blue-400 font-semibold">Click</span> on a club to view more info<span className="text-slate-700 font-semibold dark:text-blue-400">double-click</span> for full details.
			</p>
			<Search
				setSearchQuery={setSearchQuery}
				setDateFilters={setDateFilters}
				setTimeFilters={setTimeFilters}
				dateFilters={dateFilters}
				timeFilters={timeFilters}
				timeValues={uniqueTimeValues}
			></Search>
			<InfiniteScroll
				dataLength={displayedResults.length}
				loader={<p>Loading more courses...</p>}
				next={() => {
					setDisplayedResults(
						displayedResults.concat(
							searchResults.slice(
								displayedResults.length,
								displayedResults.length + 10,
							),
						),
					);
				}} 
				hasMore={displayedResults.length < searchResults.length}
				style={{ overflow: 'visible' }}
			> 
				<div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
					{displayedResults.map((club) => (
						<ClubCard key={club.id} c={club} />
					))}
				</div>
			</InfiniteScroll>
		</div>
	);
}

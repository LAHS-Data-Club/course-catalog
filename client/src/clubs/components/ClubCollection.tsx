import { useState, useEffect } from 'react';
import ClubCard from './ClubCard/ClubCard';
import Search from './Search';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fuse, getSearchResults } from '../util/search';
import { useClubs } from '../util/useClubs';
import { Club } from '../lib/types';

export default function ClubCollection() {
	const [searchQuery, setSearchQuery] = useState('');
	const [dateFilters, setDateFilters] = useState<string[]>([]);
	const [timeFilters, setTimeFilters] = useState<string[]>([]);
	const [tagFilters, setTagFilters] = useState<string[]>([]);
	const [searchResults, setSearchResults] = useState<Club[]>([]);
	const [displayedResults, setDisplayedResults] = useState<Club[]>([]);
	const { clubs, isLoading } = useClubs();

	useEffect(() => {
		if (clubs) {
			fuse.setCollection(clubs);
			setSearchResults(clubs);
			setDisplayedResults(clubs.slice(0, 10));
		}
	}, [clubs]);

	// When the search query changes, update the data
	useEffect(() => {
		const results = getSearchResults(
			clubs,
			searchQuery,
			dateFilters,			
			timeFilters,
			tagFilters,
		);
		setSearchResults(results);
		setDisplayedResults(results.slice(0, 10));
	}, [searchQuery, dateFilters, timeFilters, tagFilters, clubs]);

	const uniqueTimeValues = [...new Set(clubs.map((c) => c.time))]
		.map((value) => value === '' ? 'No Time Specified' : value);

	return (
		<div className="pt-12 pr-50 pl-20">
			<h1 className="text-5xl text-slate-800 dark:text-slate-200 mb-5 font-semibold">
				Clubs List
			</h1>
			{isLoading && (
				<div role="status">
					<span className="sr-only">Loading...</span>
				</div>
			)}
			{clubs.length > 0 && (
				<div className="flex-col flex">
					<Search
						setSearchQuery={setSearchQuery}
						setDateFilters={setDateFilters}
						setTimeFilters={setTimeFilters}
						setTagFilters={setTagFilters}
						dateFilters={dateFilters}
						timeFilters={timeFilters}
						tagFilters={tagFilters} 
						timeValues={uniqueTimeValues}
					></Search>
					<InfiniteScroll
						dataLength={displayedResults.length}
						loader={<p>Loading...</p>}
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
					> 
						<div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
							{displayedResults.map((club) => (
								<ClubCard key={club.id} c={club} />
							))}
						</div>
					</InfiniteScroll>
				</div>
			)}
		</div>
	);
}

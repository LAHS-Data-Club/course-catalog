import { useState, useEffect } from 'react';
import ClubCard from './ClubCard/ClubCard';
import Search from './Search';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getSearchResults } from '../../functions/clubs/search';
import { clubOptions } from '../../functions/queryOptions';
import { Club } from '../../lib/types';
import { useQuery } from '@tanstack/react-query';
import { fuse } from '../../functions/clubs/search';
import Error from '../Error';
import ClubDialog from './ClubDialog';

export default function ClubCollection() {
	const [searchQuery, setSearchQuery] = useState('');
	const [dateFilters, setDateFilters] = useState<string[]>([]);
	const [timeFilters, setTimeFilters] = useState<string[]>([]);
	const [searchResults, setSearchResults] = useState<Club[]>([]);
	const [displayedResults, setDisplayedResults] = useState<Club[]>([]);
	const { data: clubs, isPending, isError } = useQuery(clubOptions());
	const [selectedClub, setSelectedClub] = useState<Club | null>(null);

	useEffect(() => {
		if (!isPending) {
			fuse.setCollection(clubs);
		}
	}, [clubs, isPending])

	// When the search query changes, update the data
	useEffect(() => {
		if (clubs) {
			const results = getSearchResults(
				clubs,
				searchQuery,
				dateFilters,
				timeFilters,
			);
			setSearchResults(results);
			setDisplayedResults(results.slice(0, 20));
		}
	}, [searchQuery, dateFilters, timeFilters, clubs]);

	if (isPending) return <div className="p-8 text-center text-slate-500">Loading clubs...</div>;
	if (isError) return <Error message={"Unable to fetch clubs."} />;

	const uniqueTimeValues = [...new Set(clubs.map((c) => c.time))]
		.map((value) => value === '' ? 'No Time Specified' : value);

	return (
		<div className="mx-auto max-w-7xl p-3 sm:p-5 lg:p-6 mt-12">
			<h1 className="text-4xl text-slate-200 mb-1">
				Clubs List
			</h1>
			<p className="text-slate-400 mb-5">
				<span className="text-blue-400 font-semibold">Click</span> a club to view full details.
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
								displayedResults.length + 20,
							),
						),
					);
				}} 
				hasMore={displayedResults.length < searchResults.length}
				style={{ overflow: 'visible' }}
			> 
				<div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
					{displayedResults.map((club) => (
						<ClubCard 
							key={club.id} 
							c={club} 
							onClick={() => setSelectedClub(club)}
						/>
					))}
				</div>
			</InfiniteScroll>

			<ClubDialog 
				open={!!selectedClub} 
				onClose={() => setSelectedClub(null)} 
				club={selectedClub} 
			/>
		</div>
	);
}

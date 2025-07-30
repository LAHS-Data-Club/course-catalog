import { readClubs } from '../firebase/firebaseRepository';
import { useState, useEffect } from 'react';
import ClubCard from './ClubCard/ClubCard';
import Fuse from 'fuse.js';
import Search from './Search';
import { dateValues, searchFields, tagValues } from '../clubOptions';
import InfiniteScroll from 'react-infinite-scroll-component';
import { options, getSearchResults } from '../functions/search';

// returns a list of unique values of that property
function getUniqueValues(allData, property) {
	return [...new Set(allData.map((doc) => doc[property]))].map((value) =>
		value === '' ? 'No Time Specified' : value,
	);
}

const RELOAD_LS_TIME = 1000 * 60 * 60 * 1; // reload local storage every x milliseconds (1 hour)

export default function ClubCollection() {
	const [loading, setLoading] = useState(true);
	const [allData, setAllData] = useState([]); // TODO: contains ALL the data (check)
	const [searchQuery, setSearchQuery] = useState('');
	const [dateFilters, setDateFilters] = useState([]);
	const [timeFilters, setTimeFilters] = useState([]);
	const [tagFilters, setTagFilters] = useState([]);
	// TODO:
	const [searchResults, setSearchResults] = useState([]);
	const [displayedResults, setDisplayedResults] = useState([]);

	const fuse = new Fuse(allData == null ? [] : allData, options);

	// Call once on component mount: load allData from firebase or from local storage
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
				setAllData(clubs);
				setDisplayedResults(clubs.slice(0, 10));
				setLoading(false);
			});
		} else {
			setAllData(clubs);
			setDisplayedResults(clubs.slice(0, 10));
			setLoading(false);
			console.log('Loaded clubs from local storage.');
		}
	}, []);

	// When allData is set, give collection to search and display
	// TODO: unnecessary ?? alldata is set like once..?
	useEffect(() => {
		if (allData != null) {
			// localStorage.setItem("clubs", JSON.stringify(allData));
			fuse.setCollection(allData);
			setSearchResults(allData);
			setDisplayedResults(allData.slice(0, 10));
		}
	}, [allData]);

	// When the search query changes, update the data
	useEffect(() => {
		const results = getSearchResults(
			fuse,
			searchQuery,
			dateFilters,			
			timeFilters,
			tagFilters,
		);

		const items = results == null ? allData : results; // TODO:
		setSearchResults(items);
		setDisplayedResults(items.slice(0, 10));
	}, [searchQuery, searchFields, dateFilters, timeFilters, tagFilters]);

	const handleSearch = (event) => {
		const { value } = event.target;
		setSearchQuery(value);
	};

	return (
		<div className="pt-12 pr-50 pl-20">
			<h1 className="text-5xl text-slate-800 dark:text-slate-200 mb-5 font-semibold">
				Clubs List
			</h1>
			{loading && (
				<div role="status">
					<span className="sr-only">Loading...</span>
				</div>
			)}
			{allData.length > 0 && (
				<div className="flex-col flex">
					<Search
						onChange={handleSearch}
						setDateFilters={setDateFilters}
						setTimeFilters={setTimeFilters}
						setTagFilters={setTagFilters}
						dateFilters={dateFilters}
						timeFilters={timeFilters}
						tagFilters={tagFilters} 
						dateValues={dateValues}
						timeValues={getUniqueValues(allData, 'time')}
						tagValues={tagValues}
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

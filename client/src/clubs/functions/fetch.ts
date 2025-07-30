import { Club } from "../lib/types";

export async function readClubs() {
	const res = await readClubsFromCache();
	const clubs = replaceEmptyTime(res);

	localStorage.setItem('last_loaded', new Date().toISOString());
	localStorage.setItem('clubs', JSON.stringify(clubs));
	return clubs;
}

async function readClubsFromCache() {
	const res = await fetch('https://cachedclublist.lahsdataclub.com/clubs.json');
	const clubsJSON = await res.json();

	const clubs = [];
	for (let i = 0; i < clubsJSON.length; i++) {
		const club = { ...clubsJSON[i].fields };
		for (const key in club) {
			club[key] = club[key].stringValue;
		}
		clubs.push({ ...club, id: i });
	}

	// shift data club to the front :>
	const dataClubIndex = clubs.findIndex((club) => club.name === 'Data Club');
	if (dataClubIndex !== -1) {
		const dataClub = clubs.splice(dataClubIndex, 1);
		clubs.unshift(dataClub[0]);
	}
	return clubs;
}

const replaceEmptyTime = (clubs: Club[]) => {
	return clubs.map((club) =>
		club.time === '' ? { ...club, time: 'No Time Specified' } : club,
	);
};

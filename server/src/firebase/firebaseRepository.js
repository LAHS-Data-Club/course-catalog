import { db } from './firebaseConfiguration.js';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { sanitize } from '../../../../ClubList2.0/src/utilities.js';

// export const fbClubsCollection = collection(db, "clubs-2024");

export async function readClubs(resolve) {
	let clubs = [];

	// firebase code
	// clubs = await readClubsFromFirestore();

	// cache code
	clubs = await readClubsFromCache();
	clubs = replaceEmptyTime(clubs);

	localStorage.setItem('last_loaded', new Date());
	localStorage.setItem('clubs', JSON.stringify(clubs));

	resolve(clubs);
}

// async function readClubsFromFirestore() {
//     const clubs = [];

//     const querySnapshot = await getDocs(fbClubsCollection);
//     querySnapshot.forEach((doc) => {
//         let clubData = { ...doc.data(), id: doc.id };
//         // console.log(clubData);
//         clubs.push(clubData);
//     });

//     console.log("Loaded clubs from firebase.");

//     return clubs;
// }

async function readClubsFromCache() {
	const clubs = [];

	let request = await fetch(
		'https://cachedclublist.lahsdataclub.com/clubs.json',
	);
	let clubsJSON = await request.json();

	for (let id = 0; id < clubsJSON.length; id++) {
		let club = { ...clubsJSON[id].fields };

		for (let key in club) {
			club[key] = club[key].stringValue;
		}

		club = { ...club, id: id };

		clubs.push(club);
	}

	let dataClubIndex = clubs.findIndex((club) => club.name === 'Data Club');
	if (dataClubIndex !== -1) {
		let dataClub = clubs.splice(dataClubIndex, 1);
		clubs.unshift(dataClub[0]);
	}

	console.log('Loaded clubs from server cache.');

	return clubs;
}

const replaceEmptyTime = (clubs) => {
	return clubs.map((club) =>
		club.time === '' ? { ...club, time: 'No Time Specified' } : club,
	);
};

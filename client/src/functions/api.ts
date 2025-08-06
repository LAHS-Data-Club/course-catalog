import { DateTime } from "luxon";
import type { Club, DepartmentData } from "../lib/types";

// TODO: all of this is kindaaaa dubious... also we dont really need a server oop

export async function fetchDepartment(): Promise<DepartmentData[]> {
  return fetch(`${import.meta.env.VITE_API_URL}/api/departments`)
    .then((res) => res.json());
}

export async function fetchMonthEvents(startDate: DateTime) {
  const start = startDate.toFormat('M-dd-yyyy');
  const end = startDate.endOf('month').toFormat('M-dd-yyyy');
  const url = 
    `${import.meta.env.VITE_API_URL}/api/calendar?` +  // TODO: ISO instead?
    `startDate=${start}&` +
    `endDate=${end}`;

  return fetch(url).then((res) => res.json());
}

export async function fetchClubs(): Promise<Club[]> {
  console.log('fetching clubs from server cache')
  const res = await fetch('https://cachedclublist.lahsdataclub.com/clubs.json'); // TODO: 
	const clubsJSON = await res.json();

  await new Promise((resolve) => setTimeout(resolve, 2000))

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
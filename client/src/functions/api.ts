import { DateTime } from "luxon";
import type { Club, DepartmentData } from "../lib/types";

// TODO: all of this is kindaaaa dubious... also we dont really need a server oop
export async function fetchDepartment(): Promise<DepartmentData[]> {
  return fetch("/api/departments").then((res) => res.json());
}

export async function fetchMonthEvents(startDate: DateTime) {
  const start = startDate.toFormat("M-dd-yyyy");
  const end = startDate.endOf("month").toFormat("M-dd-yyyy");
  const url =
    `/api/calendar?` + // TODO: ISO instead?
    `startDate=${start}&endDate=${end}`;
  return fetch(url).then((res) => res.json());
}

export async function fetchClubs(): Promise<Club[]> {
  console.log("fetching clubs from server cache");
  const res = await fetch("https://cachedclublist.lahsdataclub.com/clubs.json"); // TODO:
  const clubsJSON = await res.json();

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const clubs = [];
  for (let i = 0; i < clubsJSON.length; i++) {
    const club = { ...clubsJSON[i].fields };
    for (const key in club) {
      club[key] = club[key].stringValue;
    }
    clubs.push({ ...club, id: i });
  }

  // shift data club to the front :)
  const dataClubIndex = clubs.findIndex((club) => club.name === "Data Club");
  if (dataClubIndex !== -1) {
    const dataClub = clubs.splice(dataClubIndex, 1);
    clubs.unshift(dataClub[0]);
  }
  return clubs;
}

export async function fetchUser() {
  return fetch("/api/session", { credentials: 'include' })
    .then((res) => res.json());
}

// schedules.ts
export async function fetchSchedule() { 
	return fetch('/api/schedule').then((res) => res.json());
}

export async function updateSchedule(schedule) {
  await fetch("/api/schedule/update", {
		method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ schedule }),
  });
}

export async function fetchGroups() {
  return fetch("/api/schedule/groups").then((res) => res.json());
}

export async function createGroup(name: string) { 
  await fetch("/api/schedule/groups/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}

// invites.ts
export async function createInvite(issuedBy: string, groupId: string, expiryDate: DateTime) {
  const res = await fetch("/api/schedule/groups/invite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ issuedBy, groupId, expiryDate }),
  });
  const data = await res.json();
  return data;
}

export async function fetchInvite(inviteId: string) {
  return fetch(`/api/schedule/groups/invite/${inviteId}`).then((res) => res.json());
}

export async function acceptInvite(inviteId: string) {
  await fetch("/api/schedule/invite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inviteId }),
  });
}

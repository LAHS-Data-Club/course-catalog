import { queryOptions } from "@tanstack/react-query";
import { DateTime } from "luxon";
import {
  fetchMonthEvents,
  fetchDepartment,
  fetchClubs,
  fetchUser,
  fetchGroups,
  fetchSchedule,
  fetchInvite,
  fetchTeachers
} from "./api";

export function calendarOptions(date: DateTime) {
  return queryOptions({
    queryKey: ["calendar", date],
    queryFn: () => fetchMonthEvents(date),
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60 * 24,
    meta: { persist: true }
  });
}

export function departmentOptions() {
  return queryOptions({
    queryKey: ["departments"],
    queryFn: () => fetchDepartment(),
    staleTime: 1000 * 60 * 60 * 24, 
    meta: { persist: true }
  });
}

export function clubOptions() {
  return queryOptions({
    queryKey: ["clubs"],
    queryFn: fetchClubs,
    staleTime: 1000 * 60 * 60 * 24,
    meta: { persist: true }
  });
}

// user.ts
export function userOptions() {
  return queryOptions({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 0,
  });
}

export function scheduleOptions() {
  return queryOptions({
    queryKey: ["schedule"],
    queryFn: () => fetchSchedule(),
    staleTime: 0,
  });
}

// groups.ts
export function groupOptions() {
  return queryOptions({
    queryKey: ["schedule", "groups"],
    queryFn: () => fetchGroups(),
    staleTime: 0, 
  });
}

// invites.ts
export function inviteOptions(inviteId: string) {
  return queryOptions({
    queryKey: ["invite", inviteId],
    queryFn: () => fetchInvite(inviteId),
    staleTime: 0, 
  });
}

export function teacherOptions() {
  return queryOptions({
    queryKey: ["teachers"],
    queryFn: fetchTeachers,
    staleTime: 1000 * 60 * 60 * 24,
    meta: { persist: true }
  });
}

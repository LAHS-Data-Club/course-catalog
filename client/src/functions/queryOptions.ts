import { queryOptions } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { fetchMonthEvents, fetchDepartment, fetchClubs } from "./api";

export function calendarOptions(date: DateTime) {
  return queryOptions({
    queryKey: ['calendar', date],
    queryFn: () => fetchMonthEvents(date),
    refetchOnMount: false, 
    staleTime: 1000 * 60 * 60 * 12, // TODO:
  });
}

export function departmentOptions() {
  return queryOptions({
    queryKey: ['departments'],
    queryFn: () => fetchDepartment(),
    staleTime: 1000 * 60 * 60 * 12, // TODO:
  });
}

export function clubOptions() {
  return queryOptions({
    queryKey: ['clubs'],
    queryFn: fetchClubs,
    staleTime: 1000 * 60 * 60 * 12, // TODO:
  });
}
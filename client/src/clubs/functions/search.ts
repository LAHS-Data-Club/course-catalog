import Fuse from "fuse.js";
import { searchFields } from "../clubOptions";

export const options = {
  includeScore: true,
  includeMatches: true,
  threshold: 0.2,
  ignoreLocation: true,
  keys: searchFields,
};

export function getSearchResults(
  clubs: Club[],
  searchQuery: string, 
  dateFilters: string[],
  timeFilters: string[],
) {
  const query: Fuse.Expression = { $and: [] };

  // normal fuzzy search
  if (searchQuery.length !== 0) {
    query.$and?.push({
      $or: searchFields.map((field) => ({
        [field]: searchQuery,
      })),
    });
  }

  // date filters
  if (dateFilters.length > 0) {
    query.$and?.push({
      $or: dateFilters.map((filter) => ({ day: filter })),
    });
  }

  // time filters
  if (timeFilters.length > 0) {
    query.$and?.push({
      $or: timeFilters.map((filter) => ({ time: filter })),
    });
  }

  if (query.$and?.length) {
    const results = fuse.search(query).map((result) => result.item);
    return results
  }
  return null; // TODO: fix
}
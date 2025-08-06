import NodeCache from "node-cache";
import { DateTime } from "luxon";
import { fetchCalendarData } from "../fetchers/google-calendar";

class Cache {
  cache: NodeCache;

  constructor(ttlSeconds = 60 * 60 * 24) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
    });
  }

  async get(key, fn) {
    const value = await this.cache.get(key);
    if (value) {
      return value;
    }

    console.log("fetching new data for", key);
    return fn().then((data) => {
      this.cache.mset(data);
      return this.cache.get(key);
    });
  }

  flush() {
    this.cache.flushAll();
  }

  del(keys) {
    this.cache.del(keys);
  }
}

class ScheduleCache extends Cache {
  constructor() {
    super();
  }

  async get(date) {
    return super.get(date, () => fetchCalendarData(date));
  }

  async getRange(startDate: string, endDate: string = startDate) {
    const start = DateTime.fromFormat(startDate, "M-dd-yyyy");
    const end = DateTime.fromFormat(endDate, "M-dd-yyyy");

    const combined = {};
    let curr = start; 
    while (curr <= end) {
      const key = curr.toFormat("M-dd-yyyy");
      const data = await this.get(key);
      combined[key] = data
      curr = curr.plus({ days: 1 });
    }
    // console.log(combined); // this runs many times ?

    if (endDate === startDate) {
      return combined[startDate];
    }
    return combined;
  }
}

export { Cache, ScheduleCache };

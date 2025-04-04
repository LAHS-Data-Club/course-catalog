import NodeCache from "node-cache";

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

    console.log("fetching new data....");
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

export default Cache;

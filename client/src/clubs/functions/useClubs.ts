import { useEffect, useState } from "react";
import { Club } from "../lib/types";
import { readClubs } from "./fetch";
import { fuse } from "./search";

 // reload local storage every x milliseconds (1 hour)
const RELOAD_LS_TIME = 1000 * 60 * 60 * 1; 

export function useClubs() {
  const [isLoading, setIsLoading] = useState(true);
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    (async () => {
      // Read values from local storage
      const lastLoaded = localStorage.getItem('last_loaded');
      const clubs = localStorage.getItem('clubs');

      // load clubs from firebase if specified time has passed / clubs is empty
      const shouldFetch = 
        !lastLoaded ||
        !clubs ||
        isNaN(Date.parse(lastLoaded)) ||
        new Date().getTime() - Date.parse(lastLoaded) >= RELOAD_LS_TIME;

      if (shouldFetch) {
        const data = await readClubs();
        setClubs(data);
        fuse.setCollection(data);
        console.log('Loaded clubs from server cache.');
      } else {
        setClubs(JSON.parse(clubs));
        console.log('Loaded clubs from local storage.');
      }
      setIsLoading(false);
    })();
  }, []);

  return {
    clubs,
    isLoading
  }
}
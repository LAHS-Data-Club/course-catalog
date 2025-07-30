import { useEffect, useState } from "react";
import { Club } from "../lib/types";
import { readClubs } from "./fetch";

 // reload local storage every x milliseconds (1 hour)
const RELOAD_LS_TIME = 1000 * 60 * 60 * 1; 

export function useClubs() {
  const [isLoading, setIsLoading] = useState(true);
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    console.log('running this');
    // Read values from local storage
    const lastLoaded = Date.parse(localStorage.getItem('last_loaded'));
		const clubs = JSON.parse(localStorage.getItem('clubs'));

    // load clubs from firebase if specified time has passed / clubs is empty
    if (
      isNaN(lastLoaded) ||
      new Date() - lastLoaded >= RELOAD_LS_TIME ||
      clubs == null ||
      clubs.length === 0
    ) {
      new Promise(readClubs).then((clubs) => setClubs(clubs));
      console.log('Loaded clubs from server cache.');
    } else {
      setClubs(clubs);
      console.log('Loaded clubs from local storage.');
    }
    setIsLoading(false);
  }, []);

  return {
    clubs,
    isLoading
  }
}
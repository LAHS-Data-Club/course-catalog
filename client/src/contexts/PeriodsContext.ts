import { createContext } from "react";

export const PeriodsContext = createContext<{
  periods: Periods;
  setPeriods: React.Dispatch<React.SetStateAction<Periods>>;
}>({
  periods: {},
  setPeriods: () => {},
});

export interface Periods {
  [key: string]: string;
}

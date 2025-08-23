import { createContext } from "react";

// TODO: later replace with refetchOnMount: false or smth like that
export const UserContext = createContext<{
  userQuery: any;
  scheduleQuery: any;
}>({ 
  userQuery: null,
  scheduleQuery: null,
});


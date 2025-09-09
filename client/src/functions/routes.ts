import { FaHome, FaRegCalendarAlt, FaRegUserCircle, FaBook, FaAddressBook, FaWrench } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";

export const routes = [
  { path: "/", label: "Home", icon: FaHome },
  { path: "/calendar", label: "Calendar", icon: FaRegCalendarAlt },
  { path: "/courses", label: "Courses", icon: FaBook },
  { path: "/schedule-sharing", label: "Schedules", icon: FaAddressBook },
  { path: "/clubs", label: "Clubs", icon: IoPeopleSharp },
  { path: "/settings", label: "Settings", icon: FaWrench }, // we can use a diff icon i don't love this one
];
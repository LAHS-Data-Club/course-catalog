import { FaHome, FaRegCalendarAlt, FaRegUserCircle, FaBook } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";

export const routes = [
  { path: "/", label: "Home", icon: FaHome },
  { path: "/calendar", label: "Calendar", icon: FaRegCalendarAlt },
  { path: "/courses", label: "Courses", icon: FaBook },
  { path: "/clubs", label: "Clubs", icon: IoPeopleSharp },
  { path: "/profile", label: "User", icon: FaRegUserCircle },
];
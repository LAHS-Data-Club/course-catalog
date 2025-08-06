import { createContext } from "react";
import { Course, DepartmentData } from "../lib/types";

export const CoursesContext = createContext<{
  data: DepartmentData[];
  setClassPopup: (c: Course) => void;
}>({
  data: [],
  setClassPopup: () => {},
});

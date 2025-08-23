import { nanoid } from "nanoid";

export interface Period {
  type: string;
  name: string;
  time: string;
}

export interface Schedule {
  name: string;
  title: string;
  subtitle: string;
  periods: Period[];
}

export interface ScheduleData {
  regularSchedules: Schedule[];
  specialSchedules: Schedule[];
  finalSchedules: Schedule[];
}

export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
  location?: string;
  htmlLink: string;
}

export interface SelectedEventDetails extends CalendarEvent {
  formattedStart: string;
  formattedEnd: string;
  isAllDay: boolean;
}

export type Department =
  | "pe"
  | "electives"
  | "english"
  | "math"
  | "performing-arts"
  | "science"
  | "social-studies"
  | "ted"
  | "visual-arts"
  | "language";

export interface Course {
  name: string;
  id: string;
  description: string;
  level: {
    name: string;
  };
  tags: string[];
  prerequisite: string[];
  recommendations: string;
  units: { unit: string }[];
  gradingCategories: { name: string; weight: number }[];
  gradingDescription: string[];
  gradeDistribution: any[];
  homeworkDescription: any[];
  contacts: string[];
  books: any[];
  links: any[];
}

export interface LimitedCourse {
  id: string;
  name: string;
  department: Department;
}

export interface DepartmentMetadata {
  media: any[];
  description: string;
  approvedBy: string;
  status: { name: string }[];
}

export interface DepartmentData {
  id: Department;
  classes: Course[];
  metadata: DepartmentMetadata;
}

export const generateDefaultCourse = (): Course => ({
  id: nanoid(),
  name: "",
  description: "",
  level: { name: "" },
  tags: [],
  prerequisite: [],
  units: [],
  gradingCategories: [],
  gradeDistribution: [],
  gradingDescription: [],
  contacts: [],
  books: [],
  links: [],
  recommendations: "",
  homeworkDescription: [],
});

export const departments = [
  { id: "pe", name: "Physical Education" },
  { id: "electives", name: "Electives" },
  { id: "english", name: "English" },
  { id: "math", name: "Mathematics" },
  { id: "performing-arts", name: "Performing Arts" },
  { id: "science", name: "Science" },
  { id: "social-studies", name: "Social Studies" },
  { id: "ted", name: "Technology & Engineering" },
  { id: "visual-arts", name: "Visual Arts" },
  { id: "language", name: "World Languages" },
] as { id: Department; name: string }[];

export interface Club {
  id: number,
  day: string,
  time: string,
  description: string,
  location: string | number, 
  name: string,
  url: string,
  advisor: string,
  advisor_email: string,
  president: string,
  tags: string,
  sign_up?: string,
  president_email: string,
  tier: string,
  activities: string,
}

export interface Group {
  id: string;
  title: string;
  owner_id: string;
  members: User[];
}

export interface User {
  google_id: string;
  name: string;
  email: string;
  schedule: Record<string, string>;
}

export interface Periods {
  [key: string]: string;
}
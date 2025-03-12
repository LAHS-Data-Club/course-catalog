import { nanoid } from "nanoid";

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

import { getDb } from "../util/db";
import { Course, Department, DepartmentData } from "../util/types";

export async function fetchAllCourses(): Promise<Course[]> {
  const departments = await (await getDb())
    .collection<DepartmentData>("departments")
    .find()
    .toArray();
  const courses = departments.flatMap((dept) => dept.classes);
  return courses;
}

export async function fetchDepartment(
  dept: Department
): Promise<DepartmentData | null> {
  const department = await (await getDb())
    .collection<DepartmentData>("departments")
    .findOne({ id: dept });
  return department;
}

export async function fetchAllDepartments(): Promise<DepartmentData[]> {
  const departments = await (await getDb())
    .collection<DepartmentData>("departments")
    .find()
    .toArray();
  return departments;
}

import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import CoursePopup from "../pages/courses/components/CoursePopup";
import { Course, departments } from "../lib/types"; // Assuming 'departments' is defined and exported in '../lib/types'
import { CoursesContext } from "../contexts/CoursesContext";
import { departmentOptions } from "../functions/queryOptions";
import { useQuery } from "@tanstack/react-query";
import Error from "../components/Error";

export default function CoursesLayout() {
  const [classPopup, setClassPopup] = useState<Course | null>(null);
  const { data: courses, isPending, isError } = useQuery(departmentOptions());

  // bleh
  const navLinkClass = (isActive: boolean) =>
    `whitespace-nowrap p-4 transition-colors ${
      isActive
        ? 'bg-blue-500 text-white shadow-sm'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
    }`;
  
  if (isPending) return <div className="p-8 text-center text-slate-500">Loading courses...</div>;
  if (isError) return <Error message={"Unable to fetch courses."} />; // TODO:

  return (
    <CoursesContext.Provider value={{ data: courses , setClassPopup }}>
      {classPopup && <CoursePopup c={classPopup} onClose={() => setClassPopup(null)} />}
      
      <div className="mx-auto max-w-7xl p-3 sm:p-5 lg:p-6 mt-12 w-full">
        <h1 className="text-4xl text-slate-800 dark:text-slate-200 mb-1">Course Catalog</h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400 mb-5">
            <span className="text-slate-700 dark:text-blue-400 font-semibold">Click</span> a class to toggle pathway recommendations or <span className="text-slate-700 font-semibold dark:text-blue-400">double-click</span> for full details.
        </p>

        <div className="mb-7 border-b border-slate-200 dark:border-slate-700"> 
          <nav className="flex space-x-3 overflow-x-scroll overflow-y-hidden ">
            <NavLink to="/courses" end>
              {({ isActive }) => (
                <div className={navLinkClass(isActive)}>
                  All Courses
                </div>
              )}
            </NavLink>
            {departments.map((d) => (
              <NavLink to={d.id} key={d.id}>
                {({ isActive }) => (
                  <div className={navLinkClass(isActive)}>
                    {d.name}
                  </div>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        {/** TODO: */}
        <Outlet />
      </div>
    </CoursesContext.Provider>
  );
}
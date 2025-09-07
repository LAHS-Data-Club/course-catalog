import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { Course, departments } from "../lib/types"; 
import { CoursesContext } from "../contexts/CoursesContext";
import { departmentOptions } from "../functions/queryOptions";
import { useQuery } from "@tanstack/react-query";
import CourseDialog from "../components/courses/CourseDialog";
import Error from "../components/Error";

export default function CoursesLayout() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { data: courses, isPending, isError } = useQuery(departmentOptions());

  const routes = [
    { to: "", label: "All Courses" },
    ...departments.map((d) => ({ to: d.id, label: d.name })) // reiterating department routes
  ];

  if (isPending) return <div className="p-8 text-center text-slate-500">Loading courses...</div>;
  if (isError) return <Error message={"Unable to fetch courses."} />; // TODO: error handling

  return (
    <CoursesContext.Provider value={{ data: courses , setClassPopup: setSelectedCourse }}>
      <div className="mx-auto max-w-7xl p-3 sm:p-5 lg:p-6 mt-12 w-full">
        <h1 className="text-4xl text-slate-800 dark:text-slate-200 mb-1">Course Catalog</h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400 mb-5">
          <span className="text-slate-700 dark:text-blue-400 font-semibold">Click</span> a class to toggle pathway recommendations or <span className="text-slate-700 font-semibold dark:text-blue-400">double-click</span> for full details.
        </p>

        {/** Tabs */}
        <div className="mb-7 border-b border-slate-200 dark:border-slate-700"> 
          <nav className="flex space-x-3 overflow-x-scroll overflow-y-hidden ">
            {routes.map((route, i) => (
              <NavLink to={route.to} key={i} end>
                {({ isActive }) => (
                  <div className={`
                    whitespace-nowrap p-4 transition
                    ${isActive ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-800'}
                  `}>
                    {route.label}
                  </div>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/** Course Dialog */}
        <CourseDialog open={!!selectedCourse} onClose={() => setSelectedCourse(null)} course={selectedCourse} />

        {/** Main Content */}
        <Outlet />
      </div>
    </CoursesContext.Provider>
  );
}
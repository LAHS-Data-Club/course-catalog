// --- CoursesLayout.tsx ---
import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import ClassPopup from "../components/courses/ClassPopup";
import { Course, departments } from "../lib/types"; // Assuming 'departments' is defined and exported in '../lib/types'
import { CoursesContext } from "../components/contexts/CoursesContext";

function CoursesLayout() {
  const [classData, setClassData] = useState([]);
  const [classPopup, setClassPopup] = useState<Course | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/departments`)
      .then((res) => res.json())
      .then((data) => setClassData(data));
  }, []);

  if (!classData.length) return <div className="p-8 text-center text-slate-500">Loading courses...</div>;

  const navLinkClass = (isActive: boolean) =>
    `whitespace-nowrap rounded-lg px-4 py-2.5 text-base font-medium transition-colors ${
      isActive
        ? 'bg-indigo-600 text-white shadow-sm'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
    }`;

  return (
    <CoursesContext.Provider value={{ data: classData, setClassPopup }}>
      {classPopup && <ClassPopup c={classPopup} closePopup={() => setClassPopup(null)} />}
      
      <div className="mx-auto max-w-7xl p-3 sm:p-5 lg:p-6">
        <div className="mb-6"> {/* Reduced margin-bottom */}
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Course Catalog</h1>
          <p className="mt-1.5 max-w-2xl text-slate-600 dark:text-slate-400">
             <strong className="text-slate-700 dark:text-slate-200">Click</strong> a class to toggle pathway recommendations or <strong className="text-slate-700 dark:text-slate-200">double-click</strong> for full details.
          </p>
        </div>

        <div className="mb-7 border-b border-slate-200 dark:border-slate-700"> {/* Adjusted margin-bottom */}
          <nav className="-mb-px flex space-x-3 overflow-x-auto pb-px" aria-label="Departments"> {/* Increased space-x */}
            <NavLink to="/courses" end>
              {({ isActive }) => <span className={navLinkClass(isActive)}>All Courses</span>}
            </NavLink>
            {departments.map((d) => (
              <NavLink to={d.id} key={d.id}>
                {({ isActive }) => (
                  <span className={navLinkClass(isActive)}>
                    {d.name === "Tech & Engineering" ? "CTE" : d.name === "Mathematics" ? "Math" : d.name}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <Outlet />
      </div>
    </CoursesContext.Provider>
  );
}

export default CoursesLayout;
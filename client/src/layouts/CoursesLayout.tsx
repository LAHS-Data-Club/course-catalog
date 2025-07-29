import { Outlet, NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ClassPopup from "../components/courses/ClassPopup";
import { Course, departments } from "../lib/types"; // Assuming 'departments' is defined and exported in '../lib/types'
import { CoursesContext } from "../components/contexts/CoursesContext";

export default function CoursesLayout() {
  const { dept } = useParams();
  const [classData, setClassData] = useState([]);
  const [classPopup, setClassPopup] = useState<Course | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/departments`)
      .then((res) => res.json())
      .then((data) => setClassData(data));
  }, []);

  if (!classData.length) return <div className="p-8 text-center text-slate-500">Loading courses...</div>;

  const navLinkClass = (isActive: boolean) =>
    `whitespace-nowrap p-4 transition-colors ${
      isActive
        ? 'bg-blue-500 text-white shadow-sm'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
    }`;

  return (
    <CoursesContext.Provider value={{ data: classData, setClassPopup }}>
      {classPopup && <ClassPopup c={classPopup} closePopup={() => setClassPopup(null)} />}
      
      <div className="mx-auto max-w-7xl p-3 sm:p-5 lg:p-6 mt-12">
        <h1 className="text-4xl text-slate-800 dark:text-slate-200 mb-1">Course Catalog</h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400 mb-5">
            <span className="text-slate-700 dark:text-blue-400 font-semibold">Click</span> a class to toggle pathway recommendations or <span className="text-slate-700 font-semibold dark:text-blue-400">double-click</span> for full details.
        </p>

        <div className="mb-7 border-b border-slate-200 dark:border-slate-700"> 
          <nav className="flex space-x-3 overflow-x-scroll overflow-y-hidden ">
            <NavLink to="/courses" end>
              {({ isActive }) => <div className={navLinkClass(isActive)}>All Courses</div>}
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
        <Outlet />
      </div>
    </CoursesContext.Provider>
  );
}


        // <div className="flex justify-between relative z-2 border-b-3 border-b-neutral-600 mb-4 pb-4">
        //     <div className="w-2/3">
        //       <button
        //         onClick={() => setShowDropdown(!showDropdown)}
        //         className="cursor-pointer bg-neutral-800 border border-neutral-500 w-full py-2 px-7 flex justify-between items-center text-lg"
        //       >
        //         <div>
        //           {departments.find((d) => d.id === dept)?.name ||
        //             "All Courses"}
        //         </div>
        //         <div
        //           className={`text-xl font-bold transition-transform ease duration-500 ${
        //             showDropdown ? "rotate-270" : "rotate-90"
        //           }`}
        //         >
        //           &#8250;
        //         </div>
        //       </button>
        //       <div
        //         className={`${
        //           showDropdown ? "scale-y-100" : "scale-y-0"
        //         } origin-top duration-300 flex flex-col absolute bg-neutral-800 border border-neutral-500 w-2/3`}
        //       >
        //         <NavLink
        //           onClick={() => setShowDropdown(false)}
        //           className="hover:bg-blue-400 py-3 px-7 transition"
        //           to={"/courses"}
        //         >
        //           All Courses
        //         </NavLink>
        //         {Object.entries(departments).map(([_key, value]) => (
        //           <NavLink
        //             onClick={() => setShowDropdown(false)}
        //             className="hover:bg-blue-400 py-3 px-7 transition"
        //             to={value.id}
        //             key={value.id}
        //           >
        //             {value.name}
        //           </NavLink>
        //         ))}
        //       </div>
        //     </div>
        // </div>
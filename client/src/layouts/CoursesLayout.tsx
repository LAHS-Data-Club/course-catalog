import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router";
import ClassPopup from "../components/courses/ClassPopup";
import { Course, departments } from "../lib/types";
import { CoursesContext } from "../components/contexts/CoursesContext";

function CoursesLayout() {
  const { dept } = useParams();
  const [classData, setClassData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [classPopup, setClassPopup] = useState<Course | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/departments`)
      .then((res) => res.json())
      .then((data) => {
        setClassData(data);
      });
  }, []);

  if (!classData) return <div>Loading...</div>;

  return (
    <CoursesContext.Provider value={{ data: classData, setClassPopup }}>
      {classPopup && (
        <ClassPopup c={classPopup} closePopup={() => setClassPopup(null)} />
      )}
      <div className="flex flex-col mt-10 items-center min-h-full">
        <div className="mb-3 rounded w-5/6 pl-4 text-left p-1.5 bg-neutral-800">
          <h3 className="text-3xl mb-1">Classes</h3>
          <p className="text-sm text-neutral-400">
            Click on a class to see future options & recommendations. Double
            click a class for more info.
          </p>
        </div>

        {/** does not close if u click outside lol */}
        <div className="p-5 w-5/6 bg-neutral-700 shadow-lg">
          <div className="flex justify-between relative z-2 border-b-3 border-b-neutral-600 mb-4 pb-4">
            <div className="w-2/3">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="cursor-pointer bg-neutral-800 border border-neutral-500 w-full py-2 px-7 flex justify-between items-center text-lg"
              >
                <div>
                  {departments.find((d) => d.id === dept)?.name ||
                    "All Courses"}
                </div>
                <div
                  className={`text-xl font-bold transition-transform ease duration-500 ${
                    showDropdown ? "rotate-270" : "rotate-90"
                  }`}
                >
                  &#8250;
                </div>
              </button>
              <div
                className={`${
                  showDropdown ? "scale-y-100" : "scale-y-0"
                } origin-top duration-300 flex flex-col absolute bg-neutral-800 border border-neutral-500 w-2/3`}
              >
                <NavLink
                  onClick={() => setShowDropdown(false)}
                  className="hover:bg-blue-400 py-3 px-7 transition"
                  to={"/courses"}
                >
                  All Courses
                </NavLink>
                {Object.entries(departments).map(([_key, value]) => (
                  <NavLink
                    onClick={() => setShowDropdown(false)}
                    className="hover:bg-blue-400 py-3 px-7 transition"
                    to={value.id}
                    key={value.id}
                  >
                    {value.name}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="flex gap-4 text-blue-300">
              {/** pathway overview & help/info? */}
              <button>btn1</button>
              <button>btn2</button>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </CoursesContext.Provider>
  );
}

export default CoursesLayout;

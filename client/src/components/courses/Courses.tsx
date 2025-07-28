// --- Courses.tsx ---
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import generateHighlighter from "./highlights";
import Class from "./Class"; // Assuming this is the path to your Class component
import { CoursesContext } from "../contexts/CoursesContext";

// Using more subtle, gray-focused highlights with an indigo accent for the selected class.
const highlightColors = {
  "recommended-before": "bg-rose-500/50 dark:bg-rose-500/40 text-rose-800 dark:text-rose-200",
  "recommended-after": "bg-teal-500/50 dark:bg-teal-500/40 text-teal-800 dark:text-teal-200",
  selected: "bg-indigo-500 dark:bg-indigo-600 text-white",
};

function Courses() {
  const { dept } = useParams();
  const { data, setClassPopup } = useContext(CoursesContext);
  const [selectedID, setSelectedID] = useState<string | null>(null);
  const classes = data.find((d) => d.id === dept)?.classes || [];

  useEffect(() => {
    setSelectedID(null);
  }, [dept]);

  const highlights = selectedID ? generateHighlighter(classes, selectedID, false) : {};
  const uniqueLevels = [...new Set(classes.map((c) => c.level.name))].sort();

  function classesFromLevel(level: string) {
    return classes
      .filter((c) => c.level.name === level)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="w-full space-y-8"> {/* Reduced space-y */}
      {/* Pathway Legend container - always present for consistent layout */}
      <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <div className={`flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-3 transition-opacity duration-300 ease-in-out ${selectedID ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">Pathway Legend:</h3>
          {Object.entries(highlightColors).map(([key, value]) => (
            <div className="flex items-center gap-2.5" key={key}>
              <div className={`h-4 w-4 rounded-sm ${value.split(' ')[0]}`}></div>
              <div className="text-base capitalize text-slate-600 dark:text-slate-300">{key.replace("-", " ")}</div>
            </div>
          ))}
          {selectedID && ( // Only show clear button if something is selected
            <button 
              onClick={() => setSelectedID(null)} 
              className="ml-auto text-sm text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Clear Selection
            </button>
          )}
        </div>
      </div>
      
      {uniqueLevels.map((level) => (
        <section key={level}>
          <div className="border-b border-slate-200 pb-2 mb-5 dark:border-slate-700"> {/* Adjusted margin-bottom */}
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{level}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"> {/* Reduced gap */}
            {classesFromLevel(level).map((c) => (
              <Class
                key={c.id}
                c={c} // This was the missing prop!
                onClick={() => {
                  if (selectedID === c.id) {
                    setSelectedID(null); // Deselect if already selected
                  } else {
                    setSelectedID(c.id); // Select and show pathway
                  }
                }}
                onDoubleClick={() => setClassPopup(c)} // Double-click for full details
                highlight={highlightColors[highlights[c.id] as keyof typeof highlightColors]}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Courses;
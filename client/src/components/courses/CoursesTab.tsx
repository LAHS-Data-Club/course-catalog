import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import CourseCard from "./CourseCard"; 
import { CoursesContext } from "../../contexts/CoursesContext";
import generateHighlighter from "../../functions/courses/highlights";

const highlightColors = {
  "recommended-before": "bg-rose-500/20 dark:bg-rose-500/20 text-rose-800 dark:text-rose-200",
  "recommended-after": "bg-teal-500/20 dark:bg-teal-500/20 text-teal-800 dark:text-teal-200",
  selected: "bg-indigo-500 dark:bg-blue-500 text-white",
};

export default function Courses() {
  const { dept } = useParams();
  const [selectedID, setSelectedID] = useState<string>('');
  const { data, setClassPopup } = useContext(CoursesContext);

  useEffect(() => {
    setSelectedID('');
  }, [dept]);

  const classes = data.find((d) => d.id === dept)?.classes;
  if (!classes) throw new Error("Department not found.");

  const highlights = selectedID ? generateHighlighter(classes, selectedID, false) : {};
  const uniqueLevels = [...new Set(classes.map((c) => c.level.name))].sort();

  function classesFromLevel(level: string) {
    return classes!
      .filter((c) => c.level.name === level)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="w-full space-y-8"> 
      <div className="rounded border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <div className={`flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-3 transition-opacity duration-300 ease-in-out`}>
          <h3 className="text-base text-slate-800 dark:text-slate-100">Pathway Legend:</h3>
          {Object.entries(highlightColors).map(([key, value]) => (
            <div className="flex items-center gap-2.5" key={key}>
              <div className={`h-4 w-4 rounded-sm ${value.split(' ')[0]}`}></div>
              <div className="text-base capitalize text-slate-600 dark:text-slate-300">{key.replace("-", " ")}</div>
            </div>
          ))}
        </div>
      </div>
      
      {uniqueLevels.map((level) => (
        <section key={level}>
          <div className="border-b border-slate-200 pb-2 mb-5 dark:border-slate-700"> 
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{level}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"> 
            {classesFromLevel(level).map((c) => (
              <CourseCard
                key={c.id}
                c={c} 
                onClick={() => selectedID === c.id ? setSelectedID('') : setSelectedID(c.id)}
                onDoubleClick={() => setClassPopup(c)} 
                highlight={highlightColors[highlights[c.id] as keyof typeof highlightColors]}
              />
            ))} 
          </div>
        </section>
      ))}
    </div>
  );
}
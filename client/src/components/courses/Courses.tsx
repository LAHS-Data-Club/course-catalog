import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import generateHighlighter from "./highlights";
import Class from "./Class";
import { CoursesContext } from "../contexts/CoursesContext";

// ISSUE: its hard to see classes because they arent aranged next to their prereqs, so super long lists are hell
// OTHER CONSIDERATION: dance in pe or performing arts ? weird to put in both ? what shoudl we do considering pathways purpose
const highlightColors = {
  "recommended-before": "bg-rose-400",
  "recommended-after": "bg-teal-400",
  selected: "bg-blue-400",
};

function Courses() {
  const { dept } = useParams();
  const { data, setClassPopup } = useContext(CoursesContext);
  const [selectedID, setSelectedID] = useState<string | null>(null);
  const classes = data.find((d) => d.id === dept)?.classes || [];

  // i dont really like this ==> i need to reset selected idk whenever dept changes, but effect runs later so its kinda scuffed like this and idk what it should be instead
  useEffect(() => {
    setSelectedID(null);
  }, [dept]);

  const highlights = selectedID
    ? generateHighlighter(classes, selectedID, true)
    : ({} as Record<string, string>);
  const uniqueLevels = [...new Set(classes.map((c) => c.level.name))].sort(
    (a, b) => a.localeCompare(b)
  );

  function classesFromLevel(level: string) {
    return classes
      .filter((c) => c.level.name === level)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="overflow-auto">
      {/** pathway key idk when to pull out components */}
      {selectedID && (
        <div className="flex flex-wrap mb-5">
          {Object.entries(highlightColors).map(([key, value]) => (
            <div className="flex items-center gap-1 mr-10" key={key}>
              <div className={`w-4 h-4 rounded ${value}`}></div>
              <div className="capitalize font-semibold">
                {key.replace("-", " ")}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-6">
        {uniqueLevels.map((level) => (
          <section className="min-w-60 flex-1 flex flex-col gap-5" key={level}>
            <div className="w-full bg-neutral-800 text-center p-3 rounded uppercase font-bold">
              {level}
            </div>
            {classesFromLevel(level).map((c) => (
              <Class
                key={c.id}
                c={c}
                onClick={() => setSelectedID(c.id)}
                onDoubleClick={() => setClassPopup(c)}
                highlight={
                  highlightColors[
                    highlights[c.id] as keyof typeof highlightColors
                  ]
                }
              />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

export default Courses;

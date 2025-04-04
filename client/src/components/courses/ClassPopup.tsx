import { useRef } from "react";
import { Course } from "../../lib/types";

interface ClassPopupProps {
  c: Course;
  closePopup: () => void;
}

function ClassPopup({ c, closePopup }: ClassPopupProps) {
  const ref = useRef<HTMLDivElement>(null);
  document.body.setAttribute("style", "overflow: hidden");

  return (
    <div
      onClick={(e) => {
        if (!ref.current?.contains(e.target as Node)) {
          closePopup();
        }
      }}
      className="fixed z-10 top-0 bottom-0 left-0 right-0 bg-black/60 flex items-center justify-center"
    >
      <div
        id="modal"
        ref={ref}
        className="relative z-15 h-110 w-110 bg-neutral-700 border-2 border-blue-300 p-5 overflow-auto"
      >
        <div className="flex items-center gap-5 flex-wrap mb-3 pr-5">
          <h4 className="font-semibold uppercase">{c.name}</h4>
          <div id="tags" className="flex gap-2">
            {c.tags.map((tag) => (
              <div
                className="text-xs font-semibold bg-neutral-600 rounded py-1 px-3"
                key={tag}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {c.recommendations && (
        <p className="text-sm italic text-blue-300 mb-1">
          *Recommended: {c.recommendations}
        </p>
        )}
        <p className="text-sm mb-4">{c.description}</p>
        <hr />
        <div className="px-4">
          {/** repetition */}
          {c.units.length > 0 && <h5 className="font-semibold mt-4">Topics Covered:</h5>}
          <ul className="list-disc pl-4 text-sm text-neutral-300">
            {c.units.map(unit => (
              <li>{unit.unit}</li>
            ))}
          </ul>
          {c.gradingDescription.length > 0 && <h5 className="font-semibold mt-4">Workload Info:</h5>}
          <ul className="list-disc pl-4 text-sm text-neutral-300">
            {c.gradingDescription.map((x) => (
              <li>{x}</li>
            ))}
          </ul>
          {c.gradingCategories.length > 0 && <h5 className="font-semibold mt-4">Grading Categories:</h5>}
          <ul className="text-sm text-gray-300">
            {c.gradingCategories.map((x) => (
              <li className="flex justify-between">
                <span className="text-neutral-300">{x.name}</span>
                <span className="text-blue-300">{x.weight}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ClassPopup;

import { useRef } from "react";

import { Course } from "../../lib/types";

interface ClassPopupProps {
  c: Course;
  closePopup: () => void;
}

function ClassPopup({ c, closePopup }: ClassPopupProps) {
  // this feels really silly not using a library but wtv
  // annoying scroll behavior through bg, this solution seems silly
  const ref = useRef<HTMLDivElement>(null);

  // or this for clarity ig
  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, []);
  document.body.setAttribute("style", "overflow: hidden");

  return (
    <div
      onClick={(e) => {
        if (!ref.current?.contains(e.target as Node)) {
          closePopup();
        }
      }}
      className="fixed z-10 top-0 bottom-0 left-0 right-0 bg-black/50 flex items-center justify-center"
    >
      <div
        id="modal"
        ref={ref}
        className="relative z-15 h-100 w-100 bg-neutral-700 border-blue-400 border-2 p-5 overflow-auto"
      >
        <div className="flex items-center gap-5 flex-wrap mb-3">
          <h4 className="font-semibold uppercase">{c.name}</h4>
          <div id="tags" className="flex gap-2">
            {c.tags.map((tag) => (
              <div className="text-xs bg-neutral-600 w-fit py-1 px-3 rounded-md">
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
        <p className="text-sm mb-2">{c.description}</p>

        <p className="text-sm">rest of the info goes here lol</p>
      </div>
    </div>
  );
}

export default ClassPopup;

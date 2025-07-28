import { Course } from "../../lib/types";

interface Props {
  c: Course;
  onDoubleClick: () => void;
  onClick?: () => void;
  highlight?: string;
}

function Class({ c, onDoubleClick, onClick, highlight }: Props) {
  // Use a different style for the highlighted card text to ensure readability
  const textColorClass = highlight ? (highlight.includes("text-") ? "" : "text-white") : "text-slate-500 dark:text-slate-400";
  const titleColorClass = highlight ? (highlight.includes("text-") ? "" : "text-white") : "text-slate-900 dark:text-slate-100";

  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={`group flex h-full cursor-pointer flex-col rounded-xl p-5 ring-1 ring-slate-200/80 transition-all duration-200 hover:shadow-xl hover:scale-[1.02] hover:ring-indigo-500/50 dark:ring-slate-700 dark:hover:ring-indigo-500/50 ${
        highlight || "bg-white dark:bg-slate-800"
      }`}
    >
      <div className="flex-grow">
        <h4 className={`text-lg font-bold ${titleColorClass}`}>{c.name}</h4>
        <p className={`mt-2 text-sm line-clamp-3 ${textColorClass}`}>
          {c.description}
        </p>
      </div>
      
      <div className="mt-4 flex-shrink-0">
        <div className="flex flex-wrap gap-2">
          {c.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Class;
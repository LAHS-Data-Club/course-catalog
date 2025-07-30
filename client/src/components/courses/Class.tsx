import { Course } from "../../lib/types";

interface Props {
  c: Course;
  onDoubleClick?: () => void;
  onClick?: () => void;
  highlight?: string;
}

export default function Class({ c, onDoubleClick, onClick, highlight }: Props) {
  // TODO: ehhh
  const textColorClass = highlight ? (highlight.includes("text-") ? "" : "text-white") : "text-slate-500 dark:text-slate-400";
  const titleColorClass = highlight ? (highlight.includes("text-") ? "" : "text-white") : "text-slate-900 dark:text-slate-100";

  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick} 
      className={`flex cursor-pointer flex-col rounded p-5 ring-1 ring-slate-200/80 transition-all hover:shadow-xl hover:ring-blue-500/50 dark:ring-slate-700 dark:hover:ring-blue-500/50 ${
        highlight || "bg-white dark:bg-slate-800"
      }`}
    >
      <h4 className={`text-lg font-bold ${titleColorClass}`}>{c.name}</h4>
      <p className={`mt-2 text-sm line-clamp-3 ${textColorClass}`}>
        {c.description}
      </p>
      <div className="flex flex-wrap gap-2 mt-4">
        {c.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded bg-indigo-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
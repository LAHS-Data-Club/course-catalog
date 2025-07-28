// --- ClassPopup.tsx ---
import { useRef, useState } from "react";
import { Course } from "../../lib/types"; // Assuming Course type is defined here
import { X } from "lucide-react";

type Tab = "description" | "topics" | "grading";

interface ClassPopupProps {
  c: Course;
  closePopup: () => void;
}

function ClassPopup({ c, closePopup }: ClassPopupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>("description");

  const tabClass = (tabName: Tab) => `
    px-5 py-2.5 text-sm font-medium rounded-lg transition-colors
    ${activeTab === tabName 
      ? 'bg-slate-200 text-indigo-600 dark:bg-slate-700 dark:text-indigo-400' 
      : 'text-slate-500 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-700/50'
    }
  `;

  return (
    <div
      onClick={(e) => !ref.current?.contains(e.target as Node) && closePopup()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs" // Reduced blur
    >
      <div
        ref={ref}
        className="relative flex flex-col max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-xl border border-slate-300 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800" // Adjusted border and shadow
      >
        <div className="flex-shrink-0 border-b border-slate-200 p-6 dark:border-slate-700">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">{c.name}</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {c.tags.map((tag) => (
                  <div key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={closePopup} className="rounded-full p-1 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          <div className="mb-5">
            <div className="inline-flex rounded-xl bg-slate-100 p-1.5 dark:bg-slate-900/70 gap-2">
              <button onClick={() => setActiveTab('description')} className={tabClass('description')}>Description</button>
              <button onClick={() => setActiveTab('topics')} className={tabClass('topics')}>Topics</button>
              <button onClick={() => setActiveTab('grading')} className={tabClass('grading')}>Grading</button>
            </div>
          </div>
          
          <div className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {activeTab === 'description' && (
              <div className="space-y-4 prose prose-slate dark:prose-invert max-w-none">
                {c.recommendations && (
                  <p className="rounded-lg bg-indigo-50 p-3 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
                    <strong>Recommended:</strong> {c.recommendations}
                  </p>
                )}
                <p>{c.description}</p>
              </div>
            )}

            {activeTab === 'topics' && (
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {c.units.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1"> {/* Added explicit list styling for bullet points */}
                    {c.units.map((unit, i) => <li key={i}>{unit.unit}</li>)}
                  </ul>
                ) : <p>No topics listed.</p>}
              </div>
            )}

            {activeTab === 'grading' && (
              <div className="space-y-5">
                {c.gradingDescription.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-slate-800 dark:text-slate-200">Workload Info</h5>
                    <ul className="mt-2 list-inside list-disc space-y-1 pl-1 text-slate-600 dark:text-slate-400">
                      {c.gradingDescription.map((x, i) => <li key={i}>{x}</li>)}
                    </ul>
                  </div>
                )}
                {c.gradingCategories.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-slate-800 dark:text-slate-200">Grading Categories</h5>
                    <ul className="mt-2 space-y-1">
                      {c.gradingCategories.map((x, i) => (
                        <li key={i} className="flex justify-between rounded-md p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                          <span>{x.name}</span>
                          <span className="font-medium text-indigo-500 dark:text-indigo-400">{x.weight}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassPopup;
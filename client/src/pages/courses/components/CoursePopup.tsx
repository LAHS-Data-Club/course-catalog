import { useState } from "react";
import { Course } from "../../../lib/types";
import Modal from "../../../components/Modal";

type Tab = "description" | "topics" | "grading";

interface Props {
  c: Course;
  onClose: () => void;
}

export default function CoursePopup({ c, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("description");

  const tabClass = (tabName: Tab) => `
    cursor-pointer px-5 py-2.5 text-sm font-medium rounded transition-colors
    ${activeTab === tabName 
      ? 'bg-slate-200 text-blue-600 dark:bg-slate-700 dark:text-white' 
      : 'text-slate-500 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-700/50'
    }
  `;

  return (
    <Modal onClose={onClose}>
      {/** Header */}
      <div className="border-b border-slate-200/20 pb-3 mb-3">
        <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">{c.name}</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {c.tags.map((tag) => (
            <div 
              key={tag} 
              className="bg-slate-100 px-3 py-1.5 text-xs font-medium rounded text-slate-600 dark:bg-slate-700 dark:text-slate-300"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      {/** Main Content */}
      <div className="flex-grow overflow-y-auto">
        <div className="mb-3 flex w-fit rounded bg-slate-100 p-1.5 dark:bg-slate-900/70 gap-2 flex-wrap">
          <button onClick={() => setActiveTab('description')} className={tabClass('description')}>Description</button>
          <button onClick={() => setActiveTab('topics')} className={tabClass('topics')}>Topics</button>
          <button onClick={() => setActiveTab('grading')} className={tabClass('grading')}>Grading</button>
        </div>
        
        <div className="text-slate-600 dark:text-slate-300">
          {activeTab === 'description' && (
            <>
              {c.recommendations && (
                <p className="rounded-lg bg-blue-50 p-3 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 mb-4">
                  Recommended: {c.recommendations}
                </p>
              )}
              <p className="text-slate-500 dark:text-slate-400">{c.description}</p>
            </>  
          )}
          {activeTab === 'topics' && (
            <div className="text-slate-500 dark:text-slate-400">
              {c.units.length > 0 ? (
                <ul className="space-y-1 list-outside list-disc pl-5"> 
                  {c.units.map((unit, i) => <li key={i}>{unit.unit}</li>)}
                </ul>
              ) : <p>No topics listed.</p>}
            </div>
          )}
          {activeTab === 'grading' && (
            <div className="space-y-5 text-slate-500 dark:text-slate-400">
              {c.gradingDescription.length > 0 && (
                <div>
                  <h5 className="font-semibold text-slate-800 dark:text-slate-200">Workload Info</h5>
                  <ul className="space-y-1 list-outside list-disc pl-5 mt-2">
                    {c.gradingDescription.map((x, i) => <li key={i}>{x}</li>)}
                  </ul>
                </div>
              )}
              {c.gradingCategories.length > 0 && (
                <div>
                  <h5 className="font-semibold text-slate-800 dark:text-slate-200">Grading Categories</h5>
                  <ul className="mt-2 space-y-1">
                    {c.gradingCategories.map((x, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{x.name}</span>
                        <span className="text-blue-500 dark:text-blue-400">{x.weight}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
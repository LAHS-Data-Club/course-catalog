import { useContext, useState } from "react";
import CourseCard from "./CourseCard"; 
import { CoursesContext } from "../../contexts/CoursesContext";
import { IoFilter } from "react-icons/io5";

export default function CourseCollection() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState<string[]>([]);
  const { data, setClassPopup } = useContext(CoursesContext);

  const allClasses = data.flatMap((d) => d.classes);
  const filterTags = [...new Set(allClasses.flatMap((c) => c.tags))].sort();
  
  // TODO: we could do the same fuzzy search as w clubslist
  const searchResults = allClasses
    .filter((x) => x.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((x) => !searchFilters.length || x.tags.some(tag => searchFilters.includes(tag)))
    .sort((a, b) => a.name.localeCompare(b.name));

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchFilters(prev => 
      e.target.checked ? [...prev, e.target.id] : prev.filter(tag => tag !== e.target.id)
    );
  }

  return (
    <>
      <div className="flex w-full flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={searchQuery}
          placeholder="Search all classes..."
          onChange={handleInputChange}
          className="w-full flex-1 rounded border border-slate-300 bg-white p-2.5 px-4 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        />
        <button 
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center justify-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <IoFilter size={20} />
          <span>Filter</span>
        </button>
      </div>
      {filterOpen && (
        <div className="w-full flex-wrap gap-x-6 gap-y-3 rounded-b border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-800/50">
          {filterTags.map((tag) => (
            <div key={tag} className="flex items-center gap-2">
              <input 
                checked={searchFilters.includes(tag)} 
                onChange={handleFilterChange} 
                type="checkbox" 
                id={tag} 
                name={tag} 
                className="h-4 w-4 cursor-pointer rounded border-slate-400 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={tag} className="cursor-pointer text-sm text-slate-600 dark:text-slate-300">
                {tag}
              </label>
            </div>
          ))}
        </div>
      )}
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {searchResults.length > 0 ? (
          searchResults.map((c) => (
            <CourseCard key={c.id} onClick={() => setClassPopup(c)} c={c} /> 
          ))
        ) : (
          <p className="col-span-full text-center text-slate-500">No classes.</p>
        )}
      </div>
    </>
  );
}

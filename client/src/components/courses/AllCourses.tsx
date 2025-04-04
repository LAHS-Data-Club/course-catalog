import { useContext, useEffect, useState } from "react";
import Class from "./Class";
import { CoursesContext } from "../contexts/CoursesContext";
import { SlidersHorizontal } from "lucide-react";

function AllCourses() {
  const { data, setClassPopup } = useContext(CoursesContext);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState<string[]>([]);

  useEffect(() => {
    if (data.length) {
      setLoading(false);
    }
  }, [data]);

  const allClasses = data.flatMap((d) => d.classes);
  const filterTags = [...new Set(allClasses.flatMap((c) => c.tags))]
    .sort((a, b) => a.localeCompare(b));
  const searchResults = allClasses
    .filter((x) => x.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((x) => !searchFilters.length || x.tags.some(tag => searchFilters.includes(tag)))
    .sort((a, b) => a.name.localeCompare(b.name));

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setSearchFilters((prev) => [...prev, e.target.id]);
    } else {
      setSearchFilters((prev) => prev.filter((tag) => tag != e.target.id));
    }
  }

  return (
    <>
      <div className="flex gap-2 w-full">
        <input
          type="text"
          value={searchQuery}
          placeholder="Search Classes..."
          onChange={handleInputChange}
          className="shadow-lg text-black placeholder:text-neutral-500 bg-neutral-300 flex-1 p-1 pl-4 rounded border-neutral-400 border-2"
        />
        <button 
          onClick={() => setFilterOpen(!filterOpen)}
          className="shadow-lg flex items-center gap-2 px-4 py-2 text-white border-neutral-400 hover:bg-neutral-800 transition delay-50 rounded border-2 cursor-pointer"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span>Filter</span>
        </button>
      </div>
      {filterOpen && (
        <div className="flex flex-wrap gap-4 mt-2 w-full bg-neutral-800 shadow-lg rounded-lg p-4 border border-neutral-600">
          {filterTags.map((tag) => (
            <div className="flex items-center gap-2">
              <input 
                checked={searchFilters.includes(tag)} 
                onChange={handleFilterChange} 
                type="checkbox" 
                id={tag} 
                name={tag} 
                className="w-4 h-4 cursor-pointer"
              />
              <label 
                htmlFor={tag} 
                className="text-sm text-neutral-300">
                {tag}
              </label>
            </div>
          ))}
        </div>
      )}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-auto gap-5 mt-4">
        {searchResults.length > 0 ? (
          searchResults.map((c) => (
            <Class onDoubleClick={() => setClassPopup(c)} c={c} />
          ))
        ) : (
          !loading && <p>No Classes!</p>
        )}
      </div>
    </>
  );
}

export default AllCourses;

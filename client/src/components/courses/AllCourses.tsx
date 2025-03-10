import { useState } from "react";
import { useOutletContext } from "react-router";
import Class from "./Class";

// no clue how to name
function AllCourses() { 
  const { data, setClassPopup } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState('');

  const allClasses = Object.keys(data).flatMap(key => data[key].classes);
  const searchResults = allClasses
    .filter(x => x.Name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.Name.localeCompare(b.Name));;

  function handleInputChange(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <>
      <div className="flex border-2 rounded-sm w-full border-neutral-40">
       <input 
          type="text" 
          value={searchQuery} 
          placeholder="Search Classes"
          onChange={handleInputChange} 
          className="text-neutral-500 z-1 bg-neutral-300 flex-1 p-1 pl-4"
        />
        {/** icon goes here */}
        <button className="bg-neutral-400 w-10"></button>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-auto gap-5 mt-4">
        {searchResults.length > 0 ? (
          searchResults.map((c) => (
            <Class 
              onDoubleClick={() => setClassPopup(c)} 
              c={c}
            />
          ))
        ) : (
          <p>No classes found!</p>
        )}
      </div>
    </>
  );
}

export default AllCourses;
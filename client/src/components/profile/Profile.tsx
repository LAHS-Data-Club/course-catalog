import React, { useContext, useState } from "react";
import { PeriodsContext } from "../../contexts/PeriodsContext";
import AutocompleteInput from "./AutocompleteInput";
import { departmentOptions } from "../../functions/queryOptions";
import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";


// TODO: fix the messy parts here
export default function Profile() {
  const { periods, setPeriods } = useContext(PeriodsContext);
  const [isEdit, setIsEdit] = useState(false); 
  const [values, setValues] = useState(periods);
  const [formError, setFormError] = useState(false);
  const { data: depts, isPending, isError } = useQuery(departmentOptions()); // TODO:

  if (isPending) return <p>Loading..</p>; // TODO:
  if (isError) return <p>Error</p>;

  const allClasses = depts.flatMap((d) => d.classes.map((c) => c.name));
  
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isValid = Object.values(values).every((x) => x.trim() === "" || allClasses.includes(x))
    if (isValid) {
      setFormError(false);
      setPeriods(values); // save to localstorage TODO: sync with data base
      setIsEdit(false);
    } else {
      setFormError(true);
    }
  }

  // TODO: meh, initializes each render
  const fuse = new Fuse(allClasses, {
    includeScore: true,
    includeMatches: true,
    threshold: 1,
    ignoreLocation: true,
  });

  return (
    <div className="flex h-full w-full flex-col items-center gap-8 p-4 sm:p-6 lg:p-8 mt-25">
      <div className="w-2/3 min-w-100">
        <h1 className="text-4xl text-slate-800 dark:text-slate-200 mb-5">User Profile</h1>
        <div className="w-full max-w-4xl rounded border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-800/50">
          <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
            <button className="border-b-2 border-blue-500 px-4 py-2 font-semibold text-blue-500">
              My Schedule
            </button>
            <button className="px-4 py-2 font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200">
              Profile
            </button>
          </div>
          <div className="p-2 pt-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Your Classes</h2>
            <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">Enter your class names for each period. This will be shown on the home page.</p>
            {formError && (
              <p className="text-red-400">*Error: Please enter only valid LAHS classes.</p>
            )}

            <form 
              className="flex flex-col gap-4 mt-6"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2.5">
                {Object.keys(periods).map((period) => (
                  <div key={period}>
                    <label htmlFor={period} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      {period.replace(/[{}]/g, "")}:
                    </label>
                    <AutocompleteInput
                      fuse={fuse}
                      suggestions={allClasses}
                      value={values[period]}
                      disabled={!isEdit}
                      setValue={(val) => setValues((prev) => ({ ...prev, [period]: val }))}
                      placeholder={period.replace(/[{}]/g, "")}
                    />
                  </div>
                ))}
              </div>

              {/** TODO: mehhh a bit cluttered */}
              {isEdit ? (
                <button
                  type="submit"
                  className="max-w-50 font-semibold cursor-pointer bg-blue-500 px-4 py-2 rounded shadow-md hover:bg-blue-500/70 transition"
                > 
                  Save
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEdit(true)
                  }}
                  type="button"
                  className="max-w-50 font-semibold cursor-pointer bg-blue-500 px-4 py-2 rounded shadow-md hover:bg-blue-500/70 transition"
                > 
                  Edit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
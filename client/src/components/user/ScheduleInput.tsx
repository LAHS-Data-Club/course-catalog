import React, { useEffect, useState } from "react";
import AutocompleteInput from "./AutocompleteInput";
import { departmentOptions } from "../../functions/queryOptions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { scheduleOptions } from "../../functions/queryOptions";
import { updateSchedule } from "../../functions/api";
import Fuse from "fuse.js";
import { ring2 } from 'ldrs';
ring2.register();

// TODO: fix css + loader
// TODO: suspense ??? theres SO many like random loadings/errors here it might be optimal
export default function ScheduleInput() {
  const queryClient = useQueryClient();
  const { data: depts, isPending, isError } = useQuery(departmentOptions()); // TODO:
  const scheduleQuery = useQuery(scheduleOptions());
  const [values, setValues] = useState(scheduleQuery.data); 
  // TODO: maybe?
  const [formError, setFormError] = useState("");
  const [formSucess, setFormSucess] = useState("");

  const scheduleMutation = useMutation({
    mutationFn: (schedule) => updateSchedule(schedule),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['schedule'] }),
  });  

  useEffect(() => {
    setValues(scheduleQuery.data);
  }, [scheduleQuery.data]);

  // TODO: ehhhh idk how to do this part properly...
  const allClasses = depts?.flatMap((d) => d.classes.map((c) => c.name)) || [];
  // TODO: meh, initializes each render
  const fuse = new Fuse(allClasses, {
    includeScore: true,
    includeMatches: true,
    threshold: 1,
    ignoreLocation: true,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    const isValid = Object.values(values).every((x) => x.trim() === "" || allClasses.includes(x));
    if (isValid) {
      scheduleMutation.mutate(values);
      // optimistic update 

    } else {
      setFormError("*Error: Please enter only valid LAHS classes.");
    }
  }
  
  if (scheduleQuery.isPending || isPending) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
        Your Classes
      </h2>
      <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
        Enter your class names for each period. This will be shown on the home
        page.
      </p>
      {formError && <p className="text-red-400">{formError}</p>}

      <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2.5">
          {Object.keys(scheduleQuery.data).map((period) => (
            <div key={period}>
              <label
                htmlFor={period}
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {period.replace(/[{}]/g, "")}:
              </label>
              <AutocompleteInput
                fuse={fuse}
                suggestions={allClasses}
                value={values[period]}
                setValue={(val) =>
                  setValues((prev) => ({ ...prev, [period]: val }))
                }
                placeholder={period.replace(/[{}]/g, "")}
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="max-w-50 font-semibold cursor-pointer bg-blue-500 px-4 py-2 rounded shadow-md hover:bg-blue-500/70 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
}
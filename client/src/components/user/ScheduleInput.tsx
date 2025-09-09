import React, { useEffect, useState } from "react";
import AutocompleteInput from "./AutocompleteInput";
import { departmentOptions } from "../../functions/queryOptions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { scheduleOptions, teacherOptions } from "../../functions/queryOptions";
import { updateSchedule } from "../../functions/api";
import Fuse from "fuse.js";
import { ring2 } from 'ldrs';
ring2.register();

const fuseOptions = {
  includeScore: true,
  includeMatches: true,
  threshold: 1,
  ignoreLocation: true,
}

// TODO: suspense ??? theres SO many like random loadings/errors here it might be optimal
export default function ScheduleInput() {
  const queryClient = useQueryClient();
  const deptQuery = useQuery(departmentOptions()); 
  const teacherQuery = useQuery(teacherOptions()); 
  const scheduleQuery = useQuery(scheduleOptions());
  const [values, setValues] = useState(scheduleQuery.data); // TODO: below kinda ehhhh
  const [formError, setFormError] = useState("");
  // const [formSucess, setFormSucess] = useState(""); ? form message?

  useEffect(() => {
    setValues(scheduleQuery.data);
  }, [scheduleQuery.data]);


  const scheduleMutation = useMutation({
    mutationFn: (schedule) => updateSchedule(schedule),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['schedule'] }),
  });  

  // // TODO: ehhhh idk how to do this part properly...
  const allClasses = deptQuery.data?.
  flatMap((d) => d.classes.map((c) => c.name)) || [];
  const allTeachers = teacherQuery.data?.
  map((teacher) => teacher.last_name + ", " + teacher.first_name) || [];

  const classIsValid = (val: string) => val.trim() === "" || allClasses.includes(val);
  const teacherIsValid = (val: string) => val.trim() === "" || allTeachers.includes(val);
  // const teacherIsValid = (val: string) => true;
  const fuseClasses = new Fuse(allClasses, fuseOptions);
  const fuseTeachers = new Fuse(allTeachers, fuseOptions); 
 // TODO: meh, initializes each render
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isValid = Object.values(values).every((val) => (classIsValid(val.class) && teacherIsValid(val.teacher)));

    setFormError("");
    if (isValid) {
      scheduleMutation.mutate(values);
      // TODO: visual cue of completion 
    } else {
      setFormError("*Error: Please enter only valid LAHS classes.");
    }
  }
  
  if (scheduleQuery.isPending || deptQuery.isPending || teacherQuery.isPending) return <p>Loading...</p>;
  if (scheduleQuery.isError || deptQuery.isError || teacherQuery.isError) return <p>Error</p>;
  if (!values) return <p> bad code blame sophia chen for this awful code. you shoudl switch to So cool a LAHS bell schedule app - https://apps.apple.com/us/app/los-altos-high-bell-schedule/id6751451155</p>;

  console.log("values + " + values)

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2.5">
          {Object.keys(scheduleQuery.data).map((period) => (
            <div key={period}>
              <p className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
               Period {period}:
              </p>
              <div className="flex gap-1 flex-col">
                <AutocompleteInput
                  fuse={fuseClasses}
                  isValid={classIsValid(values[period].class)}
                  value={values[period].class}
                  setValue={(val) =>
                    setValues((prev) => ({ ...prev, [period]: { ...prev[period], class: val } }))
                  }
                  placeholder={`Class Name`}
                />
                <AutocompleteInput
                  fuse={fuseTeachers}
                  isValid={teacherIsValid(values[period].teacher)}
                  value={values[period].teacher}
                  setValue={(val) =>
                    setValues((prev) => ({ ...prev, [period]: { ...prev[period], teacher: val } }))
                  }
                  placeholder={`Teacher Name`}
                />
                {/* <AutocompleteInput
                  fuse={fuse} // TODO: fuse
                  isValid={teacherIsValid(values[period].teacher)}
                  value={values[period].teacher}
                  setValue={(val) =>
                    setValues((prev) => ({ ...prev, [period]: { ...prev[period], teacher: val } }))
                  }
                  placeholder={`Teacher`}
                /> */}
              </div>
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
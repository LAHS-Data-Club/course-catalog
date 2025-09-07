import { fetchAllDepartments } from "../../fetchers/classes";
import { Periods } from "../../util/types";

// nah, periods should just be an array of length 7 ?
// TODO: just make periods an array???? i feel like thats better and easier to work with

// TODO: ehhh this feels unoptimal, should i just move to json or smth
export async function validateSchedule(schedule) {
  // TODO: validate that its in the right object structure too...
  const depts = await fetchAllDepartments();
  const allClasses = depts.flatMap((d) => d.classes.map((c) => c.name));
  // TODO: need to do this for teachers too

  const isValid = Object.values(schedule).every(
    (x) => x.class.trim() === "" || allClasses.includes(x.class)
  );
  return isValid;
}

// TODO: this is a really silly feeling structure. i feel like we should change it. i only used it since
// its what bell used but it feels silly validating it here

// const NUM_PERIODS = 7;
// const keys = [...Array(NUM_PERIODS).keys()].map((x) => `{Period ${x}}`);

// function isPeriodStructure(schedule) {

// }

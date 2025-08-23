import pool from "../db";
import type { Periods } from "../../util/types";
import { fetchAllDepartments } from "../../fetchers/classes";

export async function getSchedule(id: string) {
  if (!id) return null;

  const { rows } = await pool.query(
    "SELECT schedule FROM users WHERE google_id = $1",
    [id]
  );
  return rows[0].schedule;
}

export async function updateSchedule(id: string, schedule: Periods) {
  if (!id) throw new Error("Invalid user");

  const isValid = validateSchedule(schedule);
  if (!isValid) throw new Error("Invalid schedule input.");

  const { rows } = await pool.query(
    "UPDATE users SET schedule = $1 WHERE google_id = $2 RETURNING *",
    [schedule, id]
  );
  console.log(rows[0]); // TODO: so the db gets updated ???
}



// TODO: mehh time it takes for depts... depts isnt rly gonna change much should i just move to json ???
async function validateSchedule(schedule: Periods) {
  const depts = await fetchAllDepartments();
  const allClasses = depts.flatMap((d) => d.classes.map((c) => c.name));
  const isValid = Object.values(schedule).every(
    (x) => x.trim() === "" || allClasses.includes(x)
  );
  return isValid;
}

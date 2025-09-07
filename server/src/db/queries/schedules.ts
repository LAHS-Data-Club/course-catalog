import pool from "../db";
import type { Periods } from "../../util/types";
import { validateSchedule } from "./util";

// TODO: relations brocken
export async function getSchedule(userId: string) {
  const { rows } = await pool.query(
    "SELECT schedule FROM schedules WHERE user_id = $1", 
    [userId]
  );
  return rows[0]?.schedule; 
}

export async function updateSchedule(userId: string, schedule: Periods) {
  const isValid = validateSchedule(schedule);
  if (!isValid) throw new Error("Invalid schedule input.");

  // TODO: optimistic update in frontend or ?
  await pool.query(
    "UPDATE schedules SET schedule = $1 WHERE user_id = $2",
    [schedule, userId]
  );
}

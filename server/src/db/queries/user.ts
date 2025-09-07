import pool from "../db";
// import type { Periods } from "../../util/types";

// TODO: ehh
export const defaultPeriods = {
  1: { class: "", teacher: "" }, 
  2: { class: "", teacher: "" },
  3: { class: "", teacher: "" }, 
  4: { class: "", teacher: "" }, 
  5: { class: "", teacher: "" }, 
  6: { class: "", teacher: "" }, 
  7: { class: "", teacher: "" },
};

export async function getUserBySub(sub: string) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE oidc_sub = $1",
    [sub]
  );
  return rows[0];
}

// TODO: feels kinda arbitrary to have two seperate ways to 
// query user, but i didnt want session to be based on oidc sub ? idk
export async function getUserById(id: string) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  return rows[0];
}

export async function createUser(userInfo) {
  // insert new user into users table
  const { rows } = await pool.query(
    `INSERT INTO users(oidc_sub, name, email)
    VALUES ($1, $2, $3) 
    RETURNING *`,
    [userInfo.sub, userInfo.name, userInfo.email]
  );

  // initialize schedule for user
  await pool.query(
    `INSERT INTO schedules(user_id, schedule) VALUES ($1, $2)`,
    [rows[0].id, defaultPeriods]
  );
  return rows[0];
}
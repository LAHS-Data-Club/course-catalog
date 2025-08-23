import pool from "../db";
import { oauth2_v2 } from "googleapis";


export async function getUser(id: string) {
  const { rows } = await pool.query(
    "SELECT name, email FROM users WHERE google_id = $1",
    [id]
  );
  return rows[0];
}

// create user in db if not exists already
export async function createUser(credentials: oauth2_v2.Schema$Userinfo) {
  console.log("creating new user", credentials.name);
  await pool.query(
    `INSERT INTO users(name, email, google_id)
    VALUES ($1, $2, $3) 
    ON CONFLICT (google_id) DO NOTHING`,
    [credentials.name, credentials.email, credentials.id]
  );
}

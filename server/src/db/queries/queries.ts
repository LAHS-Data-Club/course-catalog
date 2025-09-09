import pool from "../db";

// users
export async function getUserBySub(sub: string) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE oidc_sub = $1", 
    [sub]
  );
  return rows[0];
};

// TODO: feels kinda arbitrary to have two seperate ways to query user
export async function getUserById(id: string) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE id = $1", 
    [id]
  );
  return rows[0];
};

export async function insertUser(sub: string, name: string, email: string, picture: string) {
  const { rows } = await pool.query(
    `INSERT INTO users(oidc_sub, name, email, picture)
    VALUES ($1, $2, $3, $4) 
    ON CONFLICT (oidc_sub) DO UPDATE 
      SET name = EXCLUDED.name, email = EXCLUDED.email, picture = EXCLUDED.picture
    RETURNING *`,
    [sub, name, email, picture]
  );
  return rows[0];
};

// schedules
export async function insertSchedule(userId: string, schedule) {
  await pool.query(
    `INSERT INTO schedules(user_id, schedule) 
    VALUES ($1, $2)
    ON CONFLICT (user_id) DO NOTHING`,
    [userId, schedule]
  );
};

// groups
export async function getGroup(groupId: string) {
  const { rows } = await pool.query(
    `SELECT * FROM groups WHERE groups.id = $1`,
    [groupId]
  );
  return rows[0];
};

export async function addGroup(createdBy: string, groupName: string) {
  const { rows } = await pool.query(
    "INSERT INTO groups(title, owner_id) VALUES ($1, $2) RETURNING *",
    [groupName, createdBy]
  );
  return rows[0];
};

export async function getGroupMembers(groupId: string) {
  const { rows } = await pool.query(
    `SELECT id, name, email, schedule FROM members 
    JOIN users ON users.id = members.member_id
    JOIN schedules ON users.id = schedules.user_id
    WHERE members.group_id = $1`,
    [groupId]
  );
  return rows;
};

// export async function deleteGroup(groupId: string) {}
// export async function editGroup(groupId: string) {}

// members
export async function addMember(groupId: string, memberId: string) {
  const { rows } = await pool.query(
    `INSERT INTO members(group_id, member_id) 
    VALUES ($1, $2) 
    ON CONFLICT (group_id, member_id) DO NOTHING
    RETURNING *`,
    [groupId, memberId]
  );
  return rows[0];
};

// invites
export async function getInvite(uuid: string) {
  const { rows } = await pool.query(
    `SELECT 
      users.name AS "inviter_name",
      users.email AS "inviter_email",
      groups.title AS "group_title"
    FROM invites
    JOIN users ON users.id = invites.invited_by
    JOIN groups ON groups.id = invites.group_id
    WHERE uuid = $1 AND expiration > NOW()`,
    [uuid]
  );
  return rows[0] ?? null;
};

export async function deleteInvite(uuid: string) {
  await pool.query(
    `DELETE FROM invites WHERE uuid = $1`, 
    [uuid]
  );
};

export async function addInvite(
  groupId: string,
  invitedBy: string,
  expiryDate: Date
) {
  const { rows } = await pool.query(
    `INSERT INTO invites (group_id, invited_by, expiration)
    VALUES ($1, $2, $3) RETURNING *`,
    [groupId, invitedBy, expiryDate]
  );
  return rows[0];
};

// teachers
export async function getAllTeachers() {
  const { rows } = await pool.query(
    "SELECT * FROM teachers", 
  );
  return rows;
};
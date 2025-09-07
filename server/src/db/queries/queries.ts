import pool from "../db";
// TODO: pure queries go here (NOTHING BUT SQL STATEMENTS)

// users
// schedules

// groups
export async function getGroup(groupId: string) {
  const { rows } = await pool.query(
    `SELECT * FROM groups WHERE groups.id = $1`,
    [groupId]
  );
  return rows[0];
}

export async function addGroup(createdBy: string, groupName: string) {
  const { rows } = await pool.query(
    "INSERT INTO groups(title, owner_id) VALUES ($1, $2) RETURNING *",
    [groupName, createdBy]
  );
  return rows[0];
}

export async function getGroupMembers(groupId: string) {
  const { rows } = await pool.query(
    `SELECT id, name, email, schedule FROM members 
    JOIN users ON users.id = members.member_id
    JOIN schedules ON users.id = schedules.user_id
    WHERE members.group_id = $1`,
    [groupId]
  );
  return rows;
}

// export async function deleteGroup(groupId: string) {}
// export async function editGroup(groupId: string) {}

// members
export async function addMember(groupId: string, memberId: string) {
  const { rows } = await pool.query(
    `INSERT INTO members(group_id, member_id) VALUES ($1, $2) RETURNING *`, 
    [groupId, memberId]
  ); 
  return rows[0];
}

// invites
export async function getInvite(uuid: string) {
  const { rows } = await pool.query(
    `SELECT * FROM invites WHERE uuid = $1 AND expiration > NOW()`,
    [uuid]
  );
  return rows[0];
}

export async function deleteInvite(uuid: string) {
  await pool.query(
    `DELETE FROM invites WHERE uuid = $1`,
    [uuid]
  );
}

// TODO: use uuid function postgres to generate instead
export async function addInvite(groupId: string, invitedBy: string, expiryDate: Date) {
  const { rows } = await pool.query(
    `INSERT INTO invites (group_id, invited_by, expiration)
    VALUES ($1, $2, $3) RETURNING *`,
    [groupId, invitedBy, expiryDate]
  );
  return rows[0];
}
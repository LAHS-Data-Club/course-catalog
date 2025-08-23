import pool from "../db";

// test owner_id = 116135854693927606659

export async function createGroup(ownerId: string, name: string) {
  console.log("creating new group", name);
  const { rows } = await pool.query(
    "INSERT INTO groups(title, owner_id) VALUES ($1, $2) RETURNING *",
    [name, ownerId]
  );
  await addMember(rows[0].id, ownerId); // add member relation when creating a group
}

export async function addMember(groupId: string, memberId: string) {
  await pool.query(
    "INSERT INTO members(group_id, member_id) VALUES ($1, $2)",
    [groupId, memberId]
  );
}

export async function getGroups(user_id: string) {
  const { rows } = await pool.query(
    `SELECT id, title, owner_id FROM members 
    JOIN groups ON groups.id = members.group_id
    WHERE members.member_id = $1`,
    [user_id]
  );

  // combine with member info in each group
  const groups = await Promise.all(rows.map(async (group) => {
    const members = await getGroupMembers(group.id);
    return { ...group, members }
  }));
  return groups;
}

export async function getGroupMembers(id: string) {
  const { rows } = await pool.query(
    `SELECT google_id, name, email, schedule FROM members 
    JOIN users ON users.google_id = members.member_id
    WHERE members.group_id = $1`,
    [id]
  );
  return rows;
}

// export async function getGroups(id: string) {
//   const text = `
//     SELECT
//       g.id,
//       g.title,
//       g.owner_id,
//       u.name AS member_name,
//       u.email AS member_email,
//       u.schedule AS member_schedule
//     FROM members 
//     JOIN groups g ON g.id = members.group_id               
//     JOIN members m ON m.group_id = g.id                  
//     JOIN users u ON u.google_id = m.member_id
//     WHERE members.member_id = $1
//   `;
//   const values = [id];
//   const { rows } = await pool.query(text, values);
//   // console.log(rows);

//   const groups = formatGroupData(rows);
//   console.log(groups)
//   return groups;
// }
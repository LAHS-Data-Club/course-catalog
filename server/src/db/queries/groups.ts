import pool from "../db";
import { getInvite, addInvite, addMember, addGroup, getGroup, getGroupMembers } from "./queries";

// TODO: this is all extremely dubious code

export async function getGroups(userId: string) {
  const { rows } = await pool.query(
    `SELECT id, title, owner_id FROM members 
    JOIN groups ON groups.id = members.group_id
    WHERE members.member_id = $1`,
    [userId]
  );

  // combine with member info in each group
  const groups = await Promise.all(
    rows.map(async (group) => {
      const members = await getGroupMembers(group.id);
      return { ...group, members };
    })
  );
  return groups; 
}

export async function createGroup(ownerId: string, name: string) {
  const group = await addGroup(ownerId, name);
  await addMember(group.id, ownerId);
}

// export async function getGroupData(groupId: string) {
//   const group = await getGroup(groupId);
//   const members = await getGroupMembers(groupId);
//   const groupData = { ...group, members }; 
//   return groupData;
// }






// TODO: do i need hashing?
export async function createGroupInvite(
  issuedBy: string,
  group_id: string,
  expiryDate: Date,
) {
  // verify user has invite permissions TODO: fix this code
  const allowed = await userInGroup(issuedBy, group_id);
  if (!allowed) throw new Error("401: Unauthorized"); // TODO: probably do this with postgres check?

  const invite = await addInvite(group_id, issuedBy, expiryDate);
  console.log('created invite.')
  console.log(process.env.REACT_APP_URL); 
  
  const inviteLink = `${process.env.REACT_APP_URL}/schedule-sharing/invite/${invite.uuid}`;
  return inviteLink;

}

// Verifies invite then adds user to group
export async function acceptInvite(uuid: string, memberId: string) {
  const start = performance.now();

  // TODO: can combine these into one query
  const invite = await getInvite(uuid); 
  if (!invite) throw new Error("Invalid invite");

  // add member TODO:
  await addMember(invite.group_id, memberId);
  const schedules = await getGroup(invite.group_id);
  const end = performance.now();

  console.log(`Took ${end - start} ms`);
  return schedules;
}



// TODO: better if again, do with postgres check instead
async function userInGroup(userId: string, groupId: string) {
  const { rows } = await pool.query(
    "SELECT * FROM members WHERE member_id = $1 AND group_id = $2",
    [userId, groupId]
  );
  return rows.length > 0;
}

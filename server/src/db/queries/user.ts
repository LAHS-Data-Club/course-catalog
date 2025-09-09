import { insertUser, insertSchedule } from "./queries";
import { Periods } from "../../util/types";

// TODO: fix the sql at some.... point....

export const defaultPeriods: Periods = {
  1: { class: "", teacher: "" }, 
  2: { class: "", teacher: "" },
  3: { class: "", teacher: "" }, 
  4: { class: "", teacher: "" }, 
  5: { class: "", teacher: "" }, 
  6: { class: "", teacher: "" }, 
  7: { class: "", teacher: "" },
};

// TODO: makesure this works
export async function createUser(userInfo) {
  // insert new user into users table
  const user = await insertUser(userInfo.sub, userInfo.name, userInfo.email, userInfo.picture);

  // initialize schedule for user
  await insertSchedule(user.id, defaultPeriods);

  return user;
}
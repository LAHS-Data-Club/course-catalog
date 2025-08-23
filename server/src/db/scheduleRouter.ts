import { Router } from "express";
import { userHandler } from "../util/utils";
import { getSchedule, updateSchedule } from "../db/queries/schedules";
import { getGroups, createGroup } from "../db/queries/groups";

// NOTE: schedule will reset on initial reload..?
export const scheduleRouter = Router();

scheduleRouter.get(
  "/",
  userHandler(async (req, res) => {
    const { user } = res.locals;
    const schedule = await getSchedule(user.id);
    res.json(schedule);
  })
);

scheduleRouter.get(
  "/groups",
  userHandler(async (req, res) => {
    const { user } = res.locals;
    const groups = await getGroups(user.id);
    res.json(groups);
  })
);

scheduleRouter.post(
  "/update",
  userHandler(async (req, res) => {
    const { user } = res.locals;
    const { schedule } = req.body;
    await updateSchedule(user.id, schedule);
    res.end();
  })
);

scheduleRouter.post(
  "/groups/create",
  userHandler(async (req, res) => {
    const { user } = res.locals;
    const { name } = req.body; // group name
    console.log(name);
    await createGroup(user.id, name);
    res.end();
  })
);

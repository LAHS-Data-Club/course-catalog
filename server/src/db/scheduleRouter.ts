import { Router } from "express";
import { asyncHandler, isAuthenticated } from "../util/utils";
import { getSchedule, updateSchedule } from "../db/queries/schedules";
import { getGroups, createGroup, createGroupInvite, acceptInvite } from "../db/queries/groups";
import { getInvite } from "./queries/queries";

export const scheduleRouter = Router();

scheduleRouter.get(
  "/",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const schedule = await getSchedule(req.session.userId!);
    res.json(schedule);
  })
);

scheduleRouter.get(
  "/groups",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const groups = await getGroups(req.session.userId!);
    res.json(groups);
  })
);

scheduleRouter.post(
  "/update",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { schedule } = req.body;
    await updateSchedule(req.session.userId!, schedule);
    res.end();
  })
);

scheduleRouter.post(
  "/groups/create",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { name } = req.body; // group name
    await createGroup(req.session.userId!, name);
    res.end();
  })
);

// TODO:
scheduleRouter.post(
  "/groups/invite",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { issuedBy, expiryDate, groupId } = req.body; // group name
    const invite = await createGroupInvite(issuedBy, groupId, expiryDate);
    res.json(invite);
  })
);

scheduleRouter.get(
  "/groups/invite/:inviteId",
  asyncHandler(async (req, res) => {
    const invite = await getInvite(req.params.inviteId);
    console.log(invite);
    res.json(invite);
  })
);

// TODO: accept invites
scheduleRouter.post(
  "/groups/invite/:inviteId/accept",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    console.log('accepting invite...');
    await acceptInvite(req.params.inviteId, req.session.userId!);
    res.end();
  })
);
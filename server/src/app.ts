import express from "express";
import cors from "cors";
import { ScheduleCache } from "./util/cache";
import { asyncHandler } from "./util/utils";
import {
  fetchAllCourses,
  fetchAllDepartments,
  fetchDepartment,
} from "./fetchers/classes";
import { Department, departments } from "./util/types";
const app = express();
const scheduleCache = new ScheduleCache();

app.use(cors({
  origin: ["http://localhost:5173"], // TODO:
  credentials: true,
}));

/**
 * Returns a list of events for that date given a 
 * key in the format M-dd-yyyy // TODO: use like ISO date instead or smth...
 */
app.get("/api/calendar", 
  asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query
    const events = await scheduleCache.getRange(startDate, endDate);
    res.json(events);
    // throw new Error("oioihoih");
}));

app.get(
  "/api/classes",
  asyncHandler(async (req, res) => {
    const classes = await fetchAllCourses();
    res.json(classes);
  })
);

app.get(
  "/api/departments",
  asyncHandler(async (req, res) => {
    const departments = await fetchAllDepartments();
    res.json(departments);
  })
);

app.get(
  "/api/department/:dept",
  asyncHandler(async (req, res) => {
    const { dept } = req.params;
    if (!(departments.map((d) => d.id) as string[]).includes(dept)) {
      res.status(404).send("Department not found");
      return;
    }
    const classes = await fetchDepartment(dept as Department);
    res.json(classes);
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

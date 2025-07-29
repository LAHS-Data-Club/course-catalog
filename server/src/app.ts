import express from "express";
import cors from "cors";
import Cache from "./util/cache";
import { asyncHandler } from "./util/utils";
import { fetchCalendarData } from "./fetchers/google-calendar";
import {
  fetchAllCourses,
  fetchAllDepartments,
  fetchDepartment,
} from "./fetchers/classes";
import { Department, departments } from "./util/types";
const app = express();
const cache = new Cache();

// TODO:
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

app.get(
  "/api/calendar/:date",
  asyncHandler(async (req, res) => {
    // const { date } = req.params;
    const { dateStart, dateEnd } = req.query;
    const events = await cache.get(date, () => fetchCalendarData(date));
    res.json(events);
  })
);

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

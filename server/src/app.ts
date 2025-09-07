import express from "express";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import cookieParser from 'cookie-parser';
import pool from "./db/db";
import { authRouter } from "./auth/authRouter";
import { scheduleRouter } from "./db/scheduleRouter";

// TODO: move later
import { ScheduleCache } from "./util/cache";
import { asyncHandler } from "./util/utils";
import { fetchAllCourses, fetchAllDepartments, fetchDepartment } from "./fetchers/classes";
import { Department, departments } from "./util/types";

const app = express();
const pgSession = connectPgSimple(session);

app.use(express.json());
app.use(cookieParser()); 
app.use(express.urlencoded({ extended: true })); 

app.use(cors({
  origin: [process.env.REACT_APP_URL ?? "http://localhost:5173"], 
  credentials: true,
}));

app.use(
  session({
    store: new pgSession({
      pool, 
      tableName: 'session'
    }),
    secret: process.env.SESSION_SECRET!,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === "production",
    },
  })
);

// TODO: extract the rest to be just routers?

app.use('/api', authRouter);
app.use('/api/schedule', scheduleRouter)

// TODO: this is annoying
/**
 * Returns a list of events for that date given a 
 * key in the format M-dd-yyyy // TODO: use like ISO date instead or smth...
 */
const scheduleCache = new ScheduleCache();
app.get("/api/calendar", 
  asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query as { startDate: string, endDate: string };
    const events = await scheduleCache.getRange(startDate, endDate);
    res.json(events);
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


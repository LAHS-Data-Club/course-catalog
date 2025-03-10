import { fetchCalendarData } from './util/util.ts';
import express from 'express';
import cors from 'cors';
import Cache from './util/cache.js';
const app = express();
const cache = new Cache();

const corsOptions = {
  origin: ["http://localhost:5173"], 
  credentials: true,
};
app.use(cors(corsOptions));

// routes
app.get('/api/calendar/:date', async (req, res, next) => {
  try {
    const { date } = req.params;
    const events = await cache.get(date, () => fetchCalendarData(date));
    res.json(events);
  } catch (err) {
    res.status(500).send(); // not sure if this is right
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));


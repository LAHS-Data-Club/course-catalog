import { fetchCalendarData } from './util.js';
import express from 'express';
import cors from 'cors';
import Cache from './cache.js';
const app = express();
const cache = new Cache();

const corsOptions = {
  origin: ["http://localhost:5173"], 
  credentials: true,
};
app.use(cors(corsOptions));

app.get('/api/calendar/:date', async (req, res, next) => {
  // deal with error handling and redundant try catch later
  try {
    const { date } = req.params;
    const events = await cache.get(date, () => fetchCalendarData(date));
    res.json(events);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));


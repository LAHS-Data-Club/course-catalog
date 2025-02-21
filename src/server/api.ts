import express from 'express';
const app = express();
// ok look into dirname this is hella obnoxious looking
// this is kinda useless but we prolly should use
import data from '../scripts/output/schedules.json'; 

app.get('/api/schedules', (req, res) => {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
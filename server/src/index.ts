import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { pool } from './utils/createPool';
import { getTags } from './routes/getTags'

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'HEAD'],
  allowedHeaders: ['Content-Type', 'X-Requested-With', 'Authorization'],
}));

app.get('/logs', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM logs');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database query failed');
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).send('pong');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/tags', getTags);

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { pool } from './utils/createPool';
import { getTags } from './controllers/tagsController'
import mainRouter from './routes/mainRouter';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'HEAD'],
  allowedHeaders: ['Content-Type', 'X-Requested-With', 'Authorization'],
}));

app.use('/api', mainRouter);

// app.get('/logs', async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM logs');
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Database query failed');
//   }
// });

// app.get('/ping', (req: Request, res: Response) => {
//   res.status(200).send('pong');
// });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

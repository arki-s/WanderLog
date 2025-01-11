import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'HEAD'],
  allowedHeaders: ['Content-Type', 'X-Requested-With', 'Authorization'],
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).send('pong');
});

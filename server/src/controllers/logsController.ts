import { Request, Response, Router } from 'express';
import { pool } from '../utils/createPool';
import mysql from 'mysql2/promise';

export const getTags = async (req: Request, res: Response):Promise<any> => {

  try {
    const connection = await pool.getConnection();

    try {
      const [logRows] = await connection.query<mysql.RowDataPacket[]>('SELECT * FROM logs');

      if (logRows.length === 0){
        return [];
      }

      res.status(200).json({data: logRows});
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Error in getLogs:', error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }

}

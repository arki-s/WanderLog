import { Request, Response } from 'express';
import { pool } from '../utils/createPool';
import mysql from 'mysql2/promise';

export const getTags = async (req: Request, res: Response) => {

  const tags = await getTagsData;

  res.status(200).json({data: tags});

}

async function getTagsData():Promise<any[]>{
  try {
    const connection = await pool.getConnection();
    try {
      const [tagRows] = await connection.query<mysql.RowDataPacket[]>('SELECT * FROM tags');

      if (tagRows.length === 0){
        return [];
      }

      return tagRows;

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('error fetching tag data', error);
    throw error;
  }
}

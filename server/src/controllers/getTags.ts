import { Request, Response, Router } from 'express';
import { pool } from '../utils/createPool';
import mysql from 'mysql2/promise';

export const getTags = async (req: Request, res: Response) => {
  console.log("getTags関数が呼び出されました！");

  try {
    const tags = await getTagsData();
    console.log('fetched tags:', tags);

    res.status(200).json({data: tags});

  } catch (error) {
    console.error('Error in getTags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }


}

async function getTagsData():Promise<any[]>{
  try {
    const connection = await pool.getConnection();
    try {
      const [tagRows] = await connection.query<mysql.RowDataPacket[]>('SELECT * FROM tags');
      console.log('Query result from database:', tagRows);

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

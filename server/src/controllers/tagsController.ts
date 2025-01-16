import { Request, Response, Router } from 'express';
import { pool } from '../utils/createPool';
import mysql from 'mysql2/promise';

export const getTags = async (req: Request, res: Response):Promise<any> => {

  try {
    const connection = await pool.getConnection();

    try {
      const [tagRows] = await connection.query<mysql.RowDataPacket[]>('SELECT * FROM tags');

      if (tagRows.length === 0){
        return [];
      }

      res.status(200).json({data: tagRows});
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Error in getTags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }

}

export const createTags = async (req: Request, res: Response):Promise<any>  => {
  const {UserID: UserIdInput, Name: NameInput} = req.body;

  if (!UserIdInput || !NameInput){
    return res.status(400).json({error: 'UserId and Name are required'});
  }

  const userId = Number(UserIdInput);
  const name = NameInput;

  try {
    const connection = await pool.getConnection();

    try {
      const [validName] = await connection.query<mysql.RowDataPacket[]>(
        'SELECT Id FROM tags WHERE UserId = ? AND Name = ?',[userId, name]
      );

      if (validName.length > 0){
        return res.status(400).json({error: 'Same tag already exsits'});
      }

      const [result] = await connection.query<mysql.ResultSetHeader>('INSERT INTO tags (UserId, Name) VALUES (?, ?)',[userId, name]);

      res.status(200).json({success:true, tagId: result.insertId, userId, name});
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Error in createTags:', error);
    res.status(500).json({ error: 'Failed to add tag' });
  }

}

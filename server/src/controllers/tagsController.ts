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
  const {userId: userIdInput, name: nameInput} = req.body;

  if (!userIdInput || !nameInput){
    return res.status(400).json({error: 'UserId and Name are required'});
  }

  const userId = Number(userIdInput);
  const name = nameInput;

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

export const updateTags = async (req: Request, res: Response):Promise<any>  => {
  const {userId: userIdInput, tagId: tagIdInput, name: nameInput} = req.body;

  if (!userIdInput || !tagIdInput || !nameInput){
    return res.status(400).json({error: 'UserId, TagId and Name are required'});
  }

  const userId = Number(userIdInput);
  const tagId = Number(tagIdInput);
  const name = nameInput;

  try {
    const connection = await pool.getConnection();

    try {
      const [validTag] = await connection.query<mysql.RowDataPacket[]>(
        'SELECT Id FROM tags WHERE Id = ? AND UserId = ? AND Name = ?',[tagId, userId, name]
      );

      if (validTag.length === 0){
        return res.status(400).json({error: 'Tag not found'});
      }

      const [result] = await connection.query('UPDATE tags SET name = ? WHERE Id = ?',[name, tagId]);

      res.status(200).json({success:true, tagId, userId, name});
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Error in updateTags:', error);
    res.status(500).json({ error: 'Failed to update tag' });
  }

}

export const deleteTags = async (req: Request, res: Response):Promise<any>  => {
  const {tagId: tagIdInput} = req.body;

  if (!req.query.userId || !tagIdInput){
    return res.status(400).json({error: 'UserId, TagId are required'});
  }

  const userId = Number(req.query.userId);
  const tagId = Number(tagIdInput);

  try {
    const connection = await pool.getConnection();

    try {
      const [validTag] = await connection.query<mysql.RowDataPacket[]>(
        'SELECT Id FROM tags WHERE Id = ? AND UserId = ?',[tagId, userId]
      );

      if (validTag.length === 0){
        return res.status(400).json({error: 'Tag not found'});
      }

      const [result] = await connection.query('DELETE FROM tags WHERE Id = ?',[tagId]);

      res.status(200).json({success:true, tagId, userId});
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Error in deleteTags:', error);
    res.status(500).json({ error: 'Failed to delete tag' });
  }

}

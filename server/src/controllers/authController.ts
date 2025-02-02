import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../utils/createPool";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const register:RequestHandler = async (req: Request, res: Response):Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const connection = await pool.getConnection();
  await connection.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);
  connection.release();

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

export const login:RequestHandler = async (req: Request, res: Response):Promise<void> => {
  const { email, password } = req.body;
  const connection = await pool.getConnection();
  const [rows]: any = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
  connection.release();

  if (rows.length === 0) {
    res.status(400).json({ error: "Invalid credentials" });
    return;
  }

  const user = rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ error: "Invalid credentials" });
    return;
  }


  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

export const getUser = async (req: Request, res: Response) => {
  res.json(req.user);
};

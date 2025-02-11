import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { pool } from "../utils/createPool";

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const register:RequestHandler = async (req: Request, res: Response):Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const connection = await pool.getConnection();
  await connection.query("INSERT INTO users (Email, Password) VALUES (?, ?)", [email, hashedPassword]);
  connection.release();

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

export const login:RequestHandler = async (req: Request, res: Response):Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const connection = await pool.getConnection();

  try {
    const [rows]: any = await connection.query("SELECT * FROM users WHERE Email = ?", [email]);
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

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });

  } finally {
    connection.release();
  }

};

export const getUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  res.json(req.user);
};

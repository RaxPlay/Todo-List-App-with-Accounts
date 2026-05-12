import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

export const Protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token not existent" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await pool.query("SELECT id, username, email FROM users WHERE id = $1", [decoded.id]);

    if(user.rows.length === 0){
      return res.status(401).json({ message: "No user" });
    }

    req.user = user.rows[0];

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({message: "Unauthorized, token failed"})
  }
}
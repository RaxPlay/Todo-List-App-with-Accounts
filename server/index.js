import express from "express";
import cors from "cors";
import { pool } from "./config/db.js";
import cookieParser from "cookie-parser";
import router from "./routes/auth.js"
import { Protect } from "./middleware/auth.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", router)

app.post("/todos", Protect, async (req, res) => {
  try {
    const { todo_name, description } = req.body;
    
    const newTodo = await pool.query("INSERT INTO todo(todo_name, description, user_id) VALUES ($1, $2, $3) RETURNING *", [todo_name, description, req.user.id]);

    res.status(201).json(newTodo.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

//Getting all todos
app.get("/todos", Protect, async (req,res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.status(200).json(allTodos.rows)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
})

//Delete specific todo
app.delete("/todos/:todoId", Protect, async (req, res) => {
  try {
    const { todoId } = req.params;

    console.log(todoId, typeof todoId)

    const deletedTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [parseInt(todoId)]);

    res.status(200).json("Task deleted");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
})

app.listen(5000, (req, res)=>{
  console.log("Works")
});
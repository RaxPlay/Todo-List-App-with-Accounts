import React, { useState, useEffect } from "react";
import axios from "axios";

export const ListTodos = ({ user }) => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      const jsonData = response.data;

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const deleteTask = async (todoId) => {
    console.log("Deleting todo:", todoId);
    try {
      const res = await axios.delete(`http://localhost:5000/todos/${todoId}`);

      setTodos(todos.filter(todo => todo.todo_id !== todoId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        {todos.map((todo) => (
          <ul key={todo.todo_id} className="flex justify-center">
            {todo.user_id === Number(user.id) ? (
              <li className="m-1.5 border border-[#C62F2F] bg-[#ce4242] rounded-md  text-[#F6F4D2FF]">
                <div className="min-w-70 flex justify-end">
                  <div className="min-w-[73%] flex justify-between items-center gap-2 ">
                    <p>{todo.todo_name}</p>
                  
                    <button onClick={() => deleteTask(todo.todo_id)} className="bordexr-0 min-w-20 w-max rounded p-1.5 bg-[#ae2828] duration-300 hover:bg-[#901f1f]">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>

                {todo.description !== "" ? (
                  <div className="flex justify-center">
                    <label className="opacity-70">Description: </label>
                    <p className="ml-1"> {todo.description}</p>
                  </div>
                ) : (
                  <></>
                )}
              </li>
            ) : (
              <></>
            )}
          </ul>
        ))}
      </div>
    </>
  );
};
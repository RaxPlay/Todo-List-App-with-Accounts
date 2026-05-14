import axios from 'axios';
import React, { useEffect, useState } from 'react'


export const Todos = () => {
  const [todo_name, setTaskName] = useState("");
  const [description, setTaskDesc] = useState("");
  const [displayTask, setDisplayTask] = useState([]);
  const [error, setError] = useState("");

  const addTask = async (e) => {
    e.preventDefault();

    try {
      const body = {todo_name, description};

      const response = await axios.post("http://localhost:5000/todos", body) 
    } catch (error) {
      setError(error)
    }
  }

  const getTodos = async () => {
		try {
			const response = await axios.get("http://localhost:5000/todos");
			const jsonData = response.data;
			
      setDisplayTask(jsonData)
		} catch(err){
			console.error(err.message)
		}
  }

  useEffect(()=>{
    getTodos();
  },[])

  return (
    <>
      <div className='border border-[#C62F2F] rounded-md bg-[#F19C79] p-2 mt-10 text-[#F6F4D2]'>
        <h1 className='text-2xl'>Your Tasks</h1>

        <form className='justify-center items-center gap-2 mt-3' onSubmit={addTask}>
          <label className=' border border-[#C62F2F] bg-[#ce4242] rounded-md p-1.5 text-[#F6F4D2FF]'>Add New Task:</label>

          <input type="text" placeholder='Task Name' value={todo_name} onChange={(e) => setTaskName(e.target.value)} className='border border-[#C62F2F] bg-[#ce4242] rounded-md p-1 ml-1 text-[#F6F4D2FF]'/>

          <div className='mt-2'> 
            <input type="text" 
            placeholder='Task Description (optional)' 
            value={description} 
            onChange={(e) => setTaskDesc(e.target.value)} className='border border-[#C62F2F] bg-[#ce4242] rounded-md p-1 text-[#F6F4D2FF] w-57'/>

            <button className=' border border-[#C62F2F] bg-[#ce4242] rounded-md p-1 text-[#F6F4D2FF] ml-1 w-20 duration-300 hover:bg-[#b93333]' onClick={addTask}>
              <i className="fa-solid fa-arrow-up"></i>
            </button>
          </div>
        </form>

        <div id='displayTodos'>
          
        </div>
      </div>
    </>
  )
}

import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

export const Register = ({setUser}) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "", 
  })
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/register", form)
      setUser(res.data.user);
      navigate("/");
    } catch (error) {
      setError("Invalid credentials, try again")
    }
  }

  return (
    <div className='w-screen h-[80vh] flex items-center justify-center'>
      <form className='bg-[#f19c79ff] w-120 h-70 border border-[#c62f2f] rounded-2xl text-center p-4' onSubmit={handleRegistration}>
        <h2 className='text-3xl text-[#F6F4D2FF] mt-2'>Sign Up</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input type="text" placeholder='Username' value={form.username} onChange={(e) => {setForm({...form, username: e.target.value})}} className='border border-[#C62F2F] bg-[#ce4242] rounded-md p-1 w-full mt-5 text-[#F6F4D2FF]'/>

        <input type="email" placeholder='Email' value={form.email} onChange={(e) => {setForm({...form, email: e.target.value})}} className='border border-[#C62F2F] bg-[#ce4242] rounded-md p-1 w-full mt-5 text-[#F6F4D2FF]'/>

        <div className='flex items-end w-full  h-14 gap-2 '>
          <input type="password" placeholder='Password' value={form.password} onChange={(e) => {setForm({...form, password: e.target.value})}} className='border border-[#C62F2F] bg-[#ce4242] rounded-md p-1 w-fit mt-5 text-[#F6F4D2FF]'/>

          <button className='border border-[#C62F2F] bg-[#ce4242] text-white w-full h-8.5 rounded-md duration-300 hover:bg-[#b93333]' onClick={handleRegistration}>
            <i className='fa-solid fa-arrow-right'></i>
          </button>
        </div>

        <Link to="/login" className='text-blue-500 '>
          <p className='mt-3 duration-300 hover:text-blue-700 hover:underline'>Already Have an account? Log-in here</p>
        </Link>
      </form>
    </div>
  )
}


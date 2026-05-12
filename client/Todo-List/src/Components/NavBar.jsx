import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export const NavBar = ({user, setUser}) => {
  const navigate = useNavigate();

  const HandleLogout = async (e) => {
	  await axios.post("/api/auth/logout");
	  setUser(null);
	  navigate("/");
	}

  return (
    <div className='bg-[#A44A3FFF] text-[#F6F4D2FF] flex justify-center p-5 border-0 rounded-b-xl text-2xl gap-50'>
      <Link to="/home">Home</Link>
      {user ? (
        <button onClick={HandleLogout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      
    </div>
  )
}

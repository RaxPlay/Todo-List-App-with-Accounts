import React, { useEffect } from 'react'
import { Login } from './Login'
import { useNavigate, Link } from 'react-router-dom'
import { Todos } from '../Components/Todos'

export const Home = ({error, user}) => {
  const navigate = useNavigate();

  return (
    <>
      { user ? (
        <div className='text-center p-5 h-screen'>
          <div className='border border-[#C62F2F] rounded-md bg-[#F19C79] p-2'>
            <h1 className='text-2xl text-[#F6F4D2]'>
              Hey there <span className='underline'>{user.username}</span>
            </h1>
          </div>
          
          <Todos/>

        </div>
      ) : (
        <div className='text-center p-5'>
          <div className='border border-[#C62F2F] rounded-md bg-[#F19C79] p-2'>
            <h1 className='text-2xl text-[#F6F4D2]'>
              You Will Need To 
              <Link to="/login" className=' text-blue-500 underline duration-300 hover:text-blue-700'> Log In </Link> 
              or
              <Link to="/register" className=' text-blue-500 underline duration-300 hover:text-blue-700'> Sign Up </Link> 
              Before Creating Tasks
            </h1>
          </div>
        </div>
      ) }
    </>
  )
}

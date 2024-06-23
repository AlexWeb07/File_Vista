import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import { FaUserCog } from "react-icons/fa";

const Dashboard = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("authToken")){
      navigate('/loginsignup')
      alert("Unauthorized Access!!")
    }
  },[localStorage])

  return (
    <div className="flex justify-center items-center min-h-screen text-white">
      <Navbar/>
      <div className='w-[calc(100%-15rem)] flex flex-col justify-start items-start left-60 top-0 absolute h-full'>
        <header className='w-full h-16 flex items-center justify-end gap-3'>
              <Link to={'/accountSetting'}><FaUserCog className='text-[var(--clr4)] hover:text-[var(--clr3)] text-3xl' role='button'/></Link>
              <p className='pr-5 text-xl text-[var(--clr4)] font-medium'>Kaushik Kumar Das</p>
        </header>
        <div className='w-full h-[calc(100%-4rem)] flex justify-center items-center px-52 pb-48 pt-28 flex-shrink-0 flex-wrap gap-16'>

          <div className=' drop-shadow-xl hover:drop-shadow-2xl transition-all hover:scale-105 flex flex-col justify-between p-5 items-start w-80 h-44 bg-[var(--clr3)] rounded-md'>
            <p className='text-xl font-mono text-[var(--clr1)] font-semibold'>My Files</p>
            <p className='text-6xl text-[var(--clr4)]'>20</p>
            <span className=' flex justify-end w-full font-medium text-[var(--clr2)] hover:text-[var(--clr1)]' role='button'>
              <Link to={'/myFiles'}>
                Go » 
              </Link>  
            </span>
          </div>
          
          <div className=' drop-shadow-xl hover:drop-shadow-2xl transition-all hover:scale-105 flex flex-col justify-between p-5 items-start w-80 h-44 bg-[var(--clr3)] rounded-md'>
            <p className='text-xl font-mono text-[var(--clr1)] font-semibold'>Shared with me</p>
            <p className='text-6xl text-[var(--clr4)]'>86</p>
            <span className=' flex justify-end w-full font-medium text-[var(--clr2)] hover:text-[var(--clr1)]' role='button'>
              <Link to={'/sharedWithMe'}>
                Go » 
              </Link>            
            </span>
          </div>
          
          <div className=' drop-shadow-xl hover:drop-shadow-2xl transition-all hover:scale-105 flex flex-col justify-between p-5 items-start w-80 h-44 bg-[var(--clr3)] rounded-md'>
            <p className='text-xl font-mono text-[var(--clr1)] font-semibold'>My Folders</p>
            <p className='text-6xl text-[var(--clr4)]'>07</p>
            <span className=' flex justify-end w-full font-medium text-[var(--clr2)] hover:text-[var(--clr1)]' role='button'>
              <Link to={'/myFiles'}>Go » </Link>
            </span>
          </div>

          <div className=' drop-shadow-xl hover:drop-shadow-2xl transition-all hover:scale-105 flex flex-col justify-between p-5 items-start w-80 h-44 bg-[var(--clr3)] rounded-md'>
            <p className='text-xl font-mono text-[var(--clr1)] font-semibold'>Shared with me</p>
            <p className='text-6xl text-[var(--clr4)]'>86</p>
            <span className=' flex justify-end w-full font-medium text-[var(--clr2)] hover:text-[var(--clr1)]' role='button'>Go »  </span>
          </div>

        </div>

        
      </div>
     
    </div>
  );
};

export default Dashboard;

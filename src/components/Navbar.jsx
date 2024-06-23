import React, { useEffect, useState } from 'react'
import './navbar.css'
import { Link,useLocation } from 'react-router-dom'

function Navbar() {
  const location= useLocation();
  // console.log(location.pathname);
  const [tp,setTp]=useState('')

  const heights={'/dashboard':'0rem',
                '/accountSetting':'5rem',
                '/myFiles':'10rem',
                '/sharedWithMe':'15rem',
                '/upload':'20rem'}
  useEffect(()=>{
    setTp(heights[location.pathname] || '0rem')
  },[location.pathname,heights])

  return (
    <div className=' w-60 h-full absolute left-0 top-0 flex bg-[var(--clr2)] justify-start flex-col'>

        <Link to='/' className=' z-10 h-10 pt-5 pl-3 text-3xl font-bold text-[var(--clr4)] '>File Vista</Link>
        <div className=' relative z-10 w-full h-[80%] flex flex-wrap justify-start flex-col gap-4 font-mono text-xl mt-8  font-semibold '>

            <Link to="/dashboard" id='btna' className='btns hover:text-[var(--clr3)]' >Dashboard</Link>
            <Link to="/accountSetting" id='btna' className='btns hover:text-[var(--clr3)]' >Account Setting</Link>
            <Link to="/myFiles" id='btnb' className='btns hover:text-[var(--clr3)]'>My Files</Link>
            <Link to="/sharedWithMe" id='btnc' className='btns hover:text-[var(--clr3)]'>Shared with Me</Link>
            <Link to="/upload" id='btnd' className='btns hover:text-[var(--clr3)]'>Upload</Link>    
          <div id="changer" className={`rounded-tr-3xl rounded-br-3xl absolute w-full h-16 z-0 bg-[var(--clr1)]`} style={{top:tp}} ></div>
        </div>  
    </div>
  )
}

export default Navbar

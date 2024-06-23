import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { GoSignOut } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { BiEdit } from 'react-icons/bi'


function AccountSetting() {
  const navigate=useNavigate();
  const [formData,setFormData]=useState({username:"",email:"",password:""})
  const [isName,setIsName]=useState(true)
  const [isEmail,setIsEmail]=useState(true)
  const [isPass,setIsPass]=useState(true)


  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:3000/api/auth/updateUser",
      {
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "authToken":localStorage.getItem("authToken")
        },
        body:JSON.stringify(formData)
      }
    )
    const data=await response.json();
    alert(data.msg)
    setFormData((prev)=>{return {...prev,password:""}})
  }

  const handleInputChange=(e)=>{
    setFormData((prev)=>{return {...prev,[e.target.name]:e.target.value}})
  }
  const handleLogOut=()=>{
    localStorage.removeItem("authToken")
    navigate("/loginSignup")
  }





  useEffect(()=>{
     fetch("http://localhost:3000/api/auth/getUser",{
      method:"GET",
      headers:{
        "Content-type":"application/json",
        "authToken":localStorage.getItem("authToken")
      }
     }).then((response)=>{
      const data=response.json()
      return data
     }).then((data)=>{
      setFormData({username:data.user.username || "",email:data.user.email,password:""})
     })

     if(!localStorage.getItem("authToken")) navigate("/loginSignup")

  },[localStorage])

  return (
    <div className="flex justify-center items-center min-h-screen text-white">
      <Navbar/>
      <section className='w-[calc(100%-15rem)] flex flex-col justify-center items-center left-60 top-0 absolute h-full'>

        <header className='absolute z-10 flex justify-end top-5 w-full right-5 gap-3 '>
              <button onClick={handleLogOut}>
                <GoSignOut className='text-[var(--clr4)] hover:text-[var(--clr3)] text-2xl' role='button'/>
              </button>
        </header>

        <div id="userCard" className=' w-[40%] max-h-max bg-[var(--clr1)] rounded-lg drop-shadow-2xl p-8'>
          <h2 className="text-3xl font-bold text-center mb-8 text-[var(--clr4)]">Manage Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="username" className="flex justify-start items-center text-[var(--clr3)] text-lg font-semibold mb-2">Username &nbsp; <BiEdit onClick={()=>setIsName(prev=>!prev)} className='hover:text-[var(--clr4)] text-sm'/></label>
              <input
                required
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`outline-none w-full bg-transparent ${!isName && "border-b"} border-[var(--clr2)] text-white py-2 px-3 focus:outline-none focus:border-[var(--clr3)] mb-4`}
                placeholder="Username"
                disabled={isName}
                
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="flex justify-start items-center text-[var(--clr3)] text-lg font-semibold mb-2">Email &nbsp; <BiEdit onClick={()=>setIsEmail(prev=>!prev)} className='hover:text-[var(--clr4)] text-sm'/></label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`outline-none w-full bg-transparent ${!isEmail && "border-b"} border-[var(--clr2)] text-white py-2 px-3 focus:outline-none focus:border-[var(--clr3)] mb-4`}
                placeholder="Email"
                disabled={isEmail}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="flex justify-start items-center text-[var(--clr3)] text-lg font-semibold mb-2">Password &nbsp; <BiEdit onClick={()=>setIsPass(prev=>!prev)} className='hover:text-[var(--clr4)] text-sm'/></label>
              <input
                required
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`outline-none w-full bg-transparent ${!isPass && "border-b"} border-[var(--clr2)] text-white py-2 px-3 focus:outline-none focus:border-[var(--clr3)] mb-4`}
                placeholder="New Password"
                disabled={isPass}
              />
            </div>
            { (!isName || !isEmail || !isPass ) &&
              <button className="w-full bg-[var(--clr2)] hover:bg-[var(--clr3)] text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 mb-4" type="submit">Save Changes</button>
            }
          </form>
        </div>
      </section>
    </div>
  )
}

export default AccountSetting

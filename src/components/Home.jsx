import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='w-full h-full absolute top-0 left-0 p-10'>
      <div className="h-full w-full flex flex-col font-semibold gap-10">

        <header className="py-5 px-5 bg-[var(--clr1)] rounded-2xl">
          <div className="mx-auto flex justify-between items-center">
            <h1 className="text-4xl font-bold text-[var(--clr4)] pl-5">File Vista</h1>
            <nav>
              <ul className="flex space-x-4 pr-5">
                {!localStorage.getItem("authToken")?
                <li><Link to="/loginsignup" className="text-white hover:bg-[var(--clr2)] bg-[#2c2c56] px-5 py-3 rounded-full transition duration-300">Login / Signup</Link></li>
                :<li><Link to="/dashboard" className="text-white hover:bg-[var(--clr2)] bg-[#2c2c56] px-5 py-3 rounded-full transition duration-300">Dashboard &nbsp; »</Link></li>}
              </ul>
            </nav>
          </div>
        </header>
        
        <section className=' bg-gradient-to-b from-[var(--clr1)] to-[var(--clr2)] h-full p-8 flex justify-end rounded-2xl items-center flex-col'>
          <main className="flex justify-center items-center mb-32">
            <div className="container mx-auto text-center">
              <h2 className="text-4xl font-semibold text-[var(--clr4)] mb-4">Share and Store Files Securely</h2>
              <p className="text-[var(--clr3)] text-lg mb-8">Get started now to experience the power of FileVista!</p>
              <Link to="/loginsignup" className="bg-[var(--clr1)] hover:bg-[var(--clr2)] text-white font-semibold py-3 px-8 rounded-full inline-block shadow-lg transition duration-300">Get Started</Link>
            </div>
          </main>
          <footer className="py-6">
            <div className="container mx-auto text-center text-white">
              <p className="mt-4 text-[var(--clr3)]">&copy; 2024 FileVista. All rights reserved.</p>
            </div>
          </footer>
        </section>
    </div>
  </div>
  )
}

export default Home

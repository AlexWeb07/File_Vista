import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes ,Route } from 'react-router-dom'
import Home from './components/Home'
import LoginSignup from './components/LoginSignup.jsx'
import MyFiles from './Routes/MyFiles.jsx'
import Dashboard from './components/Dashboard.jsx'
import FileDetails from './components/FIleDetails.jsx'
import AccountSetting from './Routes/AccountSetting.jsx'
import SharedWithMe from './Routes/SharedWithMe.jsx'
import Upload from './Routes/Upload.jsx'

function App() {
  return (
    <div className='bg-gradient-to-b from-[var(--clr1)] to-[var(--clr2)] w-full h-full absolute'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/accountSetting" element={<AccountSetting/>} />
        <Route path="/myFiles" element={<MyFiles/>} />
        <Route path="/sharedWithMe" element={<SharedWithMe/>} />
        <Route path="/upload" element={<Upload/>} />
        <Route path="/loginsignup" element={<LoginSignup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/filedetails" element={<FileDetails/>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App

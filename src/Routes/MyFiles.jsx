import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import files from '../assets/files'
import {FaArrowRotateLeft, FaFileCirclePlus } from 'react-icons/fa6'
import {FaFolderPlus } from 'react-icons/fa'
import GetFiles from '../components/GetFiles'

function MyFiles() {
    const [allFiles,setAllFiles]=useState(files)

    // ToDO : have to handle when the folder or file name is blank or null
    const getLocation=(id,type,files,newName,isFolder)=>{
      
        return files.map((file)=>{
          if(file.address==id){
            console.log()
            const newFile={ name:newName, type, isFolder, children:[], address:isFolder? id+newName+"/" :""}
            file.children.push(newFile)
            return true;
          }
          const glocate=getLocation(id,type,file.children,newName,isFolder);
          if (glocate) return true;
      })
      
    }
    const handleNewFile=(e)=>{
      const newName=prompt("Enter file name :")
      if(newName!=""){
        const parts = newName.split('.');
        const type= parts.length > 1 ? parts.pop() : '';

        const locate=getLocation(e.target.id,type,allFiles,newName,false)
        if(locate){
          setAllFiles([...allFiles]);
        }    
      }
    }

    const handleNewFolder=(e)=>{
      const newName=prompt("Enter folder name :")
      if(newName!=""){
        const parts = newName.split('.');
        const type= parts.length > 1 ? parts.pop() : '';
        const locate=getLocation(e.target.id,type,allFiles,newName,true)
        if(locate){
          setAllFiles([...allFiles]);
        } 
      }     
    }

  return (
    <div className="flex justify-center items-center min-h-screen text-white">
      <Navbar/>
      <section className='w-[calc(100%-15rem)] flex flex-col justify-start items-start left-60 top-0 absolute h-full'>
          <aside className=' w-72 h-full border-r-2  border-r-[var(--clr3)] flex justify-start flex-col'>
              <header className='w-full h-20 border-b-2 border-b-[var(--clr3)] flex justify-end items-end gap-4 pb-4 pr-4'>
                <FaFileCirclePlus className='text-[var(--clr4)] text-xl hover:text-[var(--clr3)] hover:text-2xl transition-all' role='button'/>
                <FaFolderPlus className='text-[var(--clr4)] text-xl hover:text-[var(--clr3)] hover:text-2xl transition-all' role='button'/>
                <FaArrowRotateLeft className='text-[var(--clr4)] text-xl hover:text-[var(--clr3)] hover:text-2xl transition-all' role='button'/>
              </header>
              <div className='w-full h-[calc(100%-5rem)] bg-[var(--clr1)] '>
                {
                  allFiles.map((f,i)=>{
                    return(
                      <GetFiles
                        key={i}
                        id={f.address}
                        name={f.name}
                        type={f.type}
                        isFolder={f.isFolder}
                        children={f.children}
                        handleNewFile={handleNewFile}
                        handleNewFolder={handleNewFolder}
                    />
                    )
                  })
                }
              </div>
          </aside>
      </section>
    </div>
  )
}

export default MyFiles

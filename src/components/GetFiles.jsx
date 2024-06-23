import React, { useState } from 'react'
import { FaFile } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import { FiFilePlus, FiFolderPlus } from 'react-icons/fi';
import {
    FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFileAlt, FaFileImage, FaFileArchive,
    FaFileAudio, FaFileVideo, FaJs, FaHtml5, FaCss3Alt, FaFileCode, FaJava, FaPython, FaPhp
  } from 'react-icons/fa';

function GetFiles({ id, name,type, isFolder, children,handleNewFile, handleNewFolder }) {
    
    const fileIcons = {
        pdf: FaFilePdf,
        doc: FaFileWord,
        docx: FaFileWord,
        xls: FaFileExcel,
        xlsx: FaFileExcel,
        ppt: FaFilePowerpoint,
        pptx: FaFilePowerpoint,
        txt: FaFileAlt,
        jpg: FaFileImage,
        jpeg: FaFileImage,
        png: FaFileImage,
        gif: FaFileImage,
        zip: FaFileArchive,
        rar: FaFileArchive,
        mp3: FaFileAudio,
        mp4: FaFileVideo,
        js: FaJs,
        jsx: FaFileCode,
        html: FaHtml5,
        css: FaCss3Alt,
        json: FaFileCode,
        xml: FaFileCode,
        java: FaJava,
        py: FaPython,
        c: FaFileCode,
        cpp: FaFileCode,
        ts: FaFileCode,
        tsx: FaFileCode,
        rb: FaFileCode,
        php: FaPhp,
        go: FaFileCode
      };
    
    const IconComponent=fileIcons[type] || FaFileAlt;
    const [showChild,setShowChild]=useState(false)
    

    return (
        <>
            <div className='flex justify-start items-center gap-2 text-[1.1rem] pl-2 font-mono group/item cursor-pointer hover:bg-[var(--clr2)]'>
                <span onClick={()=>setShowChild(prev=>!prev)} className='flex justify-start items-center gap-2'>
                    {isFolder && <span className='text-[var(--clr3)]'>{showChild ? "↴" : ">"}</span>}
                    {isFolder ? <FaFolder className=' text-[var(--clr3)]' /> : <IconComponent className=' text-[var(--clr4)]' />}
                    <span>{name}</span>
                </span>
                    

                {isFolder &&
                    <div className=' flex flex-row gap-2 text-[1rem] group-hover/item:visible invisible' >
                        <FiFilePlus onClick={handleNewFile} id={id}/>
                        <FiFolderPlus onClick={handleNewFolder} id={id}/>
                    </div>}

            </div>

            {isFolder && showChild &&
                <div className=' ml-7'>
                    <span>
                       {
                         children.map((f,i)=>{
                            return (
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
                    </span>
                </div>
            }
        </>

    )
}

export default GetFiles


import React, { useState } from 'react'
import Navbar from '../components/Navbar'

function Upload() {


  // -------------drag & drop functionality-------------
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    console.log(file)
    setSelectedFile(file);
    setIsDragging(false); 
  };

  const handleFileClear = () => {
    setSelectedFile(null);
    setIsDragging(false); 
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };



  // -------------Rendering file preview-------------
  const renderFilePreview = () => {
    if (!selectedFile) return null;

    if (selectedFile.type.startsWith('image/')) {
      return <img src={URL.createObjectURL(selectedFile)} alt="File Preview" className="max-w-full h-[80%]" />;
    } else if (selectedFile.type === 'application/pdf') {
      return (
        <object data={URL.createObjectURL(selectedFile)} type="application/pdf" width="100%" height="500">
          <embed src={URL.createObjectURL(selectedFile)} type="application/pdf" />
        </object>
      );
    } else if (selectedFile.type.startsWith('video/')) {
      return (
        <video autoPlay className="max-w-full h-[80%]">
          <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <div className="text-center">
          <p className="text-[var(--clr4)]">{selectedFile.name}</p>
          <p className="text-gray-400">File type not supported for preview</p>
        </div>
      );
    }
  };

  // -------------Handling File Upload-------------
  const handleUpload=async (e)=>{
      const formData=new FormData();
      formData.append("userFile",selectedFile);
      e.preventDefault();
      const response=await fetch("http://localhost:3000/api/file/upload",
        {
          method:"POST",
          header:{
            "Content-type":"multipart/form-data"
          },
          body:formData
        }
      )
      const data=await response.json();
  }



  // -------------Main function Return-------------
  return (
    <div className='flex w-full h-full text-white'>
      <Navbar/>
      <div className='w-[calc(100%-15rem)] flex flex-col justify-center items-center h-full absolute left-60 top-0'>
        <form onSubmit={handleUpload} className="max-w-3xl w-full p-8 bg-[var(--clr1)] rounded-lg shadow-lg">
            <h1 className=" text-[var(--clr4)] text-4xl font-bold text-center mb-8 animate__animated animate__fadeInDown">Upload New File</h1>

            <div
              className={`p-8 rounded-md bg-transparent border-2 border-dashed border-[var(--clr2)] animate__animated ${isDragging ? 'bg-[var(--clr1)]' : ''}`}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!selectedFile && (
                <>
                  <h2 className="text-[var(--clr3)] text-2xl font-semibold mb-4 text-center">Drag & Drop a File Here</h2>
                  <p className="text-[var(--clr2)] text-center">or</p>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".php,.js,.html,.css,.jsx,.tsx,.sql,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
                    id="fileInput"
                    name="userFile"
                  />
                  <label
                    htmlFor="fileInput"
                    className="bg-[var(--clr2)] hover:bg-[var(--clr3)] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 cursor-pointer mt-4 block text-center"
                  >
                    Select File
                  </label>
                </>
              )}

              {selectedFile && (
                <>
                  <div className=" h-[25rem] bg-[var(--clr2)] p-4 rounded-lg mt-4 flex flex-col ">
                    {renderFilePreview()}
                    <button
                      onClick={handleFileClear}
                      className="bg-[var(--clr3)] hover:bg-[var(--clr1)] text-slate-200 font-bold py-1 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 cursor-pointer mt-2 block text-center"
                    >
                      Clear Selection 
                    </button>
                    <button
                      type='submit'
                      className="bg-[var(--clr3)] hover:bg-[var(--clr1)] text-slate-200 font-bold py-1 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 cursor-pointer mt-2 block text-center"
                    >
                      Upload
                    </button>
                  </div>
                </>
              )}
            </div>
        </form>
      </div>
    </div>
  )
}

export default Upload

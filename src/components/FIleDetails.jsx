import React from 'react';
import { useParams } from 'react-router-dom';

const FileDetails = () => {
  const { fileId } = useParams(); // Assuming you're using React Router for routing

  // Fetch file details based on fileId from your backend API
  const fetchFileDetails = async () => {
    try {
      const response = await fetch(`/api/files/${fileId}`); // Replace this URL with your actual API endpoint
      if (response.ok) {
        const fileDetails = await response.json();
        return fileDetails;
      } else {
        throw new Error('Failed to fetch file details');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [file, setFile] = React.useState(null);

  React.useEffect(() => {
    const getFileDetails = async () => {
      const fileDetails = await fetchFileDetails();
      setFile(fileDetails);
    };

    getFileDetails();
  }, []); // Fetch file details on component mount

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="max-w-3xl w-full p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8">File Details</h1>
        {file ? (
          <div className="bg-gray-700 p-4 rounded-lg mt-4">
            <p className="text-blue-400">{file.name}</p>
            <p className="text-gray-400">File size: {file.size} bytes</p>
            <p className="text-gray-400">File type: {file.type}</p>
          </div>
        ) : (
          <p className="text-center text-gray-400">Loading file details...</p>
        )}
      </div>
    </div>
  );
};

export default FileDetails;

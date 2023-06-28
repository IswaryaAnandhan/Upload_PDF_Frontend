import React, { useState } from 'react';

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('pdf', selectedFile);

      try {
        const response = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const metadata = await response.json();
          setMetadata(metadata);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className='container'>
          <h1>PDF Uploader</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button className='button' type="submit">Upload</button>
      </form>

      {metadata && (
        <div className='result'>
          <h2>Metadata:</h2>
          <p>Title: {metadata.title}</p>
          <p>Author: {metadata.author}</p>
          <p>Creation Date: {metadata.creationDate}</p>
   
        </div>
      )}
    </div>
  );
};

export default UploadForm;

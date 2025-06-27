// src/components/FileUpload.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './FileUpload.css';

function FileUpload({ onFileSelect, onCancel, onCompare, selectedFile }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const sendPdfToApi = async () => {
    if (!selectedFile) {
      toast.warning("⚠️ Please select a file first");
      return;
    }

    try {
      setIsUploading(true);
      toast.info('⏳ Uploading file, please wait...');

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('https://localhost:7117/api/DocSimilarityComparison', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      console.log('File uploaded successfully:', data);

      toast.dismiss();
      toast.success(`✅ File uploaded: ${selectedFile.name}`);

      if (onCompare) onCompare(data);
      onCancel(); // ✅ Close the modal on success
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.dismiss();
      toast.error(`❌ Upload failed: ${selectedFile?.name || 'File'}`);
      onCancel(); // ✅ Close the modal on failure too
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="file-upload-box">
      <input
        type="file"
        accept=".pdf,.doc,.docx,.xlsx"
        onChange={handleFileChange}
      />
      {selectedFile && <p>Selected: {selectedFile.name}</p>}

      <div className="upload-buttons">
        <button onClick={sendPdfToApi} disabled={!selectedFile || isUploading}>
          {isUploading ? 'Uploading...' : 'Compare'}
        </button>
        <button onClick={onCancel} className="cancel-btn" disabled={isUploading}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default FileUpload;

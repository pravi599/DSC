import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import './FileUpload.css';
import * as signalR from '@microsoft/signalr';

function FileUpload({ onFileSelect, onCancel, onCompare, selectedFile, refreshJDList }) {
  const [isUploading, setIsUploading] = useState(false);
  const [liveMessage, setLiveMessage] = useState('');
  const connectionRef = useRef(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7117/resumeHub")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => console.log("✅ Connected to SignalR Hub"))
      .catch((err) => console.error("❌ SignalR Connection Error:", err));

    connection.on("ResumeUpdated", (message) => {
      setLiveMessage(message || "Resume updated");
      toast.info(`📡 Live Update: ${message}`);
    });

    connection.on("JobDescriptionUploaded", () => {
      toast.success("📄 JD uploaded and processing started");
      if (refreshJDList) refreshJDList();
      if (onCancel) onCancel(); // Close the modal
    });

    connectionRef.current = connection;

    return () => {
      if (connectionRef.current) connectionRef.current.stop();
    };
  }, [onCancel, refreshJDList]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onFileSelect(file);
  };

  const sendPdfToApi = async () => {
    if (!selectedFile) {
      toast.warning("⚠️ Please select a file first");
      return;
    }

    try {
      setIsUploading(true);
      toast.info('⏳ Uploading file...');

      const formData = new FormData();
      formData.append('file', selectedFile);

      const email = localStorage.getItem('userEmail') || '';
      const apiUrl = `https://localhost:7117/api/DocSimilarityComparison?RequestorEmailId=${encodeURIComponent(email)}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${errorText}`);
      }

      const data = await response.json();
      toast.dismiss();
      toast.success(`✅ Comparision completed for ${selectedFile.name}`);

      if (onCompare) onCompare(data);
    } catch (error) {
      console.error('❌ Upload error:', error);
      toast.dismiss();
      toast.error(`❌ Upload failed: ${selectedFile?.name || 'File'}`);
      onCancel(); // Only close on error
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

      {liveMessage && (
        <div className="live-message">
          <p>📡 Live: {liveMessage}</p>
        </div>
      )}
    </div>
  );
}

export default FileUpload;

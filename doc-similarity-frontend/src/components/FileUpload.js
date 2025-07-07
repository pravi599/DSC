import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import './FileUpload.css';
import * as signalR from '@microsoft/signalr';
 
function FileUpload({ onFileSelect, onCancel, onCompare, selectedFile }) {
  const [isUploading, setIsUploading] = useState(false);
  const [liveMessage, setLiveMessage] = useState('');
  const connectionRef = useRef(null);
 
  useEffect(() => {
    // Initialize SignalR connection
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7117/resumeHub")
      .withAutomaticReconnect()
      .build();
 
    connection
      .start()
      .then(() => {
        console.log("✅ Connected to SignalR Hub");
      })
      .catch((err) => {
        console.error("❌ SignalR Connection Error:", err);
      });
 
    // Handle resume update messages
    connection.on("ResumeUpdated", (message) => {
      console.log("📩 ResumeUpdated event received:", message);
      setLiveMessage(message || "Resume updated");
      toast.info(`📡 Live Update: ${message}`);
    });
 
    // Handle JD uploaded event - close popup
    connection.on("JobDescriptionUploaded", () => {
      console.log("📩 JobDescriptionUploaded received");
      toast.success("Job description uploaded and processing started");
 
      // Auto-close the popup
      if (onCancel) onCancel();
    });
 
    connectionRef.current = connection;
 
    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, [onCancel]);
 
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
      console.log('✅ File uploaded successfully:', data);
 
      toast.dismiss();
      toast.success(`✅ File uploaded: ${selectedFile.name}`);
 
      if (onCompare) onCompare(data);
      // ❌ Don't close here anymore — will be closed by SignalR "JobDescriptionUploaded"
    } catch (error) {
      console.error('❌ Upload error:', error);
      toast.dismiss();
      toast.error(`❌ Upload failed: ${selectedFile?.name || 'File'}`);
      onCancel(); // Only close popup on failure
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
 
      {/* Live SignalR message display */}
      {liveMessage && (
        <div className="live-message">
          <p>📡 Live Update: {liveMessage}</p>
        </div>
      )}
    </div>
  );
}
 
export default FileUpload;
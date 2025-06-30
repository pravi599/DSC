import React from 'react';
import Modal from '../components/Modal';
import FileUpload from '../components/FileUpload';
import { Plus } from 'lucide-react';
import './ARDashboard.css';

function JDListAndSearch({
  searchTerm,
  setSearchTerm,
  setIsModalOpen,
  isModalOpen,
  selectedFile,
  handleFileSelect,
  handleCancel,
  handleCompare,
  filteredJDs,
  setSelectedJD,
}) {
  return (
    <>
      <div className="dashboard-header">
        {/* <h2 className="dashboard-title">AR Requestor Dashboard</h2> */}
        <button onClick={() => setIsModalOpen(true)} className="add-jd-btn">
          <Plus className="w-5 h-5 mr-2" /> Add JD
        </button>
      </div>

      <div className="search-bar-container">
        <input
          type="text"
          className="form-control"
          placeholder="Search JD titles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCancel} title="Add New Job Description">
        <FileUpload
          onFileSelect={handleFileSelect}
          onCancel={handleCancel}
          onCompare={handleCompare}
          selectedFile={selectedFile}
        />
      </Modal>

      <div className="jd-list-grid">
        {filteredJDs.map((jd) => (
          <div className="jd-card" key={jd.id}>
            <div className="jd-file-row">
              <div className="jd-file-info">
                <span className="jd-title-link">{jd.title}</span>
              </div>
              <button className="view-status-btn" onClick={() => setSelectedJD(jd)}>
                View Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default JDListAndSearch;

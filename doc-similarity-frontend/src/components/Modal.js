import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black backdrop-blur-sm flex items-center justify-center z-50">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;

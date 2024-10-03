import React, { useEffect, useState } from 'react';
import './AskSocratesModal.css';

const AskSocratesModal = ({ code, problemDescription, onClose, askSocrates }) => {
  const [socraticQuestion, setSocraticQuestion] = useState('Analyzing...');

  useEffect(() => {
    const fetchSocraticResponse = async () => {
      const response = await askSocrates();
      setSocraticQuestion(response);
    };
    fetchSocraticResponse();
  }, [askSocrates]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Socratic Analysis</h2>
        <p><strong>Problem Description:</strong> {problemDescription}</p>
        <p><strong>Code:</strong></p>
        <pre>{code}</pre>
        <p><strong>Socratic Question:</strong> {socraticQuestion}</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default AskSocratesModal;

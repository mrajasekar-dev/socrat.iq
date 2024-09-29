import React from 'react';

const OutputWindow = ({ output }) => {
  return (
    <textarea readOnly value={output} className="output-area" />
  );
};

export default OutputWindow;

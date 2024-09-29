import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import axios from 'axios';

function App() {
  const [language, setLanguage] = useState('63'); // Default to JavaScript
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');

  const languages = [
    { id: '63', name: 'JavaScript' },
    { id: '52', name: 'Python' },
    { id: '50', name: 'C++' },
    // Add more languages as needed
  ];

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const runCode = async () => {
    try {
      const result = await axios.post('http://localhost:5000/run', {
        language_id: language,
        source_code: code
      });
      setOutput(result.data.output);
    } catch (error) {
      console.error('Error executing code:', error);
    }
  };

  return (
    <div className="App">
      <select onChange={handleLanguageChange} value={language}>
        {languages.map(lang => (
          <option key={lang.id} value={lang.id}>{lang.name}</option>
        ))}
      </select>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={handleCodeChange}
        theme="vs-dark"
      />
      <button onClick={runCode}>Run</button>
      <textarea readOnly value={output} />
    </div>
  );
}

export default App;

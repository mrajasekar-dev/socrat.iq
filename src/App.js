import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import './App.css';
import axios from 'axios';

function App() {
  const [language, setLanguage] = useState('63'); // Default to JavaScript
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');

  const languages = [
    { id: '63', name: 'JavaScript' },
    { id: '71', name: 'Python 3' },
    { id: '54', name: 'C++' },
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
      const response = await axios.post('http://localhost:5000/run', {
        language_id: language,
        source_code: code,
      });

      const result = response.data;

      let outputText = '';

      if (result.stdout) {
        outputText = result.stdout;
      } else if (result.stderr) {
        outputText = result.stderr;
      } else if (result.compile_output) {
        outputText = result.compile_output;
      } else if (result.message) {
        outputText = result.message;
      } else {
        outputText = 'No output available.';
      }

      setOutput(outputText);
    } catch (error) {
      console.error('Error executing code:', error);
      setOutput('Error executing code.');
    }
  };

  return (
    <div className="App">
      <select onChange={handleLanguageChange} value={language}>
        {languages.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>
      <Editor
        height="40vh"
        defaultLanguage="javascript"
        value={code}
        onChange={handleCodeChange}
        theme="vs-dark"
      />
      <button onClick={runCode}>Run</button>
      <textarea readOnly value={output} />
    </div>
  );
}

export default App;

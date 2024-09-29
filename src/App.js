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
    <div className="App" style={{ display: 'flex', flexDirection: 'row' }}>
      <div className="description-container" style={{ width: '50%', padding: '20px' }}>
        <h1>Description</h1>
        <p>This is where you can add the problem description or any other content you want on the left side of the screen. Adjust the content as needed.</p>
      </div>
      <div className="code-container" style={{ width: '50%' }}>
        <select onChange={handleLanguageChange} value={language} className="custom-select">
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
        <Editor
          height="80vh"
          defaultLanguage="javascript"
          value={code}
          onChange={handleCodeChange}
          theme="vs-light"
          className="editor"
        />
        <button onClick={runCode} className="run-button">Run</button>
        <textarea readOnly value={output} className="output-area" />
      </div>
    </div>
  );
  
}

export default App;
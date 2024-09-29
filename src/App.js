import React, { useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import Description from './components/Description';
import LanguageSelector from './components/LanguageSelector';
import OutputWindow from './components/OutputWindow';
import axios from 'axios';

function App() {
  const [language, setLanguage] = useState('63'); // Default to JavaScript
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');

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
      <div className="container">
        <Description />
        <div className="editor-container">
          <div className="editor-header">
            <LanguageSelector language={language} setLanguage={setLanguage} />
            <button onClick={runCode} className="run-button">Run</button>
          </div>
          <CodeEditor code={code} setCode={setCode} />
          <OutputWindow output={output} />
        </div>
      </div>
    </div>
  );
}

export default App;

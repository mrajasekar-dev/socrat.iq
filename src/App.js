import React, { useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import Description from './components/Description';
import LanguageSelector from './components/LanguageSelector';
import OutputWindow from './components/OutputWindow';
import Navbar from './components/Navbar';
import About from './components/About'; // Import the About component
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router components

function App() {
  const [language, setLanguage] = useState('63'); // Default to JavaScript
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const runCode = async () => {
    try {
      const response = await axios.post('https://your-vercel-domain.com/api/run', {
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
    <Router>
      <div className="App">
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className={`container ${isMenuOpen ? 'shifted' : ''}`}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Description />
                  <div className="editor-container">
                    <div className="editor-header">
                      <LanguageSelector language={language} setLanguage={setLanguage} />
                      <button onClick={runCode} className="run-button">Run</button>
                    </div>
                    <CodeEditor code={code} setCode={setCode} />
                    <OutputWindow output={output} />
                  </div>
                </>
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

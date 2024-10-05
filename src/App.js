import React, { useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import Description from './components/Description';
import LanguageSelector from './components/LanguageSelector';
import OutputWindow from './components/OutputWindow';
import Navbar from './components/Navbar';
import About from './components/About';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AskSocratesModal from './components/AskSocratesModal';

function App() {
  const [language, setLanguage] = useState('63'); // Default to JavaScript
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for showing the modal

  const apiEndpoint = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'https://socrat-iq.onrender.com';

  const runCode = async () => {
    try {
      const response = await axios.post(`${apiEndpoint}/run`, {
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

  const askSocrates = async () => {
    try {
      const response = await axios.post(`${apiEndpoint}/askSocrates`, {
        code: code, // Pass the code from the state or editor
      });
      
      const socraticResponse = response.data.response || 'No response from Socrates.';
      return socraticResponse;
    } catch (error) {
      console.error('Error fetching Socratic response:', error);
      return 'Error fetching Socratic response.';
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
                      <LanguageSelector language={language} setLanguage={setLanguage} setCode={setCode} />
                      <button onClick={() => setShowModal(true)} className="ask-socrates-button">
                        Ask Socrates
                      </button>
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
        {showModal && (
          <AskSocratesModal
            code={code}
            problemDescription="Your problem description here"
            onClose={() => setShowModal(false)}
            askSocrates={askSocrates}
          />
        )}
      </div>
    </Router>
  );
}

export default App;

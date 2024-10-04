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
import AskSocratesModal from './components/AskSocratesModal'; // Import the modal

function App() {
  const [language, setLanguage] = useState('63'); // Default to JavaScript
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for showing the modal

  const runCode = async () => {
    try {
      const response = await axios.post('https://socrat-iq.onrender.com/run', {
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
      const prompt = `Analyze the following code: ${code} and give a short thought-provoking comment that is a question. But the question has to lead the user to think better logic for the problem. It has to have a example output or something for reference. Just output the question alone in text. No formatting needed.`;
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBPubX2RA0djEjAdF8JCCjJRJqnwxcvIYw',
        {
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ]
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      
      // Handle the response based on the structure you provided
      const socraticResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Socrates.';
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

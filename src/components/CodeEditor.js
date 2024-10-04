import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, setCode }) => {
  const handleCodeChange = (value) => {
    setCode(value);
  };

  return (
    <Editor
      height="40vh"
      defaultLanguage="javascript"
      value={code}
      onChange={handleCodeChange}
      theme="vs-light"
      options={{
        minimap: { enabled: false }, // Disable minimap
        scrollbar: {
          vertical: 'auto', // Enable scroll only when needed
          horizontal: 'auto',
        },
        scrollBeyondLastLine: false, // Prevent unnecessary extra scrolling
        wordWrap: 'on', // Wrap words to prevent horizontal scrolling
        automaticLayout: true, // Automatically adjust layout to the container
        contextmenu: false, // Disable right-click menu
        quickSuggestions: false, // Disable inline suggestions
        suggestOnTriggerCharacters: false, // Disable suggestions on typing
        hover: { enabled: false }, // Disable hover
        parameterHints: { enabled: false }, // Disable parameter hints
        formatOnType: false, // Disable automatic format on type
        formatOnPaste: false, // Disable automatic format on paste
        lightbulb: { enabled: false }, // Disable lightbulb suggestions
        renderLineHighlight: 'none', // Remove line highlighting
        codeLens: false, // Disable CodeLens
        folding: false, // Disable folding
        foldingHighlight: false, // Disable folding highlights
        disableMonacoDiagnostics: true, // Disable Monaco diagnostics
        renderValidationDecorations: 'off', // Disable validation underlines (the key option)
        semanticHighlighting: false, // Disable semantic highlighting
        languageValidation: false, // Disable language validation
        errorMarkers: false, // Disable error markers
      }}
      className="editor"
    />
  );
};

export default CodeEditor;

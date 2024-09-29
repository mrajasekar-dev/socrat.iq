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
      }}
      className="editor"
    />
  );
};

export default CodeEditor;

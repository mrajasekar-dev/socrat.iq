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
        minimap: { enabled: false },
        scrollbar: {
          vertical: 'auto',
          horizontal: 'auto',
        },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        automaticLayout: true,
      }}
      className="editor"
    />
  );
};

export default CodeEditor;

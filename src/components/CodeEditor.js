import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, setCode }) => {
  const handleCodeChange = (value) => {
    setCode(value);
  };

  return (
    <Editor
      height="50vh"
      defaultLanguage="javascript"
      value={code}
      onChange={handleCodeChange}
      theme="vs-light"
      className="editor"
    />
  );
};

export default CodeEditor;

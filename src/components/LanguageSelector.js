import React, { useEffect } from 'react';

const LanguageSelector = ({ language, setLanguage, setCode }) => {
  const languages = [
    { id: '63', name: 'JavaScript' },
    { id: '71', name: 'Python 3' },
    { id: '54', name: 'C++' },
    { id: '62', name: 'Java' },
    { id: '60', name: 'Go' }
  ];

  const languageTemplates = {
    '63': "// Write your JavaScript code here\nconsole.log('Hello, World!');",
    '71': "# Write your Python code here\nprint('Hello, World!')",
    '54': "// Write your C++ code here\n#include<iostream>\nusing namespace std;\nint main() {\n  cout << 'Hello, World!';\n  return 0;\n}",
    '62': "// Write your Java code here\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println('Hello, World!');\n  }\n}",
    '60': "// Write your Go code here\npackage main\nimport 'fmt'\nfunc main() {\n  fmt.Println('Hello, World!')\n}"
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    setCode(languageTemplates[selectedLanguage]); // Set the default code template based on selected language
  };

  useEffect(() => {
    setCode(languageTemplates[language]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <select onChange={handleLanguageChange} value={language} className="custom-select">
      {languages.map((lang) => (
        <option key={lang.id} value={lang.id}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;

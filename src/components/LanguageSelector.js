import React from 'react';

const LanguageSelector = ({ language, setLanguage }) => {
  const languages = [
    { id: '63', name: 'JavaScript' },
    { id: '71', name: 'Python 3' },
    { id: '54', name: 'C++' },
    // Add more languages as needed
  ];

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

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

import React from 'react';
import Select from '../../../components/ui/Select';

const LanguageSelector = ({ selectedLanguage, onLanguageChange, className = '' }) => {
  const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'sql', label: 'SQL' },
    { value: 'bash', label: 'Bash' },
    { value: 'powershell', label: 'PowerShell' },
    { value: 'yaml', label: 'YAML' },
    { value: 'json', label: 'JSON' },
    { value: 'xml', label: 'XML' }
  ];

  return (
    <div className={className}>
      <Select
        label="Programming Language"
        placeholder="Select language"
        options={languageOptions}
        value={selectedLanguage}
        onChange={onLanguageChange}
        searchable
        className="w-full"
      />
    </div>
  );
};

export default LanguageSelector;
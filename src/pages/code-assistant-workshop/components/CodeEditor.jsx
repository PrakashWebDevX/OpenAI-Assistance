import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CodeEditor = ({ 
  code, 
  onCodeChange, 
  language = 'javascript', 
  placeholder = 'Enter your code here...',
  readOnly = false,
  showLineNumbers = true,
  className = ''
}) => {
  const [lineCount, setLineCount] = useState(1);
  const textareaRef = useRef(null);

  useEffect(() => {
    const lines = code?.split('\n')?.length;
    setLineCount(lines);
  }, [code]);

  const handleCodeChange = (e) => {
    if (!readOnly) {
      onCodeChange(e?.target?.value);
    }
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Tab') {
      e?.preventDefault();
      const start = e?.target?.selectionStart;
      const end = e?.target?.selectionEnd;
      const newCode = code?.substring(0, start) + '  ' + code?.substring(end);
      onCodeChange(newCode);
      
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard?.writeText(code);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const formatCode = () => {
    // Basic formatting for demonstration
    const formatted = code?.split('\n')?.map(line => line?.trim())?.join('\n');
    onCodeChange(formatted);
  };

  return (
    <div className={`relative bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="Code" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground capitalize">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!readOnly && (
            <Button
              variant="ghost"
              size="sm"
              onClick={formatCode}
              className="h-7 px-2"
            >
              <Icon name="AlignLeft" size={14} />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-7 px-2"
          >
            <Icon name="Copy" size={14} />
          </Button>
        </div>
      </div>
      {/* Editor */}
      <div className="relative flex">
        {/* Line numbers */}
        {showLineNumbers && (
          <div className="flex-shrink-0 bg-muted/50 px-3 py-4 text-right border-r border-border">
            {Array.from({ length: lineCount }, (_, i) => (
              <div
                key={i + 1}
                className="text-xs text-muted-foreground leading-6 font-mono"
              >
                {i + 1}
              </div>
            ))}
          </div>
        )}

        {/* Code area */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={handleCodeChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            readOnly={readOnly}
            className={`
              w-full h-64 md:h-80 p-4 bg-transparent text-sm font-mono
              text-foreground placeholder-muted-foreground
              resize-none outline-none leading-6
              ${readOnly ? 'cursor-default' : 'cursor-text'}
            `}
            style={{
              tabSize: 2,
              fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace'
            }}
          />
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-t border-border text-xs text-muted-foreground">
        <span>Lines: {lineCount}</span>
        <span>Characters: {code?.length}</span>
      </div>
    </div>
  );
};

export default CodeEditor;
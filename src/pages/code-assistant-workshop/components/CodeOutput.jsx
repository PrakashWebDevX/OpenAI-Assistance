import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import CodeEditor from './CodeEditor';

const CodeOutput = ({ 
  generatedCode, 
  explanation, 
  isLoading = false, 
  language = 'javascript',
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState('code');
  const [isExplanationExpanded, setIsExplanationExpanded] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard?.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadCode = () => {
    const fileExtensions = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      csharp: 'cs',
      php: 'php',
      ruby: 'rb',
      go: 'go',
      rust: 'rs',
      swift: 'swift',
      kotlin: 'kt',
      html: 'html',
      css: 'css',
      sql: 'sql',
      bash: 'sh',
      powershell: 'ps1',
      yaml: 'yml',
      json: 'json',
      xml: 'xml'
    };

    const extension = fileExtensions?.[language] || 'txt';
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-code.${extension}`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className={`bg-card border border-border rounded-lg p-8 ${className}`}>
        <div className="flex items-center justify-center space-y-4">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">
              AI is processing your code...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!generatedCode && !explanation) {
    return (
      <div className={`bg-card border border-border rounded-lg p-8 ${className}`}>
        <div className="text-center text-muted-foreground">
          <Icon name="Code" size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-sm">
            Generated code and explanations will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      {/* Header with tabs */}
      <div className="flex items-center justify-between border-b border-border">
        <div className="flex">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'code' ?'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Code" size={16} className="inline mr-2" />
            Generated Code
          </button>
          {explanation && (
            <button
              onClick={() => setActiveTab('explanation')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'explanation' ?'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="FileText" size={16} className="inline mr-2" />
              Explanation
            </button>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 px-4">
          {activeTab === 'code' && generatedCode && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(generatedCode)}
                iconName="Copy"
                className="h-8 px-3"
              >
                Copy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={downloadCode}
                iconName="Download"
                className="h-8 px-3"
              >
                Download
              </Button>
            </>
          )}
          {activeTab === 'explanation' && explanation && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(explanation)}
              iconName="Copy"
              className="h-8 px-3"
            >
              Copy
            </Button>
          )}
        </div>
      </div>
      {/* Content */}
      <div className="p-0">
        {activeTab === 'code' && generatedCode && (
          <CodeEditor
            code={generatedCode}
            onCodeChange={() => {}} // Read-only
            language={language}
            readOnly
            showLineNumbers={true}
            className="border-0 rounded-none"
          />
        )}

        {activeTab === 'explanation' && explanation && (
          <div className="p-6">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                {isExplanationExpanded ? explanation : explanation?.slice(0, 500)}
                {explanation?.length > 500 && (
                  <>
                    {!isExplanationExpanded && '...'}
                    <button
                      onClick={() => setIsExplanationExpanded(!isExplanationExpanded)}
                      className="ml-2 text-primary hover:text-primary/80 font-medium"
                    >
                      {isExplanationExpanded ? 'Show less' : 'Show more'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeOutput;
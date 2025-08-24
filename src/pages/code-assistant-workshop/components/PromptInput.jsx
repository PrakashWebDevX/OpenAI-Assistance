import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PromptInput = ({ onSubmit, isLoading = false, className = '' }) => {
  const [prompt, setPrompt] = useState('');

  const promptSuggestions = [
    'Explain this function',
    'Optimize for performance',
    'Add error handling',
    'Convert to TypeScript',
    'Add unit tests',
    'Refactor this code',
    'Fix bugs in this code',
    'Add comments and documentation'
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (prompt?.trim() && !isLoading) {
      onSubmit(prompt?.trim());
      setPrompt('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setPrompt(suggestion);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Prompt suggestions */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Quick Actions
        </label>
        <div className="flex flex-wrap gap-2">
          {promptSuggestions?.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-xs"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
      {/* Prompt input form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          label="Code Assistant Prompt"
          type="text"
          placeholder="Describe what you want to do with the code..."
          value={prompt}
          onChange={(e) => setPrompt(e?.target?.value)}
          description="Be specific about what you want the AI to do with your code"
          className="w-full"
        />

        <div className="flex items-center gap-3">
          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            disabled={!prompt?.trim() || isLoading}
            iconName="Send"
            iconPosition="right"
            className="flex-shrink-0"
          >
            {isLoading ? 'Processing...' : 'Generate'}
          </Button>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="Zap" size={14} />
            <span>2 credits per request</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;
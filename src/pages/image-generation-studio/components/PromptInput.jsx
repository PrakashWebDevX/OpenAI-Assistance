import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PromptInput = ({ onGenerate, isGenerating, credits }) => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const suggestionChips = [
    'photorealistic', 'digital art', 'oil painting', 'watercolor', 'anime style',
    'portrait', 'landscape', 'abstract', 'minimalist', 'vintage',
    'cyberpunk', 'fantasy', 'sci-fi', 'nature', 'architecture'
  ];

  const handleSuggestionClick = (suggestion) => {
    const newPrompt = prompt ? `${prompt}, ${suggestion}` : suggestion;
    setPrompt(newPrompt);
  };

  const handleGenerate = () => {
    if (prompt?.trim() && credits >= 5) {
      onGenerate({
        prompt: prompt?.trim(),
        negativePrompt: negativePrompt?.trim(),
        timestamp: new Date()?.toISOString()
      });
    }
  };

  const canGenerate = prompt?.trim()?.length > 0 && credits >= 5 && !isGenerating;

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Describe your image
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e?.target?.value)}
            placeholder="A majestic mountain landscape at sunset with golden light reflecting on a crystal clear lake..."
            className="w-full h-32 px-3 py-2 text-sm bg-input border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            maxLength={500}
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{prompt?.length}/500 characters</span>
            <span className="flex items-center gap-1">
              <Icon name="Zap" size={12} />
              5 credits per generation
            </span>
          </div>
        </div>

        {/* Suggestion chips */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Popular styles
          </label>
          <div className="flex flex-wrap gap-2">
            {suggestionChips?.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSuggestionClick(chip)}
                className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced options toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <Icon 
            name={showAdvanced ? "ChevronUp" : "ChevronDown"} 
            size={16} 
          />
          Advanced options
        </button>

        {/* Advanced options */}
        {showAdvanced && (
          <div className="space-y-4 pt-4 border-t border-border">
            <Input
              label="Negative prompt (optional)"
              type="text"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e?.target?.value)}
              placeholder="blurry, low quality, distorted..."
              description="Describe what you don't want in the image"
            />
          </div>
        )}
      </div>
      {/* Generate button */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleGenerate}
          disabled={!canGenerate}
          loading={isGenerating}
          iconName="Sparkles"
          iconPosition="left"
          className="flex-1"
        >
          {isGenerating ? 'Generating...' : 'Generate Image'}
        </Button>
        
        {credits < 5 && (
          <Button
            variant="outline"
            iconName="CreditCard"
            iconPosition="left"
            className="sm:w-auto"
          >
            Buy Credits
          </Button>
        )}
      </div>
      {/* Credit warning */}
      {credits < 5 && (
        <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/20 rounded-md">
          <Icon name="AlertTriangle" size={16} className="text-warning flex-shrink-0" />
          <p className="text-sm text-warning">
            Insufficient credits. You need 5 credits to generate an image.
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptInput;
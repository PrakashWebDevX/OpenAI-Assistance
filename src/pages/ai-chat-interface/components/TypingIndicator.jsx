import React from 'react';
import Icon from '../../../components/AppIcon';

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 mb-6">
      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
        <Icon name="Bot" size={16} color="white" />
      </div>
      
      <div className="bg-card border border-border px-4 py-3 rounded-2xl max-w-[200px]">
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">AI is typing</span>
          <div className="flex gap-1 ml-2">
            <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
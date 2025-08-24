import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatMessage = ({ message, onCopy, onRegenerate, onShare }) => {
  const isUser = message?.sender === 'user';
  
  const formatContent = (content) => {
    // Handle code blocks
    if (content?.includes('```')) {
      const parts = content?.split(/(```[\s\S]*?```)/g);
      return parts?.map((part, index) => {
        if (part?.startsWith('```')) {
          const code = part?.replace(/```(\w+)?\n?/, '')?.replace(/```$/, '');
          const language = part?.match(/```(\w+)/)?.[1] || '';
          return (
            <div key={index} className="my-3 bg-slate-900 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-800 text-slate-300 text-sm">
                <span>{language || 'code'}</span>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => navigator.clipboard?.writeText(code)}
                  className="text-slate-300 hover:text-white"
                >
                  <Icon name="Copy" size={14} />
                </Button>
              </div>
              <pre className="p-4 text-sm text-slate-100 overflow-x-auto">
                <code>{code}</code>
              </pre>
            </div>
          );
        }
        return <span key={index}>{part}</span>;
      });
    }
    
    // Handle line breaks
    return content?.split('\n')?.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content?.split('\n')?.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className={`flex gap-3 mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} color="white" />
        </div>
      )}
      <div className={`max-w-[80%] ${isUser ? 'order-first' : ''}`}>
        <div className={`
          px-4 py-3 rounded-2xl relative group
          ${isUser 
            ? 'bg-primary text-primary-foreground ml-auto' 
            : 'bg-card border border-border'
          }
        `}>
          <div className="text-sm leading-relaxed">
            {formatContent(message?.content)}
          </div>
          
          {message?.timestamp && (
            <div className={`
              text-xs mt-2 opacity-70
              ${isUser ? 'text-primary-foreground' : 'text-muted-foreground'}
            `}>
              {new Date(message.timestamp)?.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          )}
          
          {/* Message actions */}
          {!isUser && (
            <div className="absolute -bottom-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex items-center gap-1 bg-card border border-border rounded-lg px-2 py-1 elevation-1">
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onCopy(message?.content)}
                  className="h-6 w-6 p-0"
                >
                  <Icon name="Copy" size={12} />
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onRegenerate(message?.id)}
                  className="h-6 w-6 p-0"
                >
                  <Icon name="RotateCcw" size={12} />
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onShare(message?.content)}
                  className="h-6 w-6 p-0"
                >
                  <Icon name="Share" size={12} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {isUser && (
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="User" size={16} color="white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
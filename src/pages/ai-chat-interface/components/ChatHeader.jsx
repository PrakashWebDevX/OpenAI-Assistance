import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ 
  conversation, 
  onToggleSidebar, 
  onExportChat, 
  onClearChat, 
  onSettings,
  isStreaming = false 
}) => {
  const [showActions, setShowActions] = useState(false);

  const handleExport = (format) => {
    onExportChat(format);
    setShowActions(false);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Icon name="Menu" size={20} />
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Bot" size={16} color="white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              {conversation?.title || 'New Conversation'}
            </h1>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`} />
              <span className="text-xs text-muted-foreground">
                {isStreaming ? 'AI is responding...' : 'Ready to chat'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Export dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowActions(!showActions)}
            disabled={!conversation?.messages?.length}
          >
            <Icon name="Download" size={20} />
          </Button>

          {showActions && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowActions(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md elevation-2 z-50">
                <div className="py-1">
                  <button
                    onClick={() => handleExport('txt')}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <Icon name="FileText" size={16} />
                    Export as TXT
                  </button>
                  <button
                    onClick={() => handleExport('md')}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <Icon name="FileCode" size={16} />
                    Export as Markdown
                  </button>
                  <button
                    onClick={() => handleExport('json')}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <Icon name="Braces" size={16} />
                    Export as JSON
                  </button>
                  <div className="border-t border-border my-1" />
                  <button
                    onClick={onClearChat}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-error hover:bg-muted transition-colors"
                  >
                    <Icon name="Trash2" size={16} />
                    Clear Chat
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Settings */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onSettings}
        >
          <Icon name="Settings" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
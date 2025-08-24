import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatSidebar = ({ isOpen, onClose, conversations, currentConversation, onSelectConversation, onNewConversation, onDeleteConversation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);

  const templates = [
    {
      id: 1,
      title: "Code Review",
      prompt: "Please review this code and suggest improvements:",
      category: "Development"
    },
    {
      id: 2,
      title: "Email Draft",
      prompt: "Help me write a professional email about:",
      category: "Writing"
    },
    {
      id: 3,
      title: "Explain Concept",
      prompt: "Explain this concept in simple terms:",
      category: "Learning"
    },
    {
      id: 4,
      title: "Brainstorm Ideas",
      prompt: "Help me brainstorm creative ideas for:",
      category: "Creative"
    },
    {
      id: 5,
      title: "Debug Issue",
      prompt: "Help me debug this programming issue:",
      category: "Development"
    },
    {
      id: 6,
      title: "Meeting Summary",
      prompt: "Summarize the key points from this meeting:",
      category: "Business"
    }
  ];

  const filteredConversations = conversations?.filter(conv =>
    conv?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleTemplateSelect = (template) => {
    onNewConversation(template?.prompt);
    setShowTemplates(false);
  };

  const formatDate = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffTime = Math.abs(now - messageDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return messageDate?.toLocaleDateString();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-card border-r border-border z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative lg:top-0 lg:h-full
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Conversations</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* New conversation button */}
            <Button
              variant="default"
              onClick={() => onNewConversation()}
              className="w-full mb-3"
              iconName="Plus"
              iconPosition="left"
            >
              New Chat
            </Button>

            {/* Search */}
            <Input
              type="search"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="mb-3"
            />

            {/* Templates toggle */}
            <Button
              variant="ghost"
              onClick={() => setShowTemplates(!showTemplates)}
              className="w-full justify-between text-sm"
            >
              <span className="flex items-center gap-2">
                <Icon name="FileText" size={16} />
                Templates
              </span>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`transition-transform ${showTemplates ? 'rotate-180' : ''}`}
              />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {showTemplates ? (
              /* Templates */
              (<div className="p-4">
                <div className="space-y-2">
                  {templates?.map((template) => (
                    <button
                      key={template?.id}
                      onClick={() => handleTemplateSelect(template)}
                      className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-foreground group-hover:text-primary">
                            {template?.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {template?.prompt}
                          </p>
                          <span className="inline-block text-xs text-primary bg-primary/10 px-2 py-1 rounded mt-2">
                            {template?.category}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>)
            ) : (
              /* Conversations */
              (<div className="p-4">
                {filteredConversations?.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="MessageSquare" size={48} className="mx-auto text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground">
                      {searchQuery ? 'No conversations found' : 'No conversations yet'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {searchQuery ? 'Try a different search term' : 'Start a new chat to begin'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredConversations?.map((conversation) => (
                      <div
                        key={conversation?.id}
                        className={`
                          group relative p-3 rounded-lg cursor-pointer transition-colors
                          ${currentConversation?.id === conversation?.id 
                            ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted'
                          }
                        `}
                        onClick={() => onSelectConversation(conversation)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-foreground truncate">
                              {conversation?.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {conversation?.lastMessage}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-muted-foreground">
                                {formatDate(conversation?.updatedAt)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {conversation?.messageCount} messages
                              </span>
                            </div>
                          </div>
                          
                          {/* Delete button */}
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={(e) => {
                              e?.stopPropagation();
                              onDeleteConversation(conversation?.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-muted-foreground hover:text-error"
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>)
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="text-xs text-muted-foreground text-center">
              <p>AI Chat Interface</p>
              <p className="mt-1">Powered by Advanced AI</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
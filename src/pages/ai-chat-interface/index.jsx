import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ChatSidebar from './components/ChatSidebar';
import TypingIndicator from './components/TypingIndicator';
import UsageTracker from './components/UsageTracker';
import ChatHeader from './components/ChatHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { ChatService, OpenAIUtils } from '../../services/openai';

const AIChatInterface = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(null);
  const messagesEndRef = useRef(null);
  const [error, setError] = useState(null);

  // Mock data
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: "React Development Help",
      lastMessage: "How do I optimize React components for better performance?",
      updatedAt: new Date(Date.now() - 3600000),
      messageCount: 12,
      messages: [
        {
          id: 1,
          sender: 'user',
          content: "How do I optimize React components for better performance?",
          timestamp: new Date(Date.now() - 3600000)
        },
        {
          id: 2,
          sender: 'ai',
          content: `Here are several key strategies to optimize React components for better performance:\n\n**1. Use React.memo for Functional Components**\n\`\`\`jsx\nconst MyComponent = React.memo(({ name, age }) => {\n  return <div>{name} is {age} years old</div>;\n});\n\`\`\`\n\n**2. Implement useMemo and useCallback**\n- useMemo for expensive calculations\n- useCallback for function references\n\n**3. Code Splitting with React.lazy**\nSplit your bundle to load components only when needed.\n\n**4. Virtualization for Large Lists**\nUse libraries like react-window for rendering large datasets.\n\nWould you like me to elaborate on any of these techniques?`,
          timestamp: new Date(Date.now() - 3500000)
        }
      ]
    },
    {
      id: 2,
      title: "JavaScript Async/Await",
      lastMessage: "Can you explain the difference between Promises and async/await?",
      updatedAt: new Date(Date.now() - 7200000),
      messageCount: 8,
      messages: [
        {
          id: 1,
          sender: 'user',
          content: "Can you explain the difference between Promises and async/await?",
          timestamp: new Date(Date.now() - 7200000)
        },
        {
          id: 2,
          sender: 'ai',
          content: `Great question! Both Promises and async/await handle asynchronous operations, but they have different syntax and use cases:\n\n**Promises:**\n\`\`\`javascript\nfetch('/api/data')\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(error));\n\`\`\`\n\n**Async/Await:**\n\`\`\`javascript\nasync function fetchData() {\n  try {\n    const response = await fetch('/api/data');\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error(error);\n  }\n}\n\`\`\`\n\n**Key Differences:**\n- async/await provides cleaner, more readable code\n- Better error handling with try/catch\n- Easier debugging and stack traces\n- async/await is built on top of Promises`,
          timestamp: new Date(Date.now() - 7100000)
        }
      ]
    },
    {
      id: 3,
      title: "CSS Grid Layout",
      lastMessage: "Help me create a responsive grid layout",
      updatedAt: new Date(Date.now() - 86400000),
      messageCount: 15,
      messages: [
        {
          id: 1,
          sender: 'user',
          content: "Help me create a responsive grid layout",
          timestamp: new Date(Date.now() - 86400000)
        }
      ]
    }
  ]);

  const [usageData] = useState({
    credits: 750,
    totalCredits: 1000,
    plan: 'Pro'
  });

  useEffect(() => {
    if (conversations?.length > 0 && !currentConversation) {
      setCurrentConversation(conversations?.[0]);
    }
  }, [conversations, currentConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages, isStreaming]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (message) => {
    if (!currentConversation) {
      // Create new conversation
      const newConversation = {
        id: Date.now(),
        title: message?.slice(0, 50) + (message?.length > 50 ? '...' : ''),
        lastMessage: message,
        updatedAt: new Date(),
        messageCount: 1,
        messages: [
          {
            id: Date.now(),
            sender: 'user',
            content: message,
            timestamp: new Date()
          }
        ]
      };
      
      setConversations(prev => [newConversation, ...prev]);
      setCurrentConversation(newConversation);
    } else {
      // Add message to current conversation
      const userMessage = {
        id: Date.now(),
        sender: 'user',
        content: message,
        timestamp: new Date()
      };

      setCurrentConversation(prev => ({
        ...prev,
        messages: [...prev?.messages, userMessage],
        lastMessage: message,
        updatedAt: new Date(),
        messageCount: prev?.messageCount + 1
      }));

      // Update conversations list
      setConversations(prev => 
        prev?.map(conv => 
          conv?.id === currentConversation?.id 
            ? { ...conv, lastMessage: message, updatedAt: new Date(), messageCount: conv?.messageCount + 1 }
            : conv
        )
      );
    }

    // Generate AI response using OpenAI
    setIsStreaming(true);
    setError(null);

    try {
      // Check if OpenAI is configured
      if (!OpenAIUtils?.isConfigured()) {
        throw new Error('OpenAI API key is not configured');
      }

      // Prepare messages for OpenAI
      const messages = [
        { role: 'system', content: 'You are a helpful AI assistant. Provide clear, concise, and helpful responses to user questions.' },
        ...(currentConversation?.messages || [])?.map(msg => ({
          role: msg?.sender === 'user' ? 'user' : 'assistant',
          content: msg?.content
        })),
        { role: 'user', content: message }
      ];

      let aiResponse = '';
      const aiMessageId = Date.now() + 1;

      // Create placeholder message for streaming
      const placeholderMessage = {
        id: aiMessageId,
        sender: 'ai',
        content: '',
        timestamp: new Date()
      };

      setCurrentConversation(prev => ({
        ...prev,
        messages: [...prev?.messages, placeholderMessage],
        messageCount: prev?.messageCount + 1
      }));

      // Stream response
      await ChatService?.getStreamingChatCompletion(
        messages,
        (chunk) => {
          aiResponse += chunk;
          setCurrentConversation(prev => ({
            ...prev,
            messages: prev?.messages?.map(msg =>
              msg?.id === aiMessageId
                ? { ...msg, content: aiResponse }
                : msg
            )
          }));
        },
        { temperature: 0.7, max_tokens: 1000 }
      );

      setIsStreaming(false);
    } catch (error) {
      console.error('Error generating AI response:', error);
      setError(OpenAIUtils?.formatError(error));
      setIsStreaming(false);

      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        content: `I'm sorry, I'm having trouble responding right now. ${OpenAIUtils?.formatError(error)}`,
        timestamp: new Date(),
        isError: true
      };

      setCurrentConversation(prev => ({
        ...prev,
        messages: [...prev?.messages, errorMessage],
        messageCount: prev?.messageCount + 1
      }));
    }
  };

  const handleVoiceRecord = (isRecording) => {
    console.log('Voice recording:', isRecording);
    // Implement voice recording logic
  };

  const handleFileUpload = (files) => {
    console.log('Files uploaded:', files);
    // Implement file upload logic
  };

  const handleCopyMessage = (content) => {
    navigator.clipboard?.writeText(content);
    // Show toast notification
  };

  const handleRegenerateMessage = (messageId) => {
    console.log('Regenerate message:', messageId);
    // Implement message regeneration
  };

  const handleShareMessage = (content) => {
    if (navigator.share) {
      navigator.share({
        title: 'AI Chat Message',
        text: content
      });
    } else {
      navigator.clipboard?.writeText(content);
    }
  };

  const handleNewConversation = (initialPrompt = '') => {
    setCurrentConversation(null);
    setChatSidebarOpen(false);
    if (initialPrompt) {
      setTimeout(() => handleSendMessage(initialPrompt), 100);
    }
  };

  const handleSelectConversation = (conversation) => {
    setCurrentConversation(conversation);
    setChatSidebarOpen(false);
  };

  const handleDeleteConversation = (conversationId) => {
    setConversations(prev => prev?.filter(conv => conv?.id !== conversationId));
    if (currentConversation?.id === conversationId) {
      setCurrentConversation(conversations?.find(conv => conv?.id !== conversationId) || null);
    }
  };

  const handleExportChat = (format) => {
    if (!currentConversation?.messages) return;

    const messages = currentConversation?.messages;
    let content = '';

    switch (format) {
      case 'txt':
        content = messages?.map(msg => 
          `${msg?.sender?.toUpperCase()}: ${msg?.content}\n${new Date(msg.timestamp)?.toLocaleString()}\n\n`
        )?.join('');
        break;
      case 'md':
        content = `# ${currentConversation?.title}\n\n` + 
          messages?.map(msg => 
            `## ${msg?.sender === 'user' ? 'You' : 'AI Assistant'}\n${msg?.content}\n\n*${new Date(msg.timestamp)?.toLocaleString()}*\n\n`
          )?.join('');
        break;
      case 'json':
        content = JSON.stringify(currentConversation, null, 2);
        break;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${currentConversation?.id}.${format}`;
    a?.click();
    URL.revokeObjectURL(url);
  };

  const handleClearChat = () => {
    if (currentConversation) {
      setCurrentConversation({
        ...currentConversation,
        messages: [],
        messageCount: 0
      });
    }
  };

  const handleSettings = () => {
    console.log('Open chat settings');
    // Implement settings modal
  };

  const handleUpgrade = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isCollapsed={false}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <Sidebar 
        isCollapsed={false}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="lg:ml-60 pt-16">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Chat Sidebar */}
          <ChatSidebar
            isOpen={chatSidebarOpen}
            onClose={() => setChatSidebarOpen(false)}
            conversations={conversations}
            currentConversation={currentConversation}
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
            onDeleteConversation={handleDeleteConversation}
          />

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col lg:ml-80">
            {/* Chat Header */}
            <ChatHeader
              conversation={currentConversation}
              onToggleSidebar={() => setChatSidebarOpen(!chatSidebarOpen)}
              onExportChat={handleExportChat}
              onClearChat={handleClearChat}
              onSettings={handleSettings}
              isStreaming={isStreaming}
            />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto">
              {currentConversation?.messages?.length > 0 ? (
                <div className="p-4 space-y-4">
                  {currentConversation?.messages?.map((message) => (
                    <ChatMessage
                      key={message?.id}
                      message={message}
                      onCopy={handleCopyMessage}
                      onRegenerate={handleRegenerateMessage}
                      onShare={handleShareMessage}
                    />
                  ))}
                  
                  {isStreaming && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                /* Welcome Screen */
                (<div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center max-w-md">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon name="MessageSquare" size={32} color="white" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Welcome to AI Chat
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Start a conversation with our AI assistant. Ask questions, get help with coding, writing, or any other task you need assistance with.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <Button
                        variant="outline"
                        onClick={() => handleSendMessage("Help me write a professional email")}
                        className="text-left p-3 h-auto"
                      >
                        <div>
                          <Icon name="Mail" size={16} className="mb-1" />
                          <div className="text-xs">Write Email</div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleSendMessage("Explain React hooks to me")}
                        className="text-left p-3 h-auto"
                      >
                        <div>
                          <Icon name="Code" size={16} className="mb-1" />
                          <div className="text-xs">Learn Code</div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleSendMessage("Help me brainstorm ideas for my project")}
                        className="text-left p-3 h-auto"
                      >
                        <div>
                          <Icon name="Lightbulb" size={16} className="mb-1" />
                          <div className="text-xs">Brainstorm</div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleSendMessage("Summarize this article for me")}
                        className="text-left p-3 h-auto"
                      >
                        <div>
                          <Icon name="FileText" size={16} className="mb-1" />
                          <div className="text-xs">Summarize</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>)
              )}
            </div>

            {/* Usage Tracker - Mobile */}
            <div className="lg:hidden p-4 border-t border-border">
              <UsageTracker
                credits={usageData?.credits}
                totalCredits={usageData?.totalCredits}
                plan={usageData?.plan}
                onUpgrade={handleUpgrade}
              />
            </div>

            {/* Chat Input */}
            <ChatInput
              onSendMessage={handleSendMessage}
              onVoiceRecord={handleVoiceRecord}
              onFileUpload={handleFileUpload}
              disabled={isStreaming}
            />
          </div>

          {/* Usage Tracker - Desktop */}
          <div className="hidden lg:block w-80 border-l border-border p-4">
            <UsageTracker
              credits={usageData?.credits}
              totalCredits={usageData?.totalCredits}
              plan={usageData?.plan}
              onUpgrade={handleUpgrade}
            />
            
            {/* Quick Stats */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium text-foreground mb-3">Session Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Messages sent</span>
                  <span className="text-foreground font-medium">
                    {currentConversation?.messages?.filter(m => m?.sender === 'user')?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">AI responses</span>
                  <span className="text-foreground font-medium">
                    {currentConversation?.messages?.filter(m => m?.sender === 'ai')?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total conversations</span>
                  <span className="text-foreground font-medium">{conversations?.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="fixed top-20 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md shadow-md z-50">
          <div className="flex items-center gap-2">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm">{error}</span>
            <button onClick={() => setError(null)} className="ml-2">
              <Icon name="X" size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatInterface;
import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, onVoiceRecord, onFileUpload, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const textareaRef = useRef(null);
  const recordingIntervalRef = useRef(null);

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef?.current?.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setRecordingTime(0);
      if (recordingIntervalRef?.current) {
        clearInterval(recordingIntervalRef?.current);
      }
      onVoiceRecord(false);
    } else {
      // Start recording
      setIsRecording(true);
      setRecordingTime(0);
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      onVoiceRecord(true);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    if (files?.length > 0) {
      onFileUpload(files);
    }
    e.target.value = '';
  };

  const formatRecordingTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="border-t border-border bg-card p-4">
      {/* Recording indicator */}
      {isRecording && (
        <div className="flex items-center justify-center gap-2 mb-3 text-error">
          <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
          <span className="text-sm font-medium">
            Recording: {formatRecordingTime(recordingTime)}
          </span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        {/* File upload */}
        <div className="relative">
          <input
            type="file"
            id="file-upload"
            multiple
            accept=".txt,.pdf,.doc,.docx,.md"
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={disabled}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="Paperclip" size={20} />
          </Button>
        </div>

        {/* Message input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            onKeyPress={handleKeyPress}
            placeholder={isRecording ? "Recording voice message..." : "Type your message..."}
            disabled={disabled || isRecording}
            className="w-full px-4 py-3 pr-12 bg-muted border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
            rows="1"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          
          {/* Character count */}
          {message?.length > 0 && (
            <div className="absolute -bottom-5 right-0 text-xs text-muted-foreground">
              {message?.length}/2000
            </div>
          )}
        </div>

        {/* Voice recording */}
        <Button
          type="button"
          variant={isRecording ? "destructive" : "ghost"}
          size="icon"
          onClick={handleVoiceToggle}
          disabled={disabled}
          className={isRecording ? "animate-pulse" : "text-muted-foreground hover:text-foreground"}
        >
          <Icon name={isRecording ? "Square" : "Mic"} size={20} />
        </Button>

        {/* Send button */}
        <Button
          type="submit"
          variant="default"
          size="icon"
          disabled={disabled || !message?.trim() || isRecording}
          className="bg-primary hover:bg-primary/90"
        >
          <Icon name="Send" size={20} />
        </Button>
      </form>
      {/* Quick actions */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-xs text-muted-foreground">Quick actions:</span>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => setMessage("Explain this concept: ")}
          disabled={disabled}
          className="text-xs"
        >
          Explain
        </Button>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => setMessage("Summarize: ")}
          disabled={disabled}
          className="text-xs"
        >
          Summarize
        </Button>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => setMessage("Write code for: ")}
          disabled={disabled}
          className="text-xs"
        >
          Code
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LanguageSelector from './components/LanguageSelector';
import CodeEditor from './components/CodeEditor';
import PromptInput from './components/PromptInput';
import CodeOutput from './components/CodeOutput';
import CodeTemplates from './components/CodeTemplates';
import UsageTracker from './components/UsageTracker';
import RecentHistory from './components/RecentHistory';
import { CodeService, OpenAIUtils } from '../../services/openai';

const CodeAssistantWorkshop = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [inputCode, setInputCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activePanel, setActivePanel] = useState('editor');
  const [error, setError] = useState(null);

  const handlePromptSubmit = async (prompt) => {
    if (!inputCode?.trim()) {
      alert('Please enter some code first');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Check if OpenAI is configured
      if (!OpenAIUtils?.isConfigured()) {
        throw new Error('OpenAI API key is not configured');
      }

      let result;
      const promptLower = prompt?.toLowerCase();

      // Determine the type of request and call appropriate service
      if (promptLower?.includes('explain')) {
        result = await CodeService?.explainCode(inputCode, selectedLanguage);
      } else if (promptLower?.includes('optimize') || promptLower?.includes('performance')) {
        result = await CodeService?.optimizeCode(inputCode, selectedLanguage);
      } else if (promptLower?.includes('error') || promptLower?.includes('handling')) {
        result = await CodeService?.addErrorHandling(inputCode, selectedLanguage);
      } else {
        // Generic code processing
        result = await CodeService?.processCode(prompt, inputCode, selectedLanguage);
      }
      
      setGeneratedCode(result?.code || '');
      setExplanation(result?.explanation || '');
    } catch (error) {
      console.error('Error processing code:', error);
      setError(OpenAIUtils?.formatError(error));
      
      // Set fallback response
      setGeneratedCode('// Error generating code response');
      setExplanation(`Error: ${OpenAIUtils?.formatError(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateSelect = (template) => {
    setInputCode(template?.code);
    setSelectedLanguage(template?.language);
    setGeneratedCode('');
    setExplanation('');
  };

  const handleHistorySelect = (historyItem) => {
    setInputCode(historyItem?.preview);
    setSelectedLanguage(historyItem?.language);
    setGeneratedCode('');
    setExplanation('');
  };

  const clearEditor = () => {
    setInputCode('');
    setGeneratedCode('');
    setExplanation('');
  };

  const panels = [
    { id: 'editor', label: 'Code Editor', icon: 'Code' },
    { id: 'templates', label: 'Templates', icon: 'FileCode' },
    { id: 'history', label: 'History', icon: 'History' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      <Header 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
      />
      <main className="lg:ml-60 pt-16">
        <div className="p-4 lg:p-6">
          {/* Page header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Code" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Code Assistant Workshop
                </h1>
                <p className="text-muted-foreground">
                  AI-powered coding support for generation, debugging, and optimization
                </p>
              </div>
            </div>
          </div>

          {/* Main layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left panel - Input and controls */}
            <div className="xl:col-span-2 space-y-6">
              {/* Panel tabs for mobile */}
              <div className="xl:hidden">
                <div className="flex border-b border-border">
                  {panels?.map(panel => (
                    <button
                      key={panel?.id}
                      onClick={() => setActivePanel(panel?.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activePanel === panel?.id
                          ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon name={panel?.icon} size={16} />
                      {panel?.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language selector */}
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />

              {/* Code editor panel */}
              {(activePanel === 'editor' || window.innerWidth >= 1280) && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">
                      Input Code
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearEditor}
                      iconName="Trash2"
                      className="text-xs"
                    >
                      Clear
                    </Button>
                  </div>
                  
                  <CodeEditor
                    code={inputCode}
                    onCodeChange={setInputCode}
                    language={selectedLanguage}
                    placeholder={`Enter your ${selectedLanguage} code here...`}
                  />

                  <PromptInput
                    onSubmit={handlePromptSubmit}
                    isLoading={isLoading}
                  />
                </div>
              )}

              {/* Templates panel */}
              {(activePanel === 'templates' || window.innerWidth >= 1280) && (
                <div className="xl:hidden">
                  <CodeTemplates onTemplateSelect={handleTemplateSelect} />
                </div>
              )}

              {/* History panel */}
              {(activePanel === 'history' || window.innerWidth >= 1280) && (
                <div className="xl:hidden">
                  <RecentHistory onHistorySelect={handleHistorySelect} />
                </div>
              )}
            </div>

            {/* Center panel - Output */}
            <div className="xl:col-span-1">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">
                  AI Response
                </h2>
                <CodeOutput
                  generatedCode={generatedCode}
                  explanation={explanation}
                  isLoading={isLoading}
                  language={selectedLanguage}
                />
              </div>
            </div>

            {/* Right panel - Templates, History, Usage */}
            <div className="hidden xl:block xl:col-span-1 space-y-6">
              <UsageTracker />
              <CodeTemplates onTemplateSelect={handleTemplateSelect} />
              <RecentHistory onHistorySelect={handleHistorySelect} />
            </div>
          </div>

          {/* Mobile usage tracker */}
          <div className="xl:hidden mt-6">
            <UsageTracker />
          </div>

          {/* Quick tips */}
          <div className="mt-8 bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Quick Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Icon name="Lightbulb" size={16} className="text-primary mt-1" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">
                    Be Specific
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Provide clear, specific prompts for better AI responses powered by OpenAI
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Code" size={16} className="text-primary mt-1" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">
                    Include Context
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Add comments or context to help AI understand your code better
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Zap" size={16} className="text-primary mt-1" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">
                    Try Different Prompts
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Use "explain", "optimize", or "add error handling" for specific results
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="History" size={16} className="text-primary mt-1" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">
                    Review Generated Code
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Always review and test AI-generated code before using in production
                  </p>
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
      </main>
    </div>
  );
};

export default CodeAssistantWorkshop;
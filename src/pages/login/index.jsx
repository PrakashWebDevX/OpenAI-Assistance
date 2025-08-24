import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFooter from './components/LoginFooter';
import LoadingOverlay from './components/LoadingOverlay';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
      return;
    }

    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (isInitialLoading) {
    return (
      <LoadingOverlay 
        isVisible={true} 
        message="Loading AI Assistant Platform..." 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <LoginHeader />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-4">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              AI-Powered Platform
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Welcome to the Future
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-sm mx-auto">
              Access powerful AI tools for chat, image generation, code assistance, and more in one unified platform.
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Features Preview */}
          <div className="mt-8 grid grid-cols-2 gap-4 text-center">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-primary text-lg">🤖</span>
              </div>
              <h3 className="text-xs font-medium text-foreground mb-1">AI Chat</h3>
              <p className="text-xs text-muted-foreground">Intelligent conversations</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-accent text-lg">🎨</span>
              </div>
              <h3 className="text-xs font-medium text-foreground mb-1">Image Studio</h3>
              <p className="text-xs text-muted-foreground">Create stunning visuals</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <LoginFooter />
    </div>
  );
};

export default LoginPage;
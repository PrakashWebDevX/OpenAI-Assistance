import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Icon name="Zap" size={24} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">
                AI Assistant
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Powered by Intelligence
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden sm:flex items-center gap-6">
            <button
              onClick={() => navigate('/register')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Dashboard
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="sm:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="Menu" size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, isOpen = false, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [usageData] = useState({
    credits: 750,
    totalCredits: 1000,
    plan: 'Pro'
  });

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview and analytics'
    },
    {
      label: 'AI Chat',
      path: '/ai-chat-interface',
      icon: 'MessageSquare',
      description: 'Conversational AI assistant',
      creditCost: 1
    },
    {
      label: 'Image Studio',
      path: '/image-generation-studio',
      icon: 'Image',
      description: 'AI-powered image generation',
      creditCost: 5
    },
    {
      label: 'Code Assistant',
      path: '/code-assistant-workshop',
      icon: 'Code',
      description: 'Programming support and generation',
      creditCost: 2
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const getUsagePercentage = () => {
    return ((usageData?.totalCredits - usageData?.credits) / usageData?.totalCredits) * 100;
  };

  const getUsageColor = () => {
    const percentage = getUsagePercentage();
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 75) return 'bg-warning';
    return 'bg-primary';
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-100 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-60 bg-card border-r border-border z-150
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo and brand */}
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                AI Assistant
              </span>
              <span className="text-xs text-muted-foreground">
                Platform
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems?.map((item) => {
              const isActive = location?.pathname === item?.path;
              
              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left
                    transition-all duration-200 group
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                >
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    className={`flex-shrink-0 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate">
                        {item?.label}
                      </span>
                      {item?.creditCost && (
                        <span className={`
                          text-xs px-1.5 py-0.5 rounded
                          ${isActive 
                            ? 'bg-primary-foreground/20 text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                          }
                        `}>
                          {item?.creditCost}c
                        </span>
                      )}
                    </div>
                    <p className={`
                      text-xs truncate mt-0.5
                      ${isActive 
                        ? 'text-primary-foreground/80' 
                        : 'text-muted-foreground'
                      }
                    `}>
                      {item?.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Usage tracking widget */}
          <div className="p-4 border-t border-border">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-foreground">
                  Credits Used
                </span>
                <span className="text-xs text-muted-foreground">
                  {usageData?.plan}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">
                  {usageData?.totalCredits - usageData?.credits} / {usageData?.totalCredits}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-primary hover:text-primary"
                >
                  Upgrade
                </Button>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-border rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getUsageColor()}`}
                  style={{ width: `${getUsagePercentage()}%` }}
                />
              </div>

              <p className="text-xs text-muted-foreground mt-2">
                {usageData?.credits} credits remaining
              </p>
            </div>
          </div>

          {/* Service status indicator */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-gentle" />
              <span>All services operational</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
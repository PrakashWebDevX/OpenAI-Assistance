import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ isCollapsed = false, onToggleSidebar }) => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getPageTitle = () => {
    const path = location?.pathname;
    switch (path) {
      case '/dashboard':
        return 'Dashboard';
      case '/ai-chat-interface':
        return 'AI Chat';
      case '/image-generation-studio':
        return 'Image Studio';
      case '/code-assistant-workshop':
        return 'Code Assistant';
      default:
        return 'AI Assistant Platform';
    }
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logout clicked');
    setIsProfileOpen(false);
  };

  const handleSettings = () => {
    // Handle settings navigation
    console.log('Settings clicked');
    setIsProfileOpen(false);
  };

  const handleProfile = () => {
    // Handle profile navigation
    console.log('Profile clicked');
    setIsProfileOpen(false);
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-60 h-16 bg-card border-b border-border z-100 transition-all duration-300">
      <div className="flex items-center justify-between h-full px-6">
        {/* Mobile menu toggle and title */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onToggleSidebar}
          >
            <Icon name="Menu" size={20} />
          </Button>
          <h1 className="text-lg font-medium text-foreground">
            {getPageTitle()}
          </h1>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Command palette trigger */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Icon name="Search" size={16} />
            <span className="text-sm">Search</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full"></span>
          </Button>

          {/* User profile dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 hover:bg-muted"
              onClick={handleProfileToggle}
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden md:block text-sm font-medium">
                John Doe
              </span>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}
              />
            </Button>

            {/* Dropdown menu */}
            {isProfileOpen && (
              <>
                <div 
                  className="fixed inset-0 z-150" 
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-md elevation-2 z-200">
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium text-foreground">John Doe</p>
                    <p className="text-xs text-muted-foreground">john@example.com</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={handleProfile}
                      className="flex items-center gap-3 w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="User" size={16} />
                      Profile
                    </button>
                    <button
                      onClick={handleSettings}
                      className="flex items-center gap-3 w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="Settings" size={16} />
                      Settings
                    </button>
                    <div className="border-t border-border my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-3 py-2 text-sm text-error hover:bg-muted transition-colors"
                    >
                      <Icon name="LogOut" size={16} />
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
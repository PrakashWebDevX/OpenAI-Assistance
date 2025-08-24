import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingOverlay = ({ isVisible, message = "Signing you in..." }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border border-border rounded-lg elevation-3 p-6 max-w-sm mx-4">
        <div className="flex flex-col items-center text-center">
          {/* Animated Loading Icon */}
          <div className="relative mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon 
                name="Loader2" 
                size={24} 
                className="text-primary animate-spin" 
              />
            </div>
            <div className="absolute inset-0 w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>

          {/* Loading Message */}
          <h3 className="text-sm font-medium text-foreground mb-2">
            {message}
          </h3>
          <p className="text-xs text-muted-foreground">
            Please wait while we authenticate your account
          </p>

          {/* Progress Dots */}
          <div className="flex items-center gap-1 mt-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
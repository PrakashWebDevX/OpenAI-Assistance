import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UsageTracker = ({ credits, totalCredits, plan, onUpgrade }) => {
  const usagePercentage = ((totalCredits - credits) / totalCredits) * 100;
  
  const getUsageColor = () => {
    if (usagePercentage >= 90) return 'bg-error';
    if (usagePercentage >= 75) return 'bg-warning';
    return 'bg-primary';
  };

  const getUsageStatus = () => {
    if (usagePercentage >= 90) return { color: 'text-error', message: 'Almost depleted' };
    if (usagePercentage >= 75) return { color: 'text-warning', message: 'Running low' };
    return { color: 'text-success', message: 'Good usage' };
  };

  const status = getUsageStatus();

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon name="Zap" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Credits Usage</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{plan} Plan</span>
          <Button
            variant="ghost"
            size="xs"
            onClick={onUpgrade}
            className="text-primary hover:text-primary"
          >
            Upgrade
          </Button>
        </div>
      </div>
      {/* Usage bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {totalCredits - credits} / {totalCredits}
          </span>
          <span className={`text-xs font-medium ${status?.color}`}>
            {status?.message}
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getUsageColor()}`}
            style={{ width: `${usagePercentage}%` }}
          />
        </div>
      </div>
      {/* Credits remaining */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {credits} credits remaining
        </span>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Icon name="Clock" size={12} />
          <span className="text-xs">Resets monthly</span>
        </div>
      </div>
      {/* Low credits warning */}
      {usagePercentage >= 85 && (
        <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded-md">
          <div className="flex items-center gap-2">
            <Icon name="AlertTriangle" size={14} className="text-warning" />
            <span className="text-xs text-warning font-medium">
              Low credits remaining. Consider upgrading your plan.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsageTracker;
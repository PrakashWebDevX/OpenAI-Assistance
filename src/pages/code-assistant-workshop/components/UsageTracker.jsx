import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UsageTracker = ({ className = '' }) => {
  const usageData = {
    creditsUsed: 245,
    totalCredits: 1000,
    requestsToday: 12,
    requestsThisMonth: 89,
    plan: 'Pro',
    resetDate: '2025-09-24'
  };

  const getUsagePercentage = () => {
    return (usageData?.creditsUsed / usageData?.totalCredits) * 100;
  };

  const getUsageColor = () => {
    const percentage = getUsagePercentage();
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 75) return 'bg-warning';
    return 'bg-primary';
  };

  const getRemainingCredits = () => {
    return usageData?.totalCredits - usageData?.creditsUsed;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Usage Tracking</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Icon name="Zap" size={12} />
          <span>{usageData?.plan} Plan</span>
        </div>
      </div>
      {/* Credits usage */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Credits Used</span>
          <span className="text-sm font-medium text-foreground">
            {usageData?.creditsUsed} / {usageData?.totalCredits}
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getUsageColor()}`}
            style={{ width: `${getUsagePercentage()}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{getRemainingCredits()} credits remaining</span>
          <span>{getUsagePercentage()?.toFixed(1)}% used</span>
        </div>
      </div>
      {/* Request statistics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {usageData?.requestsToday}
          </div>
          <div className="text-xs text-muted-foreground">Today</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {usageData?.requestsThisMonth}
          </div>
          <div className="text-xs text-muted-foreground">This Month</div>
        </div>
      </div>
      {/* Cost breakdown */}
      <div className="space-y-2 mb-4 p-3 bg-muted/50 rounded-lg">
        <div className="text-xs font-medium text-foreground mb-2">Credit Costs:</div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Code Generation</span>
            <span>2 credits</span>
          </div>
          <div className="flex justify-between">
            <span>Code Explanation</span>
            <span>1 credit</span>
          </div>
          <div className="flex justify-between">
            <span>Code Review</span>
            <span>3 credits</span>
          </div>
          <div className="flex justify-between">
            <span>Bug Fixing</span>
            <span>2 credits</span>
          </div>
        </div>
      </div>
      {/* Reset information */}
      <div className="text-xs text-muted-foreground mb-4">
        Credits reset on {new Date(usageData.resetDate)?.toLocaleDateString()}
      </div>
      {/* Action buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-xs"
          iconName="BarChart3"
        >
          View Details
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex-1 text-xs"
          iconName="CreditCard"
        >
          Upgrade Plan
        </Button>
      </div>
    </div>
  );
};

export default UsageTracker;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UsageSummary = ({ 
  creditsUsed, 
  totalCredits, 
  subscriptionTier, 
  renewalDate, 
  isNearLimit = false 
}) => {
  const creditsRemaining = totalCredits - creditsUsed;
  const usagePercentage = (creditsUsed / totalCredits) * 100;
  
  const getUsageColor = () => {
    if (usagePercentage >= 90) return 'bg-error';
    if (usagePercentage >= 75) return 'bg-warning';
    return 'bg-primary';
  };

  const getStatusIcon = () => {
    if (usagePercentage >= 90) return 'AlertTriangle';
    if (usagePercentage >= 75) return 'AlertCircle';
    return 'CheckCircle';
  };

  const getStatusColor = () => {
    if (usagePercentage >= 90) return 'text-error';
    if (usagePercentage >= 75) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Usage Summary</h3>
            <p className="text-sm text-muted-foreground">{subscriptionTier} Plan</p>
          </div>
        </div>
        <div className={`flex items-center gap-2 ${getStatusColor()}`}>
          <Icon name={getStatusIcon()} size={16} />
          <span className="text-sm font-medium">
            {usagePercentage >= 90 ? 'Critical' : usagePercentage >= 75 ? 'Warning' : 'Healthy'}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Credits Used</span>
            <span className="text-sm font-semibold text-foreground">
              {creditsUsed?.toLocaleString()} / {totalCredits?.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${getUsageColor()}`}
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {creditsRemaining?.toLocaleString()} credits remaining
          </p>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-border">
          <div>
            <p className="text-sm font-medium text-foreground">Next Renewal</p>
            <p className="text-xs text-muted-foreground">{renewalDate}</p>
          </div>
          <Button 
            variant={isNearLimit ? "default" : "outline"} 
            size="sm"
            iconName="ArrowUp"
            iconPosition="left"
            iconSize={16}
          >
            {isNearLimit ? 'Upgrade Now' : 'Upgrade Plan'}
          </Button>
        </div>

        {isNearLimit && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning">Usage Alert</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You're approaching your monthly limit. Consider upgrading to avoid service interruption.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsageSummary;
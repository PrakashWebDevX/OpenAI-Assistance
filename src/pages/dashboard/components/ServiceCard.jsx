import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  route, 
  creditCost, 
  usageCount, 
  maxUsage, 
  bgGradient,
  isPopular = false 
}) => {
  const navigate = useNavigate();
  
  const usagePercentage = maxUsage > 0 ? (usageCount / maxUsage) * 100 : 0;
  
  const getUsageColor = () => {
    if (usagePercentage >= 90) return 'bg-error';
    if (usagePercentage >= 75) return 'bg-warning';
    return 'bg-primary';
  };

  const handleServiceClick = () => {
    navigate(route);
  };

  return (
    <div className={`relative bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer ${bgGradient}`}
         onClick={handleServiceClick}>
      {isPopular && (
        <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
          Popular
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bgGradient || 'bg-primary'} group-hover:scale-110 transition-transform duration-300`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        <div className="text-right">
          <span className="text-xs text-muted-foreground">Cost per use</span>
          <p className="text-sm font-semibold text-foreground">{creditCost}c</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {maxUsage > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Usage this month</span>
            <span className="text-xs font-medium text-foreground">
              {usageCount} / {maxUsage}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getUsageColor()}`}
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </div>
        </div>
      )}

      <Button 
        variant="ghost" 
        size="sm" 
        className="w-full justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
        iconName="ArrowRight"
        iconPosition="right"
        iconSize={16}
      >
        Launch Service
      </Button>
    </div>
  );
};

export default ServiceCard;
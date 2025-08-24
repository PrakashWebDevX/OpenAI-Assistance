import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ activities = [] }) => {
  const navigate = useNavigate();

  const getActivityIcon = (type) => {
    switch (type) {
      case 'chat': return 'MessageSquare';
      case 'image': return 'Image';
      case 'code': return 'Code';
      case 'voice': return 'Mic';
      case 'translation': return 'Languages';
      case 'document': return 'FileText';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'chat': return 'bg-blue-500';
      case 'image': return 'bg-purple-500';
      case 'code': return 'bg-green-500';
      case 'voice': return 'bg-orange-500';
      case 'translation': return 'bg-pink-500';
      case 'document': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleActivityClick = (activity) => {
    if (activity?.route) {
      navigate(activity?.route);
    }
  };

  const handleViewAll = () => {
    // Navigate to activity history page
    console.log('View all activities');
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">Your latest AI interactions</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleViewAll}
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={14}
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
            <p className="text-xs text-muted-foreground mt-1">
              Start using AI services to see your activity here
            </p>
          </div>
        ) : (
          activities?.map((activity) => (
            <div 
              key={activity?.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
              onClick={() => handleActivityClick(activity)}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} color="white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity?.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {activity?.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 ml-2">
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(activity?.timestamp)}
                    </span>
                    {activity?.creditCost && (
                      <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                        {activity?.creditCost}c
                      </span>
                    )}
                  </div>
                </div>
                
                {activity?.status && (
                  <div className="flex items-center gap-1 mt-2">
                    <div className={`w-2 h-2 rounded-full ${
                      activity?.status === 'completed' ? 'bg-success' :
                      activity?.status === 'processing'? 'bg-warning animate-pulse' : 'bg-error'
                    }`} />
                    <span className="text-xs text-muted-foreground capitalize">
                      {activity?.status}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {activities?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={handleViewAll}
          >
            View Activity History
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
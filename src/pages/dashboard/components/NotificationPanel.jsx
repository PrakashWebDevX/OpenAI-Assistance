import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const defaultNotifications = [
    {
      id: 1,
      type: 'success',
      title: 'Image Generation Complete',
      message: 'Your AI artwork "Sunset Landscape" has been generated successfully.',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      isRead: false,
      action: {
        label: 'View Image',
        route: '/image-generation-studio'
      }
    },
    {
      id: 2,
      type: 'info',
      title: 'New Feature Available',
      message: 'Code Assistant now supports Python debugging and optimization.',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isRead: false,
      action: {
        label: 'Try Now',
        route: '/code-assistant-workshop'
      }
    },
    {
      id: 3,
      type: 'warning',
      title: 'Credit Usage Alert',
      message: 'You have used 85% of your monthly credits. Consider upgrading your plan.',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      isRead: true,
      action: {
        label: 'Upgrade',
        route: '/dashboard'
      }
    }
  ];

  const displayNotifications = notifications?.length > 0 ? notifications : defaultNotifications;
  const unreadCount = displayNotifications?.filter(n => !n?.isRead)?.length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleMarkAllRead = () => {
    console.log('Mark all notifications as read');
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification?.id);
  };

  const visibleNotifications = isExpanded ? displayNotifications : displayNotifications?.slice(0, 3);

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Bell" size={20} color="white" />
            </div>
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleMarkAllRead}
            className="text-xs"
          >
            Mark all read
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {visibleNotifications?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No notifications</p>
            <p className="text-xs text-muted-foreground mt-1">
              You're all caught up!
            </p>
          </div>
        ) : (
          visibleNotifications?.map((notification) => (
            <div 
              key={notification?.id}
              className={`flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                notification?.isRead ? 'hover:bg-muted' : 'bg-muted/50 hover:bg-muted'
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className={`flex-shrink-0 mt-0.5 ${getNotificationColor(notification?.type)}`}>
                <Icon name={getNotificationIcon(notification?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${notification?.isRead ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {notification?.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {notification?.message}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 ml-2">
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(notification?.timestamp)}
                    </span>
                    {!notification?.isRead && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                </div>
                
                {notification?.action && (
                  <div className="mt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-2 text-xs text-primary hover:text-primary"
                    >
                      {notification?.action?.label}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {displayNotifications?.length > 3 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : `Show ${displayNotifications?.length - 3} More`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
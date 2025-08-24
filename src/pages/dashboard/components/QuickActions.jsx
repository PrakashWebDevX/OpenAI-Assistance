import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'start-chat',
      title: 'Start Chat',
      description: 'Begin AI conversation',
      icon: 'MessageSquare',
      route: '/ai-chat-interface',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      id: 'generate-image',
      title: 'Generate Image',
      description: 'Create AI artwork',
      icon: 'Image',
      route: '/image-generation-studio',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    },
    {
      id: 'code-assistant',
      title: 'Code Assistant',
      description: 'Get coding help',
      icon: 'Code',
      route: '/code-assistant-workshop',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    }
  ];

  const handleActionClick = (route) => {
    navigate(route);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Jump into your favorite AI tools</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action?.route)}
            className={`${action?.color} ${action?.hoverColor} text-white p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group`}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Icon name={action?.icon} size={24} color="white" />
              </div>
              <div>
                <p className="text-sm font-semibold">{action?.title}</p>
                <p className="text-xs opacity-90">{action?.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Need help getting started?</span>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
            View Tutorials
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
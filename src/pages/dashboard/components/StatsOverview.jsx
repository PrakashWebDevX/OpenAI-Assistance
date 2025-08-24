import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats = [] }) => {
  const defaultStats = [
    {
      id: 'total-generations',
      title: 'Total Generations',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'bg-blue-500'
    },
    {
      id: 'credits-saved',
      title: 'Credits Saved',
      value: '156',
      change: '+8%',
      changeType: 'positive',
      icon: 'Coins',
      color: 'bg-green-500'
    },
    {
      id: 'active-projects',
      title: 'Active Projects',
      value: '23',
      change: '+3',
      changeType: 'positive',
      icon: 'FolderOpen',
      color: 'bg-purple-500'
    },
    {
      id: 'response-time',
      title: 'Avg Response Time',
      value: '1.2s',
      change: '-0.3s',
      changeType: 'positive',
      icon: 'Clock',
      color: 'bg-orange-500'
    }
  ];

  const displayStats = stats?.length > 0 ? stats : defaultStats;

  const getChangeColor = (changeType) => {
    return changeType === 'positive' ? 'text-success' : 'text-error';
  };

  const getChangeIcon = (changeType) => {
    return changeType === 'positive' ? 'TrendingUp' : 'TrendingDown';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {displayStats?.map((stat) => (
        <div key={stat?.id} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat?.color}`}>
              <Icon name={stat?.icon} size={20} color="white" />
            </div>
            <div className={`flex items-center gap-1 text-xs ${getChangeColor(stat?.changeType)}`}>
              <Icon name={getChangeIcon(stat?.changeType)} size={12} />
              <span className="font-medium">{stat?.change}</span>
            </div>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-foreground mb-1">{stat?.value}</p>
            <p className="text-sm text-muted-foreground">{stat?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
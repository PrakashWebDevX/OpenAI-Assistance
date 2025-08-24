import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentHistory = ({ onHistorySelect, className = '' }) => {
  const [historyItems] = useState([
    {
      id: 1,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      prompt: 'Optimize this React component for performance',
      language: 'javascript',
      type: 'optimization',
      preview: 'const MyComponent = React.memo(({ data, onUpdate }) => {\n  const memoizedValue = useMemo(() => {\n    return expensiveCalculation(data);\n  }, [data]);...'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      prompt: 'Add error handling to this API call',
      language: 'javascript',
      type: 'enhancement',
      preview: 'try {\n  const response = await fetch(\'/api/data\');\n  if (!response.ok) {\n    throw new Error(`HTTP error! status: ${response.status}`);\n  }...'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      prompt: 'Convert this function to TypeScript',
      language: 'typescript',
      type: 'conversion',
      preview: 'interface UserData {\n  id: number;\n  name: string;\n  email: string;\n}\n\nfunction processUser(userData: UserData): Promise<boolean> {...'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      prompt: 'Explain this Python algorithm',
      language: 'python',
      type: 'explanation',
      preview: 'def binary_search(arr: List[int], target: int) -> int:\n    left, right = 0, len(arr) - 1\n    \n    while left <= right:\n        mid = (left + right) // 2...'
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 21600000), // 6 hours ago
      prompt: 'Fix the SQL query performance issue',
      language: 'sql',
      type: 'debugging',
      preview: 'SELECT u.id, u.name, COUNT(p.id) as post_count\nFROM users u\nLEFT JOIN posts p ON u.id = p.user_id\nWHERE u.active = 1\nGROUP BY u.id, u.name...'
    }
  ]);

  const getTypeIcon = (type) => {
    const icons = {
      optimization: 'Zap',
      enhancement: 'Plus',
      conversion: 'RefreshCw',
      explanation: 'FileText',
      debugging: 'Bug'
    };
    return icons[type] || 'Code';
  };

  const getTypeColor = (type) => {
    const colors = {
      optimization: 'text-yellow-600',
      enhancement: 'text-green-600',
      conversion: 'text-blue-600',
      explanation: 'text-purple-600',
      debugging: 'text-red-600'
    };
    return colors[type] || 'text-muted-foreground';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const handleHistorySelect = (item) => {
    onHistorySelect(item);
  };

  const clearHistory = () => {
    // Handle clear history
    console.log('Clear history');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Recent History</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Clear All
        </Button>
      </div>

      {/* History list */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {historyItems.map(item => (
          <div
            key={item.id}
            className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => handleHistorySelect(item)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Icon 
                  name={getTypeIcon(item.type)} 
                  size={16} 
                  className={getTypeColor(item.type)}
                />
                <span className="text-sm font-medium text-foreground truncate">
                  {item.prompt}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <span className="text-xs bg-muted px-2 py-1 rounded capitalize">
                  {item.language}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatTimeAgo(item.timestamp)}
                </span>
              </div>
            </div>

            {/* Code preview */}
            <div className="bg-muted/50 rounded p-3 mb-3">
              <pre className="text-xs text-foreground font-mono overflow-hidden">
                <code className="line-clamp-3">
                  {item.preview}
                </code>
              </pre>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full bg-muted ${getTypeColor(item.type)}`}>
                  {item.type}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle copy
                  }}
                >
                  <Icon name="Copy" size={12} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHistorySelect(item);
                  }}
                >
                  <Icon name="RotateCcw" size={12} />
                  Reuse
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {historyItems.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="History" size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">No recent code assistance history</p>
        </div>
      )}
    </div>
  );
};

export default RecentHistory;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GenerationQueue = ({ queue, onCancelGeneration }) => {
  if (queue?.length === 0) return null;

  const formatTimeRemaining = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'generating': return 'text-primary';
      case 'queued': return 'text-muted-foreground';
      case 'completed': return 'text-success';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'generating': return 'Loader';
      case 'queued': return 'Clock';
      case 'completed': return 'CheckCircle';
      case 'failed': return 'XCircle';
      default: return 'Clock';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Generation Queue</h3>
        <span className="text-sm text-muted-foreground">
          {queue?.filter(item => item?.status !== 'completed')?.length} active
        </span>
      </div>
      <div className="space-y-3">
        {queue?.map((item) => (
          <div
            key={item?.id}
            className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
          >
            {/* Status icon */}
            <div className={`flex-shrink-0 ${getStatusColor(item?.status)}`}>
              <Icon 
                name={getStatusIcon(item?.status)} 
                size={16}
                className={item?.status === 'generating' ? 'animate-spin' : ''}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate">
                {item?.prompt}
              </p>
              <div className="flex items-center gap-4 mt-1">
                <span className={`text-xs capitalize ${getStatusColor(item?.status)}`}>
                  {item?.status}
                </span>
                
                {item?.status === 'generating' && (
                  <span className="text-xs text-muted-foreground">
                    {formatTimeRemaining(item?.estimatedTime)} remaining
                  </span>
                )}
                
                {item?.batchSize > 1 && (
                  <span className="text-xs text-muted-foreground">
                    {item?.completedCount || 0}/{item?.batchSize} images
                  </span>
                )}
              </div>
            </div>

            {/* Progress bar for generating items */}
            {item?.status === 'generating' && (
              <div className="flex-shrink-0 w-20">
                <div className="w-full bg-border rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${item?.progress || 0}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cancel button */}
            {(item?.status === 'generating' || item?.status === 'queued') && (
              <Button
                variant="ghost"
                size="xs"
                iconName="X"
                onClick={() => onCancelGeneration(item?.id)}
                className="flex-shrink-0"
              />
            )}
          </div>
        ))}
      </div>
      {/* Queue summary */}
      {queue?.length > 3 && (
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {queue?.filter(item => item?.status === 'completed')?.length} completed, 
              {queue?.filter(item => item?.status === 'failed')?.length} failed
            </span>
            <span>
              Total credits used: {queue?.reduce((sum, item) => sum + (item?.creditCost || 0), 0)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerationQueue;
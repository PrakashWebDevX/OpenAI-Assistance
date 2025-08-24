import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ImagePreviewModal = ({ image, isOpen, onClose, onImageAction }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!isOpen || !image) return null;

  const handleDownload = () => {
    onImageAction('download', image);
  };

  const handleFavorite = () => {
    onImageAction('favorite', image);
  };

  const handleRegenerate = () => {
    onImageAction('regenerate', image);
    onClose();
  };

  const handleUseAsReference = () => {
    onImageAction('reference', image);
    onClose();
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-200 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-4xl max-h-[90vh] w-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-foreground">Image Preview</h2>
            {image?.isFavorite && (
              <div className="flex items-center gap-1 text-warning">
                <Icon name="Heart" size={16} className="fill-current" />
                <span className="text-xs">Favorite</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Zoom controls */}
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <Button
                variant="ghost"
                size="xs"
                iconName="ZoomOut"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
              />
              <span className="text-xs px-2 text-muted-foreground">
                {Math.round(zoomLevel * 100)}%
              </span>
              <Button
                variant="ghost"
                size="xs"
                iconName="ZoomIn"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
              />
              <Button
                variant="ghost"
                size="xs"
                iconName="RotateCcw"
                onClick={handleResetZoom}
              />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Image container */}
        <div className="flex-1 overflow-auto bg-muted/20">
          <div className="min-h-full flex items-center justify-center p-4">
            <div 
              className="transition-transform duration-200 cursor-zoom-in"
              style={{ transform: `scale(${zoomLevel})` }}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image
                src={image?.url}
                alt={image?.prompt}
                className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Footer with actions and metadata */}
        <div className="p-4 border-t border-border space-y-4">
          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="default"
              iconName="Download"
              iconPosition="left"
              onClick={handleDownload}
            >
              Download
            </Button>
            
            <Button
              variant="outline"
              iconName={image?.isFavorite ? "Heart" : "Heart"}
              iconPosition="left"
              onClick={handleFavorite}
              className={image?.isFavorite ? "text-warning border-warning" : ""}
            >
              {image?.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
            
            <Button
              variant="outline"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={handleRegenerate}
            >
              Regenerate
            </Button>
            
            <Button
              variant="outline"
              iconName="Copy"
              iconPosition="left"
              onClick={handleUseAsReference}
            >
              Use as Reference
            </Button>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div>
                <span className="text-muted-foreground">Prompt:</span>
                <p className="text-foreground mt-1 p-2 bg-muted rounded text-xs font-mono">
                  {image?.prompt}
                </p>
              </div>
              
              {image?.negativePrompt && (
                <div>
                  <span className="text-muted-foreground">Negative Prompt:</span>
                  <p className="text-foreground mt-1 p-2 bg-muted rounded text-xs font-mono">
                    {image?.negativePrompt}
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <p className="text-foreground">{formatDate(image?.createdAt)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Dimensions:</span>
                  <p className="text-foreground">{image?.dimensions}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Style:</span>
                  <p className="text-foreground">{image?.style || 'Default'}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Quality:</span>
                  <p className="text-foreground capitalize">{image?.quality || 'Standard'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
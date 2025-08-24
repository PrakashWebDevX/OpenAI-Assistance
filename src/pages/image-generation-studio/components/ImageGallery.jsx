import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ImageGallery = ({ images, isGenerating, onImageAction, onImageClick }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filterOptions = [
    { value: 'all', label: 'All Images', count: images?.length },
    { value: 'favorites', label: 'Favorites', count: images?.filter(img => img?.isFavorite)?.length },
    { value: 'recent', label: 'Recent', count: images?.filter(img => {
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return new Date(img.createdAt) > dayAgo;
    })?.length }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'favorites', label: 'Favorites First' }
  ];

  const filteredImages = images?.filter(image => {
    if (filter === 'favorites') return image?.isFavorite;
    if (filter === 'recent') {
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return new Date(image.createdAt) > dayAgo;
    }
    return true;
  });

  const sortedImages = [...filteredImages]?.sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === 'favorites') return (b?.isFavorite ? 1 : 0) - (a?.isFavorite ? 1 : 0);
    return 0;
  });

  const LoadingPlaceholder = () => (
    <div className="aspect-square bg-muted rounded-lg border border-border animate-pulse">
      <div className="h-full flex flex-col items-center justify-center p-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm text-muted-foreground text-center">
          Generating your image...
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          This may take 30-60 seconds
        </p>
      </div>
    </div>
  );

  const ImageCard = ({ image }) => (
    <div className="group relative bg-card rounded-lg border border-border overflow-hidden">
      <div 
        className="aspect-square cursor-pointer"
        onClick={() => onImageClick(image)}
      >
        <Image
          src={image?.url}
          alt={image?.prompt}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
        
        {/* Favorite indicator */}
        {image?.isFavorite && (
          <div className="absolute top-2 right-2">
            <div className="w-6 h-6 bg-warning rounded-full flex items-center justify-center">
              <Icon name="Heart" size={12} className="text-white fill-current" />
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="p-3 space-y-2">
        <p className="text-xs text-muted-foreground line-clamp-2">
          {image?.prompt}
        </p>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="xs"
            iconName="Download"
            onClick={() => onImageAction('download', image)}
            className="flex-1"
          >
            Download
          </Button>
          
          <Button
            variant="ghost"
            size="xs"
            iconName={image?.isFavorite ? "Heart" : "Heart"}
            onClick={() => onImageAction('favorite', image)}
            className={image?.isFavorite ? "text-warning" : ""}
          >
          </Button>
          
          <Button
            variant="ghost"
            size="xs"
            iconName="MoreHorizontal"
            onClick={() => onImageAction('menu', image)}
          >
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Generated Images</h2>
          <p className="text-sm text-muted-foreground">
            {sortedImages?.length} image{sortedImages?.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {/* Filter tabs */}
          <div className="flex bg-muted rounded-lg p-1">
            {filterOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => setFilter(option?.value)}
                className={`
                  px-3 py-1.5 text-xs font-medium rounded-md transition-colors
                  ${filter === option?.value
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                {option?.label} ({option?.count})
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-1.5 text-xs bg-background border border-border rounded-md text-foreground"
          >
            {sortOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Gallery grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Loading placeholders */}
        {isGenerating && (
          <>
            <LoadingPlaceholder />
            <LoadingPlaceholder />
            <LoadingPlaceholder />
            <LoadingPlaceholder />
          </>
        )}

        {/* Generated images */}
        {sortedImages?.map((image) => (
          <ImageCard key={image?.id} image={image} />
        ))}
      </div>
      {/* Empty state */}
      {!isGenerating && sortedImages?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Image" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            {filter === 'all' ? 'No images generated yet' : `No ${filter} images found`}
          </h3>
          <p className="text-muted-foreground mb-4">
            {filter === 'all' ?'Start creating amazing AI-generated images with your prompts' :'Try adjusting your filter or generate more images'
            }
          </p>
          {filter !== 'all' && (
            <Button
              variant="outline"
              onClick={() => setFilter('all')}
            >
              Show All Images
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
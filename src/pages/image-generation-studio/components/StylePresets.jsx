import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const StylePresets = ({ selectedStyle, onStyleChange }) => {
  const [showAll, setShowAll] = useState(false);

  const stylePresets = [
    {
      id: 'photorealistic',
      name: 'Photorealistic',
      description: 'Realistic photography style',
      icon: 'Camera',
      prompt: 'photorealistic, high detail, professional photography'
    },
    {
      id: 'digital-art',
      name: 'Digital Art',
      description: 'Modern digital artwork',
      icon: 'Palette',
      prompt: 'digital art, concept art, detailed illustration'
    },
    {
      id: 'oil-painting',
      name: 'Oil Painting',
      description: 'Classic oil painting style',
      icon: 'Brush',
      prompt: 'oil painting, classical art, brushstrokes'
    },
    {
      id: 'anime',
      name: 'Anime',
      description: 'Japanese animation style',
      icon: 'Star',
      prompt: 'anime style, manga, cel shading'
    },
    {
      id: 'watercolor',
      name: 'Watercolor',
      description: 'Soft watercolor painting',
      icon: 'Droplets',
      prompt: 'watercolor painting, soft colors, artistic'
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk',
      description: 'Futuristic neon aesthetic',
      icon: 'Zap',
      prompt: 'cyberpunk, neon lights, futuristic, sci-fi'
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      description: 'Clean and simple design',
      icon: 'Circle',
      prompt: 'minimalist, clean, simple, geometric'
    },
    {
      id: 'vintage',
      name: 'Vintage',
      description: 'Retro and nostalgic feel',
      icon: 'Clock',
      prompt: 'vintage, retro, nostalgic, aged'
    }
  ];

  const displayedStyles = showAll ? stylePresets : stylePresets?.slice(0, 4);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Style Presets</h3>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          {showAll ? 'Show Less' : 'Show All'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {displayedStyles?.map((style) => (
          <button
            key={style?.id}
            onClick={() => onStyleChange(style)}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200 text-left
              ${selectedStyle?.id === style?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-border/60 hover:bg-muted/50'
              }
            `}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                ${selectedStyle?.id === style?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                <Icon name={style?.icon} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {style?.name}
                </h4>
              </div>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {style?.description}
            </p>
          </button>
        ))}
      </div>
      {selectedStyle && (
        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="text-xs text-muted-foreground mb-1">Style prompt:</p>
          <p className="text-sm text-foreground font-mono">
            {selectedStyle?.prompt}
          </p>
        </div>
      )}
    </div>
  );
};

export default StylePresets;
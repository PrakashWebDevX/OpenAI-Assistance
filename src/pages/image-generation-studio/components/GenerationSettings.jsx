import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const GenerationSettings = ({ settings, onSettingsChange }) => {
  const aspectRatios = [
    { value: '1:1', label: 'Square (1:1)', description: 'Perfect for social media' },
    { value: '16:9', label: 'Landscape (16:9)', description: 'Widescreen format' },
    { value: '9:16', label: 'Portrait (9:16)', description: 'Mobile-friendly' },
    { value: '4:3', label: 'Standard (4:3)', description: 'Classic photo ratio' },
    { value: '3:2', label: 'Photo (3:2)', description: 'DSLR camera ratio' }
  ];

  const qualityOptions = [
    { value: 'draft', label: 'Draft', description: 'Fast generation, lower quality' },
    { value: 'standard', label: 'Standard', description: 'Balanced speed and quality' },
    { value: 'high', label: 'High Quality', description: 'Best quality, slower generation' }
  ];

  const batchSizes = [
    { value: 1, label: '1 Image', description: '5 credits' },
    { value: 2, label: '2 Images', description: '10 credits' },
    { value: 4, label: '4 Images', description: '20 credits' }
  ];

  const handleSettingChange = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  const getCreditCost = () => {
    const baseCost = 5;
    const qualityMultiplier = settings?.quality === 'high' ? 1.5 : settings?.quality === 'draft' ? 0.8 : 1;
    return Math.ceil(baseCost * qualityMultiplier * settings?.batchSize);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Settings" size={20} className="text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">Generation Settings</h3>
      </div>
      <div className="space-y-4">
        <Select
          label="Aspect Ratio"
          options={aspectRatios}
          value={settings?.aspectRatio}
          onChange={(value) => handleSettingChange('aspectRatio', value)}
          className="w-full"
        />

        <Select
          label="Quality"
          description="Higher quality takes longer to generate"
          options={qualityOptions}
          value={settings?.quality}
          onChange={(value) => handleSettingChange('quality', value)}
          className="w-full"
        />

        <Select
          label="Batch Size"
          description="Generate multiple variations at once"
          options={batchSizes}
          value={settings?.batchSize}
          onChange={(value) => handleSettingChange('batchSize', value)}
          className="w-full"
        />
      </div>
      {/* Cost summary */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Total Cost</span>
          <div className="flex items-center gap-1">
            <Icon name="Zap" size={14} className="text-primary" />
            <span className="text-sm font-semibold text-foreground">
              {getCreditCost()} credits
            </span>
          </div>
        </div>
        
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Base cost ({settings?.batchSize} image{settings?.batchSize > 1 ? 's' : ''})</span>
            <span>{5 * settings?.batchSize} credits</span>
          </div>
          {settings?.quality !== 'standard' && (
            <div className="flex justify-between">
              <span>Quality modifier ({settings?.quality})</span>
              <span>
                {settings?.quality === 'high' ? '+50%' : '-20%'}
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Estimated time */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon name="Clock" size={16} />
        <span>
          Estimated time: {settings?.quality === 'high' ? '45-60' : settings?.quality === 'draft' ? '15-20' : '25-35'} seconds
        </span>
      </div>
    </div>
  );
};

export default GenerationSettings;
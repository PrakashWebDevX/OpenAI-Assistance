import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import PromptInput from './components/PromptInput';
import StylePresets from './components/StylePresets';
import GenerationSettings from './components/GenerationSettings';
import ImageGallery from './components/ImageGallery';
import ImagePreviewModal from './components/ImagePreviewModal';
import GenerationQueue from './components/GenerationQueue';
import { ImageService, OpenAIUtils } from '../../services/openai';
import Icon from '../../components/AppIcon';


const ImageGenerationStudio = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [credits, setCredits] = useState(750);
  const [error, setError] = useState(null);
  
  const [generationSettings, setGenerationSettings] = useState({
    aspectRatio: '1:1',
    quality: 'standard',
    batchSize: 1
  });

  const [generationQueue, setGenerationQueue] = useState([]);
  
  const [generatedImages, setGeneratedImages] = useState([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=512&h=512&fit=crop',
      prompt: 'A majestic mountain landscape at sunset with golden light reflecting on a crystal clear lake, photorealistic style',
      negativePrompt: 'blurry, low quality, distorted',
      createdAt: '2024-08-24T08:30:00Z',
      dimensions: '512x512',
      style: 'Photorealistic',
      quality: 'standard',
      isFavorite: true,
      creditCost: 5
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=512&h=512&fit=crop',
      prompt: 'Futuristic cyberpunk cityscape with neon lights and flying cars, digital art style',
      negativePrompt: '',
      createdAt: '2024-08-24T08:25:00Z',
      dimensions: '512x512',
      style: 'Cyberpunk',
      quality: 'high',
      isFavorite: false,
      creditCost: 8
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=512&h=512&fit=crop',
      prompt: 'Elegant watercolor painting of cherry blossoms in spring, soft pastel colors',
      negativePrompt: 'harsh colors, digital',
      createdAt: '2024-08-24T08:20:00Z',
      dimensions: '512x512',
      style: 'Watercolor',
      quality: 'standard',
      isFavorite: true,
      creditCost: 5
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=512&h=512&fit=crop',
      prompt: 'Minimalist geometric abstract composition with clean lines and simple shapes',
      negativePrompt: 'complex, detailed, busy',
      createdAt: '2024-08-24T08:15:00Z',
      dimensions: '512x512',
      style: 'Minimalist',
      quality: 'standard',
      isFavorite: false,
      creditCost: 5
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=512&h=512&fit=crop',
      prompt: 'Vintage retro poster design with classic typography and aged textures',
      negativePrompt: 'modern, clean, digital',
      createdAt: '2024-08-24T08:10:00Z',
      dimensions: '512x512',
      style: 'Vintage',
      quality: 'standard',
      isFavorite: false,
      creditCost: 5
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=512&h=512&fit=crop',
      prompt: 'Anime style character portrait with vibrant colors and cel shading technique',
      negativePrompt: 'realistic, photographic',
      createdAt: '2024-08-24T08:05:00Z',
      dimensions: '512x512',
      style: 'Anime',
      quality: 'high',
      isFavorite: true,
      creditCost: 8
    }
  ]);

  const handleGenerate = async (promptData) => {
    if (credits < 5) return;

    setIsGenerating(true);
    setError(null);
    
    // Calculate credit cost
    const baseCost = 5;
    const qualityMultiplier = generationSettings?.quality === 'high' ? 1.5 : generationSettings?.quality === 'draft' ? 0.8 : 1;
    const totalCost = Math.ceil(baseCost * qualityMultiplier * generationSettings?.batchSize);
    
    // Add to queue
    const queueItem = {
      id: Date.now(),
      prompt: promptData?.prompt,
      negativePrompt: promptData?.negativePrompt,
      status: 'generating',
      progress: 0,
      estimatedTime: generationSettings?.quality === 'high' ? 60 : generationSettings?.quality === 'draft' ? 20 : 35,
      batchSize: generationSettings?.batchSize,
      completedCount: 0,
      creditCost: totalCost,
      settings: generationSettings,
      style: selectedStyle?.name || 'Default'
    };
    
    setGenerationQueue(prev => [...prev, queueItem]);
    setCredits(prev => prev - totalCost);

    try {
      // Check if OpenAI is configured
      if (!OpenAIUtils?.isConfigured()) {
        throw new Error('OpenAI API key is not configured');
      }

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setGenerationQueue(prev => prev?.map(item => 
          item?.id === queueItem?.id 
            ? { ...item, progress: Math.min(item?.progress + 15, 90) }
            : item
        ));
      }, 1000);

      // Prepare prompt with style information
      let enhancedPrompt = promptData?.prompt;
      if (selectedStyle?.name && selectedStyle?.name !== 'Default') {
        enhancedPrompt = `${promptData?.prompt}, ${selectedStyle?.name?.toLowerCase()} style`;
      }

      // Add negative prompt to main prompt if provided
      if (promptData?.negativePrompt) {
        enhancedPrompt += `. Avoid: ${promptData?.negativePrompt}`;
      }

      // Determine image size based on aspect ratio
      let imageSize = '1024x1024'; // default
      switch (generationSettings?.aspectRatio) {
        case '16:9':
          imageSize = '1792x1024';
          break;
        case '9:16':
          imageSize = '1024x1792';
          break;
        default:
          imageSize = '1024x1024';
      }

      // Generate images using OpenAI DALL-E
      const imageOptions = {
        model: generationSettings?.quality === 'high' ? 'dall-e-3' : 'dall-e-2',
        size: imageSize,
        quality: generationSettings?.quality === 'high' ? 'hd' : 'standard'
      };

      let imageUrls = [];
      if (generationSettings?.batchSize > 1 && imageOptions?.model === 'dall-e-3') {
        // DALL-E-3 only supports n=1, so generate multiple images sequentially
        for (let i = 0; i < generationSettings?.batchSize; i++) {
          const imageUrl = await ImageService?.generateImage(enhancedPrompt, imageOptions);
          imageUrls?.push(imageUrl);
          
          // Update progress
          setGenerationQueue(prev => prev?.map(item => 
            item?.id === queueItem?.id 
              ? { ...item, progress: Math.min(10 + (80 * (i + 1)) / generationSettings?.batchSize, 90), completedCount: i + 1 }
              : item
          ));
        }
      } else {
        // Generate batch or single image
        if (generationSettings?.batchSize === 1) {
          const imageUrl = await ImageService?.generateImage(enhancedPrompt, imageOptions);
          imageUrls = [imageUrl];
        } else {
          imageUrls = await ImageService?.generateImageBatch(enhancedPrompt, generationSettings?.batchSize, imageOptions);
        }
      }

      clearInterval(progressInterval);

      // Create new image objects
      const newImages = imageUrls?.map((url, index) => ({
        id: Date.now() + index,
        url,
        prompt: promptData?.prompt,
        negativePrompt: promptData?.negativePrompt || '',
        createdAt: new Date()?.toISOString(),
        dimensions: imageSize?.replace('x', '×'),
        style: selectedStyle?.name || 'Default',
        quality: generationSettings?.quality,
        isFavorite: false,
        creditCost: Math.ceil(totalCost / generationSettings?.batchSize)
      }));

      setGeneratedImages(prev => [...newImages, ...prev]);
      
      // Update queue status
      setGenerationQueue(prev => prev?.map(item => 
        item?.id === queueItem?.id 
          ? { ...item, status: 'completed', progress: 100, completedCount: generationSettings?.batchSize, completedAt: new Date()?.toISOString() }
          : item
      ));
      
      setIsGenerating(false);

    } catch (error) {
      console.error('Error generating image:', error);
      setError(OpenAIUtils?.formatError(error));
      setIsGenerating(false);
      
      // Refund credits on error
      setCredits(prev => prev + totalCost);
      
      // Update queue status to failed
      setGenerationQueue(prev => prev?.map(item => 
        item?.id === queueItem?.id 
          ? { ...item, status: 'failed', progress: 0, error: OpenAIUtils?.formatError(error) }
          : item
      ));
    }
  };

  const handleImageAction = (action, image) => {
    switch (action) {
      case 'download':
        // Simulate download
        const link = document.createElement('a');
        link.href = image?.url;
        link.download = `ai-generated-${image?.id}.jpg`;
        link?.click();
        break;
        
      case 'favorite':
        setGeneratedImages(prev => prev?.map(img => 
          img?.id === image?.id ? { ...img, isFavorite: !img?.isFavorite } : img
        ));
        break;
        
      case 'regenerate':
        handleGenerate({
          prompt: image?.prompt,
          negativePrompt: image?.negativePrompt
        });
        break;
        
      case 'reference':
        // Add image prompt to input
        console.log('Using as reference:', image?.prompt);
        break;
        
      case 'menu':
        // Show context menu
        console.log('Show menu for:', image?.id);
        break;
        
      default:
        break;
    }
  };

  const handleImageClick = (image) => {
    setPreviewImage(image);
    setIsPreviewOpen(true);
  };

  const handleCancelGeneration = (queueId) => {
    setGenerationQueue(prev => prev?.filter(item => item?.id !== queueId));
  };

  const handleStyleChange = (style) => {
    setSelectedStyle(style);
  };

  const handleSettingsChange = (newSettings) => {
    setGenerationSettings(newSettings);
  };

  // Auto-remove completed queue items after 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setGenerationQueue(prev => prev?.filter(item => 
        item?.status !== 'completed' || 
        (Date.now() - new Date(item.completedAt || Date.now())?.getTime()) < 30000
      ));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      <div className="lg:ml-60">
        <Header 
          onToggleSidebar={() => setSidebarOpen(true)} 
        />
        
        {/* Add error display */}
        {error && (
          <div className="fixed top-20 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md shadow-md z-50">
            <div className="flex items-center gap-2">
              <Icon name="AlertCircle" size={16} />
              <span className="text-sm">{error}</span>
              <button onClick={() => setError(null)} className="ml-2">
                <Icon name="X" size={14} />
              </button>
            </div>
          </div>
        )}

        <main className="pt-16 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                Image Generation Studio
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Transform your ideas into stunning visuals with OpenAI's DALL-E. 
                Create, customize, and download high-quality images from simple text descriptions.
              </p>
              {!OpenAIUtils?.isConfigured() && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-md inline-block">
                  <Icon name="AlertTriangle" size={16} className="inline mr-2" />
                  OpenAI API key not configured. Please set VITE_OPENAI_API_KEY in your environment.
                </div>
              )}
            </div>

            {/* Generation interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column - Input and settings */}
              <div className="lg:col-span-1 space-y-6">
                <PromptInput
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                  credits={credits}
                />
                
                <StylePresets
                  selectedStyle={selectedStyle}
                  onStyleChange={handleStyleChange}
                />
                
                <GenerationSettings
                  settings={generationSettings}
                  onSettingsChange={handleSettingsChange}
                />
              </div>

              {/* Right column - Results and queue */}
              <div className="lg:col-span-2 space-y-6">
                {generationQueue?.length > 0 && (
                  <GenerationQueue
                    queue={generationQueue}
                    onCancelGeneration={handleCancelGeneration}
                  />
                )}
                
                <ImageGallery
                  images={generatedImages}
                  isGenerating={isGenerating}
                  onImageAction={handleImageAction}
                  onImageClick={handleImageClick}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Image preview modal */}
      <ImagePreviewModal
        image={previewImage}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onImageAction={handleImageAction}
      />
    </div>
  );
};

export default ImageGenerationStudio;
import React from 'react';
import Icon from '../../../components/AppIcon';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: 'MessageSquare',
      title: 'AI Chat Assistant',
      description: 'Get instant answers and creative help from our advanced AI chatbot'
    },
    {
      icon: 'Image',
      title: 'Image Generation',
      description: 'Create stunning visuals and artwork with AI-powered image generation'
    },
    {
      icon: 'Code',
      title: 'Code Assistant',
      description: 'Write, debug, and optimize code with intelligent programming support'
    },
    {
      icon: 'Languages',
      title: 'Translation Services',
      description: 'Translate text across 100+ languages with high accuracy'
    },
    {
      icon: 'FileText',
      title: 'Document Analysis',
      description: 'Upload and analyze documents with AI-powered insights'
    },
    {
      icon: 'Mic',
      title: 'Voice Processing',
      description: 'Convert speech to text and text to speech with natural voices'
    }
  ];

  const features = [
    'Free tier with 100 monthly credits',
    'No credit card required to start',
    'Enterprise-grade security',
    '24/7 customer support',
    'API access for developers',
    'Regular feature updates'
  ];

  return (
    <div className="space-y-8">
      {/* Main Benefits */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Unlock the Power of AI
        </h3>
        <div className="grid gap-4">
          {benefits?.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={benefit?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm">
                  {benefit?.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {benefit?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Additional Features */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          What's Included
        </h3>
        <div className="space-y-2">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Icon name="Check" size={16} className="text-success flex-shrink-0" />
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Indicators */}
      <div className="pt-6 border-t border-border">
        <div className="flex items-center justify-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={16} />
            <span className="text-xs">SSL Secured</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Lock" size={16} />
            <span className="text-xs">GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Users" size={16} />
            <span className="text-xs">50K+ Users</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
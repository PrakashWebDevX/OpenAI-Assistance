import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '../../../components/AppIcon';

const SocialRegistration = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider);
    
    try {
      // Mock social login API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success - redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error(`${provider} registration failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: 'Square',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      {/* Social Login Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <button
            key={provider?.id}
            onClick={() => handleSocialLogin(provider?.id)}
            disabled={loadingProvider !== null}
            className={`
              flex items-center justify-center gap-3 px-4 py-3 rounded-md border
              transition-all duration-200 font-medium text-sm
              ${provider?.bgColor} ${provider?.textColor} ${provider?.borderColor}
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            `}
          >
            {loadingProvider === provider?.id ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Icon name={provider?.icon} size={20} />
            )}
            <span>
              {loadingProvider === provider?.id 
                ? 'Connecting...' 
                : `Continue with ${provider?.name}`
              }
            </span>
          </button>
        ))}
      </div>
      {/* Security Notice */}
      <div className="mt-6 p-3 bg-muted/50 rounded-md">
        <div className="flex items-start gap-2">
          <Icon name="Shield" size={16} className="text-success mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">
              Your data is protected with enterprise-grade security. We never store your social login credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;
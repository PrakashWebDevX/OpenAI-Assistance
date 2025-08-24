import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import BenefitsSection from './components/BenefitsSection';
import TestimonialCard from './components/TestimonialCard';

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Left Side - Benefits (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 to-accent/5 p-8 xl:p-12">
          <div className="flex flex-col justify-between w-full max-w-md mx-auto">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AI Assistant</h1>
                <p className="text-sm text-muted-foreground">Platform</p>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="flex-1">
              <BenefitsSection />
            </div>

            {/* Testimonial */}
            <div className="mt-8">
              <TestimonialCard />
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Logo */}
            <div className="flex items-center justify-center gap-3 lg:hidden">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AI Assistant</h1>
                <p className="text-sm text-muted-foreground">Platform</p>
              </div>
            </div>

            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                Create your account
              </h2>
              <p className="text-muted-foreground">
                Join thousands of users leveraging AI for productivity
              </p>
            </div>

            {/* Registration Form */}
            <div className="bg-card border border-border rounded-lg p-6 lg:p-8 elevation-1">
              <RegistrationForm />
              
              {/* Social Registration */}
              <div className="mt-6">
                <SocialRegistration />
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Mobile Benefits Preview */}
            <div className="lg:hidden bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="MessageSquare" size={14} />
                  <span>AI Chat</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Image" size={14} />
                  <span>Image Gen</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Code" size={14} />
                  <span>Code Help</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Languages" size={14} />
                  <span>Translate</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-muted-foreground">
              <p>
                By creating an account, you agree to our{' '}
                <a href="#" className="text-primary hover:underline">Terms</a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </p>
              <p className="mt-2">
                © {new Date()?.getFullYear()} AI Assistant Platform. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
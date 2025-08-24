import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginFooter = () => {
  const currentYear = new Date()?.getFullYear();

  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted'
    },
    {
      icon: 'Lock',
      text: 'Secure Login'
    },
    {
      icon: 'CheckCircle',
      text: 'GDPR Compliant'
    }
  ];

  const footerLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Support', href: '#' },
    { label: 'Contact', href: '#' }
  ];

  return (
    <footer className="w-full py-8 px-4 border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Security Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Icon 
                name={feature?.icon} 
                size={16} 
                className="text-success" 
              />
              <span className="text-xs text-muted-foreground font-medium">
                {feature?.text}
              </span>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mb-6">
          <p className="text-xs text-muted-foreground mb-2">
            Trusted by 50,000+ professionals worldwide
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              <Icon name="Users" size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">Enterprise Ready</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Zap" size={14} className="text-warning" />
              <span className="text-xs text-muted-foreground">99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Globe" size={14} className="text-accent" />
              <span className="text-xs text-muted-foreground">Global CDN</span>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
          {footerLinks?.map((link, index) => (
            <React.Fragment key={link?.label}>
              <a
                href={link?.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link?.label}
              </a>
              {index < footerLinks?.length - 1 && (
                <span className="text-muted-foreground">•</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            © {currentYear} AI Assistant Platform. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Built with security and privacy in mind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LoginFooter;
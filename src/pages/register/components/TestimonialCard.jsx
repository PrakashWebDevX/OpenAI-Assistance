import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialCard = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Content Creator',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: `The AI chat assistant has revolutionized my content creation workflow. I can generate ideas, write drafts, and get feedback all in one place.`,
      rating: 5
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      role: 'Software Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: `The code assistant is incredibly helpful for debugging and learning new frameworks. It's like having a senior developer available 24/7.`,
      rating: 5
    },
    {
      id: 3,
      name: 'Emily Watson',role: 'Marketing Manager',avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: `Image generation has saved us thousands on stock photos. The quality is amazing and perfectly matches our brand requirements.`,
      rating: 5
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials?.length]);

  const testimonial = testimonials?.[currentTestimonial];

  return (
    <div className="bg-muted/30 rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-1">
        {[...Array(5)]?.map((_, i) => (
          <Icon 
            key={i} 
            name="Star" 
            size={16} 
            className={`${i < testimonial?.rating ? 'text-warning fill-current' : 'text-muted-foreground'}`}
          />
        ))}
      </div>
      <blockquote className="text-sm text-foreground leading-relaxed">
        "{testimonial?.content}"
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image 
            src={testimonial?.avatar}
            alt={testimonial?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            {testimonial?.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {testimonial?.role}
          </p>
        </div>
      </div>
      {/* Testimonial indicators */}
      <div className="flex justify-center gap-2 pt-2">
        {testimonials?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
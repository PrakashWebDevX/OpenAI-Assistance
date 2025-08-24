import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ServiceCard from './components/ServiceCard';
import UsageSummary from './components/UsageSummary';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import StatsOverview from './components/StatsOverview';
import NotificationPanel from './components/NotificationPanel';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Mock data for services
  const aiServices = [
    {
      id: 'chat-ai',
      title: 'Chat AI',
      description: 'Engage in intelligent conversations with our advanced AI assistant for any topic or question.',
      icon: 'MessageSquare',
      route: '/ai-chat-interface',
      creditCost: 1,
      usageCount: 45,
      maxUsage: 100,
      bgGradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
      isPopular: true
    },
    {
      id: 'image-generation',
      title: 'Image Generation',
      description: 'Create stunning AI-generated artwork and images from text descriptions with advanced models.',
      icon: 'Image',
      route: '/image-generation-studio',
      creditCost: 5,
      usageCount: 12,
      maxUsage: 50,
      bgGradient: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      id: 'code-assistant',
      title: 'Code Assistant',
      description: 'Get intelligent coding help, debugging support, and code generation for multiple programming languages.',
      icon: 'Code',
      route: '/code-assistant-workshop',
      creditCost: 2,
      usageCount: 28,
      maxUsage: 75,
      bgGradient: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      id: 'voice-processing',
      title: 'Voice Processing',
      description: 'Convert speech to text and text to speech with high-quality AI voice processing capabilities.',
      icon: 'Mic',
      route: '/voice-processing',
      creditCost: 3,
      usageCount: 8,
      maxUsage: 30,
      bgGradient: 'bg-gradient-to-br from-orange-500 to-orange-600'
    },
    {
      id: 'translation',
      title: 'Translation',
      description: 'Translate text between multiple languages with context-aware AI translation technology.',
      icon: 'Languages',
      route: '/translation-service',
      creditCost: 1,
      usageCount: 15,
      maxUsage: 100,
      bgGradient: 'bg-gradient-to-br from-pink-500 to-pink-600'
    },
    {
      id: 'document-analysis',
      title: 'Document Analysis',
      description: 'Upload and analyze documents with AI-powered insights, summaries, and question-answering.',
      icon: 'FileText',
      route: '/document-analysis',
      creditCost: 4,
      usageCount: 6,
      maxUsage: 25,
      bgGradient: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
    }
  ];

  // Mock usage data
  const usageData = {
    creditsUsed: 850,
    totalCredits: 1000,
    subscriptionTier: 'Pro',
    renewalDate: 'September 15, 2024',
    isNearLimit: true
  };

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'image',
      title: 'Generated "Futuristic City"',
      description: 'AI-generated artwork with cyberpunk theme and neon lighting effects',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      creditCost: 5,
      status: 'completed',
      route: '/image-generation-studio'
    },
    {
      id: 2,
      type: 'chat',
      title: 'Marketing Strategy Discussion',
      description: 'Conversation about digital marketing trends and social media strategies',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      creditCost: 3,
      status: 'completed',
      route: '/ai-chat-interface'
    },
    {
      id: 3,
      type: 'code',
      title: 'React Component Optimization',
      description: 'Code review and performance optimization suggestions for React components',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      creditCost: 2,
      status: 'completed',
      route: '/code-assistant-workshop'
    },
    {
      id: 4,
      type: 'document',
      title: 'Contract Analysis',
      description: 'Legal document review and key points extraction',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      creditCost: 4,
      status: 'processing',
      route: '/document-analysis'
    }
  ];

  // Mock statistics
  const statsData = [
    {
      id: 'total-generations',
      title: 'Total Generations',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'bg-blue-500'
    },
    {
      id: 'credits-saved',
      title: 'Credits Saved',
      value: '156',
      change: '+8%',
      changeType: 'positive',
      icon: 'Coins',
      color: 'bg-green-500'
    },
    {
      id: 'active-projects',
      title: 'Active Projects',
      value: '23',
      change: '+3',
      changeType: 'positive',
      icon: 'FolderOpen',
      color: 'bg-purple-500'
    },
    {
      id: 'response-time',
      title: 'Avg Response Time',
      value: '1.2s',
      change: '-0.3s',
      changeType: 'positive',
      icon: 'Clock',
      color: 'bg-orange-500'
    }
  ];

  const formatGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={handleCloseSidebar}
      />
      <div className="lg:ml-60">
        <Header 
          onToggleSidebar={handleToggleSidebar}
        />
        
        <main className="pt-16 p-4 lg:p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  {formatGreeting()}, John! 👋
                </h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back to your AI Assistant Platform. Ready to create something amazing?
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                {currentTime?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mb-8">
            <StatsOverview stats={statsData} />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Services */}
            <div className="xl:col-span-2">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">AI Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiServices?.map((service) => (
                    <ServiceCard
                      key={service?.id}
                      title={service?.title}
                      description={service?.description}
                      icon={service?.icon}
                      route={service?.route}
                      creditCost={service?.creditCost}
                      usageCount={service?.usageCount}
                      maxUsage={service?.maxUsage}
                      bgGradient={service?.bgGradient}
                      isPopular={service?.isPopular}
                    />
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <RecentActivity activities={recentActivities} />
              </div>
            </div>

            {/* Right Column - Usage & Notifications */}
            <div className="space-y-6">
              <UsageSummary
                creditsUsed={usageData?.creditsUsed}
                totalCredits={usageData?.totalCredits}
                subscriptionTier={usageData?.subscriptionTier}
                renewalDate={usageData?.renewalDate}
                isNearLimit={usageData?.isNearLimit}
              />
              
              <NotificationPanel />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>© {new Date()?.getFullYear()} AI Assistant Platform</span>
                <span>•</span>
                <span>All services operational</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="hover:text-foreground transition-colors">Help</button>
                <button className="hover:text-foreground transition-colors">Support</button>
                <button className="hover:text-foreground transition-colors">API Docs</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
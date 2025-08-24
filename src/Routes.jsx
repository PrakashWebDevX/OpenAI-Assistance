import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ImageGenerationStudio from './pages/image-generation-studio';
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import AIChatInterface from './pages/ai-chat-interface';
import Register from './pages/register';
import CodeAssistantWorkshop from './pages/code-assistant-workshop';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIChatInterface />} />
        <Route path="/image-generation-studio" element={<ImageGenerationStudio />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-chat-interface" element={<AIChatInterface />} />
        <Route path="/register" element={<Register />} />
        <Route path="/code-assistant-workshop" element={<CodeAssistantWorkshop />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

import OpenAI from 'openai';

/**
 * OpenAI service for AI-powered features
 * Handles chat completions, image generation, and code assistance
 */

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for client-side usage in React
});

/**
 * Chat Completion Service
 * Generates conversational AI responses
 */
export class ChatService {
  /**
   * Generate a basic chat completion response
   * @param {Array} messages - Array of message objects with role and content
   * @param {Object} options - Additional options (model, temperature, max_tokens)
   * @returns {Promise<string>} The assistant's response
   */
  static async getChatCompletion(messages, options = {}) {
    try {
      const response = await openai?.chat?.completions?.create({
        model: options?.model || 'gpt-4o',
        messages,
        temperature: options?.temperature || 0.7,
        max_tokens: options?.max_tokens || 1000,
        ...options
      });

      return response?.choices?.[0]?.message?.content;
    } catch (error) {
      console.error('Error in chat completion:', error);
      throw new Error('Failed to generate AI response: ' + error.message);
    }
  }

  /**
   * Stream chat completion responses for real-time experience
   * @param {Array} messages - Array of message objects
   * @param {Function} onChunk - Callback for each streamed chunk
   * @param {Object} options - Additional options
   */
  static async getStreamingChatCompletion(messages, onChunk, options = {}) {
    try {
      const stream = await openai?.chat?.completions?.create({
        model: options?.model || 'gpt-4o',
        messages,
        stream: true,
        temperature: options?.temperature || 0.7,
        max_tokens: options?.max_tokens || 1000,
        ...options
      });

      for await (const chunk of stream) {
        const content = chunk?.choices?.[0]?.delta?.content || '';
        if (content) {
          onChunk(content);
        }
      }
    } catch (error) {
      console.error('Error in streaming chat completion:', error);
      throw new Error('Failed to stream AI response: ' + error.message);
    }
  }

  /**
   * Generate structured chat completion with JSON schema
   * @param {Array} messages - Array of message objects
   * @param {Object} schema - JSON schema for structured output
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} Parsed JSON response
   */
  static async getStructuredChatCompletion(messages, schema, options = {}) {
    try {
      const response = await openai?.chat?.completions?.create({
        model: options?.model || 'gpt-4o',
        messages,
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: options?.schemaName || 'response',
            schema: {
              type: 'object',
              ...schema
            }
          }
        },
        temperature: options?.temperature || 0.7,
        max_tokens: options?.max_tokens || 1000,
        ...options
      });

      return JSON.parse(response?.choices?.[0]?.message?.content);
    } catch (error) {
      console.error('Error in structured chat completion:', error);
      throw new Error('Failed to generate structured response: ' + error.message);
    }
  }
}

/**
 * Image Generation Service
 * Handles DALL-E image generation and manipulation
 */
export class ImageService {
  /**
   * Generate an image from text prompt
   * @param {string} prompt - Description of the desired image
   * @param {Object} options - Generation options (model, size, quality, n)
   * @returns {Promise<string>} URL of the generated image
   */
  static async generateImage(prompt, options = {}) {
    try {
      const response = await openai?.images?.generate({
        model: options?.model || 'dall-e-3',
        prompt,
        n: options?.n || 1,
        size: options?.size || '1024x1024',
        quality: options?.quality || 'standard',
        ...options
      });

      return response?.data?.[0]?.url;
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error('Failed to generate image: ' + error.message);
    }
  }

  /**
   * Generate multiple images in batch
   * @param {string} prompt - Description of the desired image
   * @param {number} count - Number of images to generate
   * @param {Object} options - Generation options
   * @returns {Promise<Array>} Array of image URLs
   */
  static async generateImageBatch(prompt, count = 1, options = {}) {
    try {
      // DALL-E-3 only supports n=1, so we'll make multiple requests for batches
      if (options?.model === 'dall-e-3' && count > 1) {
        const promises = Array.from({ length: count }, () =>
          this.generateImage(prompt, { ...options, n: 1 })
        );
        return await Promise.all(promises);
      }

      const response = await openai?.images?.generate({
        model: options?.model || 'dall-e-2',
        prompt,
        n: count,
        size: options?.size || '512x512',
        ...options
      });

      return response?.data?.map(item => item?.url);
    } catch (error) {
      console.error('Error generating image batch:', error);
      throw new Error('Failed to generate images: ' + error.message);
    }
  }
}

/**
 * Code Assistant Service
 * Handles code generation, explanation, and optimization
 */
export class CodeService {
  /**
   * Generate or explain code based on prompt
   * @param {string} prompt - Code generation or explanation prompt
   * @param {string} code - Existing code (optional)
   * @param {string} language - Programming language
   * @returns {Promise<Object>} Generated code and explanation
   */
  static async processCode(prompt, code = '', language = 'javascript') {
    try {
      const systemPrompt = `You are an expert ${language} developer. Help with code generation, explanation, and optimization. Always provide clear, well-commented code and detailed explanations.`;
      
      const userPrompt = code 
        ? `${prompt}\n\nExisting code:\n\`\`\`${language}\n${code}\n\`\`\``
        : prompt;

      const schema = {
        properties: {
          code: { type: 'string' },
          explanation: { type: 'string' }
        },
        required: ['code', 'explanation'],
        additionalProperties: false
      };

      return await ChatService?.getStructuredChatCompletion([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], schema, { schemaName: 'code_response' });
    } catch (error) {
      console.error('Error processing code:', error);
      throw new Error('Failed to process code: ' + error.message);
    }
  }

  /**
   * Optimize existing code for performance
   * @param {string} code - Code to optimize
   * @param {string} language - Programming language
   * @returns {Promise<Object>} Optimized code and explanation
   */
  static async optimizeCode(code, language = 'javascript') {
    const prompt = `Optimize this ${language} code for better performance, readability, and best practices. Provide the optimized version with detailed explanations of the improvements made.`;
    return await this.processCode(prompt, code, language);
  }

  /**
   * Add error handling to existing code
   * @param {string} code - Code to add error handling to
   * @param {string} language - Programming language
   * @returns {Promise<Object>} Code with error handling and explanation
   */
  static async addErrorHandling(code, language = 'javascript') {
    const prompt = `Add comprehensive error handling to this ${language} code. Include try-catch blocks, input validation, and appropriate error messages.`;
    return await this.processCode(prompt, code, language);
  }

  /**
   * Explain existing code functionality
   * @param {string} code - Code to explain
   * @param {string} language - Programming language
   * @returns {Promise<Object>} Code breakdown and explanation
   */
  static async explainCode(code, language = 'javascript') {
    const prompt = `Explain this ${language} code in detail. Break down its functionality, logic flow, and any important concepts or patterns used.`;
    return await this.processCode(prompt, code, language);
  }
}

/**
 * Utility functions for OpenAI service
 */
export class OpenAIUtils {
  /**
   * Check if OpenAI API key is configured
   * @returns {boolean} True if API key is available
   */
  static isConfigured() {
    return !!import.meta.env?.VITE_OPENAI_API_KEY && 
           import.meta.env?.VITE_OPENAI_API_KEY !== 'your_vite_openai_api_key';
  }

  /**
   * Get estimated token count for text (rough approximation)
   * @param {string} text - Text to estimate
   * @returns {number} Estimated token count
   */
  static estimateTokens(text) {
    // Rough estimation: ~4 characters per token
    return Math.ceil(text?.length / 4);
  }

  /**
   * Validate message format for chat completions
   * @param {Array} messages - Messages to validate
   * @returns {boolean} True if valid format
   */
  static validateMessages(messages) {
    return Array.isArray(messages) && 
           messages?.every(msg => 
             msg?.role && msg?.content && 
             ['system', 'user', 'assistant']?.includes(msg?.role)
           );
  }

  /**
   * Format error for user display
   * @param {Error} error - Error object
   * @returns {string} User-friendly error message
   */
  static formatError(error) {
    if (error?.message?.includes('API key')) {
      return 'OpenAI API key is not configured. Please check your environment variables.';
    }
    if (error?.message?.includes('quota')) {
      return 'OpenAI API quota exceeded. Please check your usage limits.';
    }
    if (error?.message?.includes('rate limit')) {
      return 'Too many requests. Please wait a moment before trying again.';
    }
    return error?.message || 'An unexpected error occurred with OpenAI service.';
  }
}

export default openai;
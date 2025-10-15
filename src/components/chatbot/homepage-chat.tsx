'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const EXAMPLE_QUESTIONS = [
  "Beach for sunset",
  "Tacos downtown",
  "Kids activities",
  "Hiking trails",
  "Live music tonight",
  "Coffee with wifi"
];

export function HomepageChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messages.length > 0 && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent, question?: string) => {
    e.preventDefault();
    const messageText = question || input;
    
    console.log('🎯 handleSubmit called with:', { messageText, question, input, isLoading });
    
    if (!messageText.trim()) {
      console.log('⚠️ Empty message, aborting');
      return;
    }
    
    if (isLoading) {
      console.log('⚠️ Already loading, aborting');
      return;
    }

    setError(null);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
    };

    console.log('📤 Adding user message:', userMessage);
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('🚀 Sending chat request...');
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
      };

      setMessages((prev) => [...prev, assistantMessage]);

      console.log('📥 Starting to read stream...');

      // Simple streaming: read chunks and append
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('✅ Stream complete');
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        console.log('📦 Chunk received:', chunk.substring(0, 50) + '...');
        
        assistantMessage.content += chunk;
        
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { ...assistantMessage };
          return newMessages;
        });

        // Scroll to bottom during streaming so user can see the response
        setTimeout(() => {
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }
        }, 0);
      }

      console.log('✨ Message complete, length:', assistantMessage.content.length);

    } catch (error) {
      console.error('❌ Chat error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to get response';
      setError(errorMessage);
      
      const errorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
      // Focus back on input
      inputRef.current?.focus();
    }
  };

  const handleExampleClick = (question: string) => {
    console.log('🔵 Example clicked:', question);
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSubmit(fakeEvent, question);
  };

  // Parse markdown: links [text](url) -> <a>, bold **text** -> <strong>
  const renderMessageContent = (content: string) => {
    // First, split by markdown links to preserve them
    const linkParts = content.split(/(\[[^\]]+\]\([^)]+\))/);
    
    return linkParts.map((part, i) => {
      // Handle markdown links
      const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        return (
          <a
            key={i}
            href={linkMatch[2]}
            className="text-blue-600 hover:text-blue-700 underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkMatch[1]}
          </a>
        );
      }
      
      // Handle bold text **text** -> <strong>
      const boldParts = part.split(/(\*\*[^*]+\*\*)/);
      return boldParts.map((boldPart, j) => {
        const boldMatch = boldPart.match(/\*\*([^*]+)\*\*/);
        if (boldMatch) {
          return <strong key={`${i}-${j}-bold`} className="font-bold">{boldMatch[1]}</strong>;
        }
        
        // Handle line breaks
        return boldPart.split('\n').map((line, k) => (
          <span key={`${i}-${j}-${k}`}>
            {line}
            {k < boldPart.split('\n').length - 1 && <br />}
          </span>
        ));
      });
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header - Clean & Minimal */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          What should I do today?
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Ask me anything about Santa Cruz
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p className="font-semibold">Error:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Chat Container - Clean Design */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Messages */}
        <div className="h-[400px] md:h-[500px] overflow-y-auto p-6 space-y-4" style={{ scrollBehavior: 'smooth' }}>
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-8 text-lg">
                Try asking about:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
                {EXAMPLE_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleExampleClick(q)}
                    className="text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-900 transition-colors border border-gray-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="text-sm md:text-base leading-relaxed">
                      {message.role === 'assistant' ? (
                        renderMessageContent(message.content)
                      ) : (
                        message.content
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={(e) => handleSubmit(e)} className="border-t border-gray-200 p-4">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about activities, food, beaches..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              onClick={(e) => {
                console.log('🔴 Button clicked!', { input, isLoading });
              }}
            >
              {isLoading ? 'Thinking...' : 'Ask'}
            </button>
          </div>
        </form>
      </div>

      {/* Debug Info (only in development) */}
      {process.env.NODE_ENV === 'development' && messages.length > 0 && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-600">
          <strong>Debug:</strong> {messages.length} messages, Last: {messages[messages.length - 1]?.content.length || 0} chars
        </div>
      )}
    </div>
  );
}

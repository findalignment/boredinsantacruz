'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const EXAMPLE_QUESTIONS = [
  "🏖️ Beach for sunset",
  "🌮 Tacos downtown",
  "👶 Kids activities",
  "🥾 Hiking trails",
  "🎵 Live music tonight",
  "☕ Coffee with wifi"
];

export function HomepageChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent, question?: string) => {
    e.preventDefault();
    const messageText = question || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
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

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('No reader available');

      let assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
      };

      setMessages((prev) => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('0:')) {
            const text = line.slice(3, -1);
            assistantMessage.content += text;
            setMessages((prev) => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = { ...assistantMessage };
              return newMessages;
            });
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I couldn't help with that. Please try again!",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (question: string) => {
    setInput(question);
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSubmit(fakeEvent, question);
    }, 100);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 rounded-2xl mb-4 shadow-lg">
          <span className="text-2xl md:text-3xl" role="img" aria-label="Wave">🌊</span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
          What should I do today?
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-2">
          Your AI local guide for Santa Cruz
        </p>
        <p className="text-sm text-gray-500 max-w-xl mx-auto px-4">
          💡 <strong>Try:</strong> "beach", "tacos", "kids", "hike", "music", "coffee"
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50">
        {/* Messages */}
        <div className="h-[400px] md:h-[500px] overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <div className="text-4xl md:text-5xl mb-4" role="img" aria-label="Wave">👋</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                Ask me anything
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 px-4">
                Tap a suggestion or type your own
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 max-w-2xl mx-auto px-2">
                {EXAMPLE_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleExampleClick(q)}
                    className="text-left p-3 md:p-4 bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 rounded-xl text-xs md:text-sm text-gray-800 transition-all border border-blue-200/50 shadow-sm hover:shadow-md font-medium active:scale-95"
                    aria-label={`Ask about ${q}`}
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
                    className={`max-w-[85%] rounded-2xl p-3 md:p-4 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-line">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={(e) => handleSubmit(e)} className="border-t border-gray-200/50 p-3 md:p-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="flex gap-2 md:gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask: beach, tacos, kids..."
              className="flex-1 px-4 md:px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm md:text-base bg-white shadow-sm"
              disabled={isLoading}
              aria-label="Ask a question"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 md:px-7 py-3 rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed font-semibold text-sm md:text-base shadow-md hover:shadow-lg active:scale-95"
              aria-label={isLoading ? 'Sending...' : 'Send message'}
            >
              {isLoading ? '...' : 'Ask'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

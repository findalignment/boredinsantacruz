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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only scroll when assistant is responding, not when user is typing
    if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
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

      let buffer = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        // Keep the last incomplete line in the buffer
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim()) {
            // Parse the streaming text response format from Vercel AI SDK
            if (line.startsWith('0:')) {
              // Text chunk: 0:"text content"
              try {
                const text = JSON.parse(line.slice(2));
                assistantMessage.content += text;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = { ...assistantMessage };
                  return newMessages;
                });
              } catch (e) {
                console.error('Failed to parse text chunk:', line, e);
              }
            }
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
      {/* Header - Clean & Minimal */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          What should I do today?
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Ask me anything about Santa Cruz
        </p>
      </div>

      {/* Chat Container - Clean Design */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Messages */}
        <div className="h-[400px] md:h-[500px] overflow-y-auto p-6 space-y-4">
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
                    <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                      {message.role === 'assistant' ? (
                        // Parse markdown links for assistant messages
                        <div>
                          {message.content.split(/(\[[^\]]+\]\([^)]+\))/).map((part, i) => {
                            const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
                            if (linkMatch) {
                              return (
                                <a
                                  key={i}
                                  href={linkMatch[2]}
                                  className="text-blue-600 hover:text-blue-700 underline font-medium"
                                >
                                  {linkMatch[1]}
                                </a>
                              );
                            }
                            return <span key={i}>{part}</span>;
                          })}
                        </div>
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
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-base bg-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium text-base"
            >
              {isLoading ? '...' : 'Ask'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

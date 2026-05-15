import { useState, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { apiClient } from '../../lib/api'
import { ConversationMessage } from '../../types'
import { MessageList } from './MessageList'
import { InputBox } from './InputBox'
import { TokenMeter } from './TokenMeter'

const SUGGESTIONS = [
  "Who is Dicky?",
  "What's your Go experience?",
  "How was this site built?",
  "When are you available?",
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [tokensUsed, setTokensUsed] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [animatedSuggestion, setAnimatedSuggestion] = useState('')
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  // Animated suggestions effect
  useEffect(() => {
    if (messages.length > 0) return

    const timer = setTimeout(() => {
      const currentSuggestion = SUGGESTIONS[suggestionIndex]
      if (charIndex < currentSuggestion.length) {
        setAnimatedSuggestion(currentSuggestion.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      } else {
        // Wait before switching to next suggestion
        setTimeout(() => {
          setSuggestionIndex((suggestionIndex + 1) % SUGGESTIONS.length)
          setCharIndex(0)
          setAnimatedSuggestion('')
        }, 2000)
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [charIndex, suggestionIndex, messages.length])

  const handleSendMessage = async (question: string) => {
    setError('')
    const userMessage: ConversationMessage = {
      role: 'user',
      content: question,
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setAnimatedSuggestion('')

    try {
      const response = await apiClient.chat(question)

      if (response.error === 'budget_exceeded') {
        setError('Token budget exhausted. Please refresh to start a new session.')
      }

      const assistantMessage: ConversationMessage = {
        role: 'assistant',
        content: response.answer,
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setTokensUsed(response.session_tokens_used)

      if (!response.is_in_scope) {
        setError('This question is outside my knowledge base.')
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to get response'
      setError(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const isBudgetExceeded = tokensUsed >= 8000

  return (
    <>
      {/* Floating Chat Button with Tooltip */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {/* Tooltip Label with Arrow */}
        {!isOpen && (
          <div className="relative">
            <div className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium border border-slate-700 shadow-lg whitespace-nowrap">
              Chat with Dicky's AI Assistant
              {/* Arrow pointing down */}
              <div className="absolute bottom-0 right-6 transform translate-y-full">
                <div className="border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-slate-900"></div>
              </div>
            </div>
          </div>
        )}

        {/* Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center font-bold text-white ${
            isOpen
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
          }`}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md h-screen max-h-[600px] rounded-2xl shadow-2xl flex flex-col z-40 bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-700 animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 rounded-t-2xl">
            <h2 className="text-xl font-bold text-white mb-2">Dicky's AI Assistant</h2>
            <p className="text-sm text-blue-100">Powered by Claude AI + RAG</p>
          </div>

          {/* Info Section */}
          {messages.length === 0 && (
            <div className="bg-blue-500/10 border-b border-blue-500/30 px-4 py-3">
              <p className="text-xs text-blue-200">
                💬 <span className="font-semibold">Ask me about:</span> Dicky's experience, skills, projects, availability & how this site was built
              </p>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto">
            <MessageList messages={messages} isLoading={isLoading} />
          </div>

          {/* Animated Placeholder */}
          {messages.length === 0 && !isLoading && (
            <div className="px-4 py-6 text-center text-slate-400">
              <div className="inline-block">
                <p className="text-sm mb-4 font-light">Try asking...</p>
                <div className="h-8 min-h-8 flex items-center justify-center">
                  <span className="font-mono text-lg text-blue-400">
                    {animatedSuggestion}
                    <span className="animate-pulse">▌</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Token Meter */}
          <div className="bg-slate-800/50 px-4 py-3 border-t border-slate-700">
            <TokenMeter tokensUsed={tokensUsed} />
            {error && (
              <div className="mt-3 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-sm text-red-300">
                {error}
              </div>
            )}
          </div>

          {/* Input */}
          <InputBox
            onSubmit={handleSendMessage}
            disabled={isLoading || isBudgetExceeded}
          />
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </>
  )
}

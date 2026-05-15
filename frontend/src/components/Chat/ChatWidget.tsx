import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
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

  const handleSendMessage = async (question: string) => {
    setError('')
    const userMessage: ConversationMessage = {
      role: 'user',
      content: question,
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

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
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center z-40"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col z-40">
          <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg font-semibold">
            Chat with Dicky
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <MessageList messages={messages} isLoading={isLoading} />
          </div>

          <div className="bg-gray-50 px-4 py-2 border-t">
            <TokenMeter tokensUsed={tokensUsed} />
            {error && (
              <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                {error}
              </div>
            )}
          </div>

          <InputBox
            onSubmit={handleSendMessage}
            disabled={isLoading || isBudgetExceeded}
            suggestions={messages.length === 0 ? SUGGESTIONS : []}
          />
        </div>
      )}
    </>
  )
}

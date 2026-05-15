import { useEffect, useRef } from 'react'
import { ConversationMessage } from '../../types'

interface MessageListProps {
  messages: ConversationMessage[]
  isLoading?: boolean
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 && !isLoading && (
        <div className="h-full flex items-center justify-center text-center text-gray-500">
          <div>
            <h3 className="text-lg font-semibold mb-2">Start a Conversation</h3>
            <p>Ask about Dicky's experience, projects, or availability</p>
            <div className="mt-4 text-sm space-y-2">
              <p>💡 Try: "Who is Dicky?"</p>
              <p>💡 Try: "What's your Go experience?"</p>
              <p>💡 Try: "When are you available?"</p>
            </div>
          </div>
        </div>
      )}

      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            <p
              className={`text-xs mt-1 ${
                msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}
            >
              {new Date(msg.timestamp || 0).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
              <div
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: '0.1s' }}
              />
              <div
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              />
            </div>
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  )
}

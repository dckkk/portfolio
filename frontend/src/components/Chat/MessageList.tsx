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
        <div className="h-full flex items-center justify-center text-center text-slate-500">
          <div>
            <div className="text-4xl mb-3">💬</div>
            <h3 className="text-lg font-semibold text-slate-400 mb-2">Start a Conversation</h3>
            <p className="text-sm">Ask about Dicky's experience, projects, or skills</p>
          </div>
        </div>
      )}

      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-message-in`}
          style={{ animationDelay: `${idx * 0.1}s` }}
        >
          <div
            className={`max-w-xs lg:max-w-sm px-4 py-3 rounded-2xl ${
              msg.role === 'user'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                : 'bg-slate-700 text-slate-100 rounded-bl-none border border-slate-600'
            }`}
          >
            <p className="text-sm leading-relaxed">{msg.content}</p>
            <p
              className={`text-xs mt-1 ${
                msg.role === 'user' ? 'text-blue-100' : 'text-slate-400'
              }`}
            >
              {new Date(msg.timestamp || 0).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-slate-700 text-slate-100 px-4 py-3 rounded-2xl rounded-bl-none border border-slate-600">
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
              <div
                className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                style={{ animationDelay: '0.1s' }}
              />
              <div
                className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              />
            </div>
          </div>
        </div>
      )}

      <div ref={endRef} />

      <style>{`
        @keyframes message-in {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-message-in {
          animation: message-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

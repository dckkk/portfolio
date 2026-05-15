import { useState, useRef } from 'react'
import { Send } from 'lucide-react'

interface InputBoxProps {
  onSubmit: (message: string) => void
  disabled?: boolean
  suggestions?: string[]
}

export function InputBox({ onSubmit, disabled = false, suggestions = [] }: InputBoxProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSubmit(input.trim())
      setInput('')
      inputRef.current?.focus()
    }
  }

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion)
    inputRef.current?.focus()
  }

  return (
    <div className="border-t border-slate-700 p-4 bg-slate-900/50">
      {suggestions.length > 0 && input === '' && (
        <div className="mb-4 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestion(suggestion)}
              className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-900/50 to-purple-900/50 hover:from-blue-800 hover:to-purple-800 text-blue-300 rounded-full transition transform hover:scale-105 border border-blue-700/50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Dicky..."
          disabled={disabled}
          className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-700/50 disabled:opacity-50 transition"
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 disabled:opacity-50 transition transform hover:scale-105 active:scale-95 flex items-center justify-center"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  )
}

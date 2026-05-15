export interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface ConversationState {
  messages: ConversationMessage[]
  tokensUsed: number
  isLoading: boolean
  error?: string
}

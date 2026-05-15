import axios, { AxiosInstance } from 'axios'

export interface Profile {
  name: string
  title: string
  location: string
  email: string
  phone: string
  summary: string
  photo_url: string
  links: {
    linkedin: string
    github: string
  }
}

export interface Experience {
  company: string
  position: string
  period: string
  location: string
  description: string
  technologies: string[]
}

export interface Skills {
  languages: string[]
  databases: string[]
  cloud: string[]
  technologies: string[]
  specializations: string[]
}

export interface ChatRequest {
  question: string
  conversation_id: string
}

export interface ChatResponse {
  answer: string
  tokens_used: number
  session_tokens_used: number
  is_in_scope: boolean
  citations: string[]
  error?: string
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp?: number
}

class APIClient {
  private client: AxiosInstance
  private conversationId: string

  constructor(baseURL: string = '/api') {
    this.client = axios.create({ baseURL })
    this.conversationId = this.getOrCreateConversationId()
  }

  private getOrCreateConversationId(): string {
    let id = sessionStorage.getItem('conversation_id')
    if (!id) {
      id = `session_${Date.now()}_${Math.random().toString(36).slice(2)}`
      sessionStorage.setItem('conversation_id', id)
    }
    return id
  }

  async getProfile(): Promise<Profile> {
    const { data } = await this.client.get<Profile>('/profile')
    return data
  }

  async getExperience(): Promise<Experience[]> {
    const { data } = await this.client.get<Experience[]>('/experience')
    return data
  }

  async getSkills(): Promise<Skills> {
    const { data } = await this.client.get<Skills>('/skills')
    return data
  }

  async chat(question: string): Promise<ChatResponse> {
    const { data } = await this.client.post<ChatResponse>('/chat', {
      question,
      conversation_id: this.conversationId
    })
    return data
  }

  async getAvailability(days: number = 7): Promise<any> {
    const { data } = await this.client.get('/availability', {
      params: { days }
    })
    return data
  }

  getConversationId(): string {
    return this.conversationId
  }
}

export const apiClient = new APIClient()

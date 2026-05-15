# API Documentation

## Base URL
- **Local Development**: `http://localhost:8000`
- **Production**: `https://api.dicky-portfolio.com` (example)

## Authentication
No authentication required. All endpoints are publicly accessible.

## Rate Limiting
- Limit: 20 requests per minute per IP
- Header: `X-RateLimit-Remaining`
- Status Code: 429 Too Many Requests (rate limit exceeded)

## Endpoints

### Profile

#### GET /api/profile
Get user profile information.

**Response (200 OK)**
```json
{
  "name": "Dicky Pratama",
  "title": "Senior Software Engineer",
  "location": "Jakarta, Indonesia",
  "email": "dickypratamss@gmail.com",
  "phone": "+6282258583938",
  "summary": "Senior Software Engineer at Grab...",
  "photo_url": "/api/photo",
  "links": {
    "linkedin": "https://www.linkedin.com/in/dicky-pratama-585840119/",
    "github": "https://github.com/dckkk"
  }
}
```

### Experience

#### GET /api/experience
Get work experience timeline.

**Response (200 OK)**
```json
[
  {
    "company": "Grab",
    "position": "Senior Software Engineer",
    "period": "May 2021 – Present",
    "location": "Jakarta, Indonesia",
    "description": "Market Intelligence team lead...",
    "technologies": ["Go", "Python", "Kafka", "Claude"]
  }
]
```

### Skills

#### GET /api/skills
Get technical skills organized by category.

**Response (200 OK)**
```json
{
  "languages": ["Go", "Python", "Java", ...],
  "databases": ["MySQL", "PostgreSQL", ...],
  "cloud": ["AWS", "GCP", ...],
  "technologies": ["Kafka", "Temporal", ...],
  "specializations": ["LLM Orchestration", "RAG Systems", ...]
}
```

### Projects

#### GET /api/projects
Get project highlights.

**Response (200 OK)**
```json
[
  {
    "title": "Market Intelligence Platform",
    "description": "Built LLM-driven system...",
    "technologies": ["Python", "Claude", "Langchain"],
    "impact": "Enable real-time market analysis..."
  }
]
```

### Chat

#### POST /api/chat
Send a message to the RAG chatbot.

**Request Body**
```json
{
  "question": "What is Dicky's Go experience?",
  "conversation_id": "session_uuid_here"
}
```

**Response (200 OK)**
```json
{
  "answer": "Dicky has extensive Go experience at Grab...",
  "tokens_used": 85,
  "session_tokens_used": 250,
  "is_in_scope": true,
  "citations": ["Grab: Senior Software Engineer", "OttoDigital: Staff Engineer"],
  "error": null
}
```

**Response (429 Too Many Requests)**
Token budget exceeded.
```json
{
  "answer": "Your token budget for this session has been exhausted...",
  "tokens_used": 0,
  "session_tokens_used": 8000,
  "is_in_scope": true,
  "citations": [],
  "error": "budget_exceeded"
}
```

**Request Query Parameters**
- `token_limit` (optional, int): Override session token limit

**Response Fields**
- `answer` (string): Generated answer from Claude
- `tokens_used` (int): Tokens used for this request
- `session_tokens_used` (int): Total tokens used in session
- `is_in_scope` (bool): Whether question is about CV/LinkedIn/Calendar
- `citations` (array): Sources cited from CV
- `error` (string, optional): Error code if any ("budget_exceeded")

### Session

#### GET /api/chat/session/{session_id}
Get session information.

**Response (200 OK)**
```json
{
  "session_id": "session_uuid_here",
  "tokens_used": 450,
  "tokens_remaining": 7550,
  "message_count": 5,
  "created_at": 1715814000.123,
  "last_access": 1715814300.456
}
```

### Availability

#### GET /api/availability
Get available time slots for discussion.

**Query Parameters**
- `days` (int, default: 7): Days to check ahead
- `duration_minutes` (int, default: 30): Meeting duration

**Response (200 OK)**
```json
{
  "timezone": "Asia/Jakarta",
  "available_slots": [
    {
      "start": "2026-05-20T09:00:00+07:00",
      "end": "2026-05-20T09:30:00+07:00",
      "duration_minutes": 30
    }
  ],
  "total_slots": 5,
  "duration_minutes": 30
}
```

### Assets

#### GET /api/photo
Get profile photo.

**Response (200 OK)**
Returns JPEG image with `Content-Type: image/jpeg`

### Health

#### GET /health
Health check endpoint.

**Response (200 OK)**
```json
{
  "status": "ok",
  "service": "dicky-portfolio-backend",
  "version": "0.1.0"
}
```

#### GET /api/status
Get API status.

**Response (200 OK)**
```json
{
  "service": "dicky-portfolio-backend",
  "status": "operational",
  "version": "0.1.0"
}
```

## Error Responses

### 400 Bad Request
Invalid request body or parameters.
```json
{
  "detail": "Invalid conversation_id"
}
```

### 422 Unprocessable Entity
Validation error.
```json
{
  "detail": [
    {
      "loc": ["body", "question"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

### 429 Too Many Requests
Rate limit exceeded.
```json
{
  "detail": "Rate limit exceeded: 20 requests per minute"
}
```

### 500 Internal Server Error
Server error.
```json
{
  "detail": "Internal server error"
}
```

## Scope Rules

The chatbot will only answer questions about:
- Dicky's work experience and job history
- Technical skills and expertise
- Projects and achievements
- Availability and calendar
- GitHub and open source
- How this website was built

Questions about other topics will receive:
```json
{
  "is_in_scope": false,
  "answer": "I can only discuss Dicky's professional experience, skills, projects, and availability. Could you ask something about those topics?"
}
```

## Session Management

- **Session TTL**: 60 minutes of inactivity
- **Token Budget**: 8000 tokens per session (~10-15 turns)
- **Token Cost**: Input + output tokens for each Claude request
- **Session ID**: Generated client-side (crypto.randomUUID or similar)

## Examples

### Example 1: Ask about experience
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What was Dicky doing at Grab?",
    "conversation_id": "user-session-123"
  }'
```

### Example 2: Check availability
```bash
curl http://localhost:8000/api/availability?days=7&duration_minutes=30
```

### Example 3: Get profile with photo
```bash
# Profile data
curl http://localhost:8000/api/profile

# Profile photo
curl http://localhost:8000/api/photo > profile.jpg
```

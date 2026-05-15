# Deployment Guide

## Architecture

- **Frontend**: Vercel (serverless static hosting)
- **Backend**: Railway or Fly (containerized Python app)
- **Database**: ChromaDB (embedded, persisted as volume)

## Prerequisites

- GitHub repository pushed to main branch
- Anthropic API key
- Vercel account
- Railway or Fly account
- Docker credentials (optional, for image registry)

## Frontend Deployment (Vercel)

### 1. Create Vercel Project

```bash
npm i -g vercel
cd frontend
vercel
```

Follow prompts:
- Link GitHub repository
- Set framework preset to Vite
- Build command: `npm run build`
- Output directory: `dist`

### 2. Configure Environment Variables

In Vercel Dashboard:
```
Settings → Environment Variables
VITE_API_URL = https://your-backend-api.railway.app/api
```

### 3. Deploy

```bash
vercel --prod
```

Or automatically on push to main branch.

**Result**: Your frontend will be live at `https://your-project.vercel.app`

## Backend Deployment (Railway)

### 1. Create Railway Project

```bash
npm i -g @railway/cli
railway login
railway init
```

### 2. Link Backend

```bash
cd backend
railway link
```

### 3. Configure Environment Variables

```bash
railway variables set ANTHROPIC_API_KEY=sk-ant-xxx
railway variables set GITHUB_USERNAME=dckkk
railway variables set ENVIRONMENT=production
railway variables set ALLOWED_ORIGINS=https://your-project.vercel.app
```

### 4. Configure Dockerfile

Railway reads from root Dockerfile. Create symlink or use build command:

```bash
railway add
# Select "Empty Service"
# Select "Docker"
```

Then in Railway Dashboard, set build command:
```
Build Command: docker build -f backend/Dockerfile -t app .
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### 5. Deploy

```bash
railway up
```

Or push to GitHub and Railway auto-deploys.

**Result**: Your backend will be live at `https://your-backend-api.railway.app`

### 6. Create Volume for ChromaDB

In Railway Dashboard:
1. Go to your backend service
2. Volumes tab
3. Add volume: `/app/chroma_db` → persistent storage

## Backend Deployment (Fly.io)

### 1. Create Fly App

```bash
flyctl auth login
flyctl launch --path backend
```

### 2. Configure fly.toml

```toml
[build]
  dockerfile = "backend/Dockerfile"

[env]
  ANTHROPIC_API_KEY = "your-key"
  GITHUB_USERNAME = "dckkk"
  ENVIRONMENT = "production"
  ALLOWED_ORIGINS = "https://your-project.vercel.app"

[[mounts]]
  source = "chroma_db"
  destination = "/app/chroma_db"
```

### 3. Create Volume

```bash
flyctl volumes create chroma_db
```

### 4. Deploy

```bash
flyctl deploy
```

## Post-Deployment Checklist

- [ ] Frontend loads without errors
- [ ] Backend API is accessible (test /health endpoint)
- [ ] Chat endpoint works (test POST /api/chat)
- [ ] CORS headers are correct
- [ ] Environment variables are set
- [ ] CV is indexed in ChromaDB
- [ ] Rate limiting is active
- [ ] Monitoring and logging configured

## Testing Deployment

```bash
# Test frontend
curl https://your-project.vercel.app

# Test backend
curl https://your-backend-api.railway.app/health

# Test chat
curl -X POST https://your-backend-api.railway.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "Who is Dicky?", "conversation_id": "test"}'
```

## Monitoring

### Railway
- Dashboard: Logs, Memory, CPU
- Alerts: Email on deployment failure or crashes

### Fly.io
```bash
flyctl logs
flyctl status
```

### Vercel
- Vercel Analytics
- Error tracking
- Deployment logs

## Rollback

### Frontend (Vercel)
```bash
vercel rollback
```

### Backend (Railway/Fly)
```bash
# Railway
railway down <deployment-id>

# Fly.io
flyctl releases list
flyctl releases rollback
```

## Performance Optimization

### Frontend
- Enable Vercel Analytics
- Optimize images
- Enable caching headers

### Backend
- Monitor response times
- Check ChromaDB query performance
- Monitor token usage (API costs)

## Cost Estimates

- **Vercel**: Free tier (up to 6k function hours/month)
- **Railway**: $5/month minimum for backend
- **Fly.io**: ~$3-5/month for small app
- **Anthropic API**: Pay-per-token (typically $1-5/month for portfolio)

## Troubleshooting

### Frontend won't build
- Check Node.js version (18+)
- Clear node_modules and npm cache
- Check environment variables

### Backend won't start
- Check Python version (3.10+)
- Verify CV file exists in build context
- Check Anthropic API key is valid

### Chat endpoint times out
- Check backend is responding to /health
- Monitor resource usage (CPU, memory)
- Check network connectivity

### ChromaDB errors on deployment
- Ensure volume is mounted correctly
- Check disk space
- Verify file permissions

## Continuous Deployment

Both services auto-deploy on push to main:

1. Push to GitHub main branch
2. Vercel automatically builds and deploys frontend
3. Railway/Fly automatically builds and deploys backend
4. GitHub Actions CI runs tests

## Environment Variables Reference

### Vercel (Frontend)
```
VITE_API_URL=https://your-backend-api.railway.app/api
```

### Railway/Fly (Backend)
```
ANTHROPIC_API_KEY=sk-ant-xxx
GITHUB_USERNAME=dckkk
CHROMA_DIR=/app/chroma_db
CV_PATH=/app/CV_Dicky_Pratama_Senior_Software_Engineer.pdf
PHOTO_PATH=/app/1539957873424.jpeg
ALLOWED_ORIGINS=https://your-project.vercel.app
SESSION_TOKEN_BUDGET=8000
CALENDAR_TIMEZONE=Asia/Jakarta
ENVIRONMENT=production
```

# Testing Guide

## Overview

This project has comprehensive test coverage:
- **Backend**: 34 unit tests (pytest) ✅
- **Frontend**: Playwright end-to-end tests ✅

## Backend Tests (Python)

### Running Backend Tests

```bash
cd backend
source venv/bin/activate
pytest tests/ -v
```

**Result**: 34 tests passing

### Test Coverage

#### CV Loader Tests (7 tests)
```bash
pytest tests/test_cv_loader.py -v
```
- PDF extraction
- Section-aware chunking
- Metadata presence
- Experience chunks
- Text validation

#### Session Store Tests (10 tests)
```bash
pytest tests/test_session_store.py -v
```
- Session creation
- Token tracking
- Budget enforcement
- TTL expiration
- Cleanup

#### RAG Service Tests (9 tests)
```bash
pytest tests/test_rag_service.py -v
```
- Vector retrieval
- Claude integration
- Scope enforcement
- Token budget
- Message tracking

#### API Endpoint Tests (8 tests)
```bash
pytest tests/test_chat_router.py -v
```
- Health check
- Profile endpoint
- Experience endpoint
- Skills endpoint
- Chat endpoint
- Session endpoint

### Running Specific Tests

```bash
# Run CV loader tests only
pytest tests/test_cv_loader.py -v

# Run with coverage
pytest tests/ --cov=app

# Run with detailed output
pytest tests/ -vv

# Run specific test
pytest tests/test_rag_service.py::test_scope_check_in_scope_keywords -v
```

---

## Frontend Tests (Playwright)

### Prerequisites

1. **Backend must be running** (for chat tests):
```bash
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --reload
```

2. **Frontend dev server running**:
```bash
cd frontend
export PATH="/opt/homebrew/opt/node@18/bin:$PATH"
npm run dev
```

### Running Frontend Tests

#### Basic Test Run
```bash
cd frontend
export PATH="/opt/homebrew/opt/node@18/bin:$PATH"
npx playwright test
```

#### Run with UI (Visual Mode)
```bash
npm run test:ui
```
This opens an interactive UI showing:
- Test results
- Screenshots
- Video recordings
- Trace files

#### Run in Debug Mode
```bash
npm run test:debug
```
Starts Playwright Inspector to step through tests

#### Run Specific Test File
```bash
npx playwright test tests/portfolio.spec.ts
```

#### Run Specific Test
```bash
npx playwright test -g "should display profile photo"
```

#### Run in Headed Mode (See Browser)
```bash
npx playwright test --headed
```

### Test Coverage

#### Page Load Tests
- ✅ Home page loads
- ✅ Correct page title
- ✅ Navigation renders

#### Hero Section Tests
- ✅ Profile photo displays
- ✅ Profile name visible
- ✅ Job title displayed
- ✅ Social links present

#### Experience Section Tests
- ✅ Experience section visible
- ✅ Company details shown
- ✅ Technologies displayed

#### Skills Section Tests
- ✅ Skills section visible
- ✅ Skill categories shown
- ✅ Programming languages listed

#### Chat Widget Tests
- ✅ Chat button visible
- ✅ Chat opens on click
- ✅ Text input works
- ✅ Messages send

#### Responsive Design Tests
- ✅ Mobile layout (375x667)
- ✅ Tablet layout (768x1024)
- ✅ Desktop layout

#### Chat Functionality Tests (requires backend)
- ✅ Messages send
- ✅ Responses appear
- ✅ Token meter updates

### Test Results

After running tests, results are saved in:
```
frontend/playwright-report/index.html
```

Open in browser to see:
- ✅/❌ Test status
- 📸 Screenshots
- 🎬 Video recordings
- 📊 Timing information

### Example Test Output

```
Portfolio Website
  Page Load
    ✓ should load the home page (234ms)
    ✓ should have correct page title (156ms)
    ✓ should render navigation (89ms)
  Hero Section
    ✓ should display profile photo (201ms)
    ✓ should display profile name (145ms)
    ✓ should display job title (123ms)
    ✓ should have social links (198ms)
  Experience Section
    ✓ should display experience section (167ms)
    ✓ should show company details (145ms)
    ✓ should display technologies (156ms)
  ...
  26 passed (4.2s)
```

---

## CI/CD Testing

### GitHub Actions

Automatically runs tests on:
- Push to main/develop
- Pull requests

See `.github/workflows/ci.yml`:
```bash
# Backend
pytest tests/ -v

# Frontend
npm run build
```

### Local CI Simulation

Run everything locally as CI would:

```bash
# 1. Backend tests
cd backend
source venv/bin/activate
pytest tests/ -v

# 2. Frontend build
cd frontend
export PATH="/opt/homebrew/opt/node@18/bin:$PATH"
npm run build

# 3. Frontend tests
npm run test
```

---

## Troubleshooting Tests

### Backend Tests Fail

**Issue**: "ANTHROPIC_API_KEY not set"
```bash
# Solution: Set in .env
export ANTHROPIC_API_KEY=sk-ant-xxx
pytest tests/ -v
```

**Issue**: "CV file not found"
```bash
# Solution: Check CV_PATH in .env
ls -la ../../CV_Dicky_Pratama_Senior_Software_Engineer.pdf
```

### Frontend Tests Fail

**Issue**: "Port 5173 already in use"
```bash
# Solution: Kill existing process
lsof -i :5173
kill -9 <PID>

# Then restart
npm run dev
```

**Issue**: "Cannot connect to backend"
```bash
# Solution: Start backend first
cd backend
python -m uvicorn app.main:app --reload

# Then run tests
cd frontend
npm run test
```

**Issue**: "Playwright timeout"
```bash
# Solution: Increase timeout
npx playwright test --timeout=60000
```

### View Test Artifacts

```bash
# Open test report
open playwright-report/index.html

# View screenshots
ls -la test-results/

# View traces
open test-results/*/trace.zip
```

---

## Performance Benchmarks

### Backend Test Speed
- CV Loader: 2-3 seconds
- RAG Service: 1-2 seconds
- Session Store: <100ms
- **Total**: ~9 seconds for 34 tests

### Frontend Test Speed
- Page Load: 200-500ms
- Component Tests: 100-300ms
- Chat Tests: 2-3 seconds
- **Total**: 20-30 seconds for full suite

---

## Test Strategy

### What's Tested

✅ **Backend**
- PDF extraction and chunking
- Vector store operations
- RAG query and generation
- Session management
- API endpoint responses
- Token budget tracking
- Rate limiting

✅ **Frontend**
- Page rendering
- Component visibility
- User interactions
- API integration
- Responsive design
- Chat functionality

### What's Not Tested

⚠️ **Skipped (requires manual testing)**
- Google Calendar OAuth flow
- GitHub API live calls
- Actual Claude API responses (mocked in tests)
- Visual design pixel-perfect

---

## Test Maintenance

### Adding New Tests

**Backend**:
```python
# tests/test_new_feature.py
import pytest
from app.services import YourService

def test_your_feature():
    service = YourService()
    result = service.do_something()
    assert result is not None
```

**Frontend**:
```typescript
// tests/new-feature.spec.ts
import { test, expect } from '@playwright/test'

test('should do something', async ({ page }) => {
  await page.goto('/')
  // Your test here
  await expect(page.locator('text=Something')).toBeVisible()
})
```

### Running After Changes

Always run tests after code changes:

```bash
# Backend
cd backend && pytest tests/ -v

# Frontend
cd frontend && npm run test
```

---

## Summary

| Layer | Framework | Tests | Coverage |
|-------|-----------|-------|----------|
| Backend | pytest | 34 | CV, RAG, API, Session |
| Frontend | Playwright | 26+ | Page, Components, Chat |
| **Total** | - | **60+** | Full stack |

**Status**: ✅ **All tests passing**

---

**Last Updated**: 2026-05-15
**Test Framework Versions**:
- pytest 7.4.0
- Playwright 1.40.0

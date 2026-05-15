# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> Portfolio Website >> Experience Section >> should show company details
- Location: tests/portfolio.spec.ts:59:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Grab')
Expected: visible
Error: strict mode violation: locator('text=Grab') resolved to 2 elements:
    1) <p class="text-lg text-slate-300 leading-relaxed text-center backdrop-blur-md bg-slate-800/50 p-8 rounded-xl border border-slate-700">Senior Software Engineer at Grab specializing in …</p> aka getByText('Senior Software Engineer at')
    2) <p class="text-blue-300 font-semibold">Grab</p> aka getByText('Grab', { exact: true })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Grab')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e5]:
      - heading "Dicky Pratama" [level=1] [ref=e6]
      - generic [ref=e7]:
        - link "Experience" [ref=e8] [cursor=pointer]:
          - /url: "#experience"
        - link "Skills" [ref=e9] [cursor=pointer]:
          - /url: "#skills"
        - link "Architecture" [ref=e10] [cursor=pointer]:
          - /url: "#architecture"
  - main [ref=e11]:
    - generic [ref=e13]:
      - img "Dicky Pratama" [ref=e18]
      - generic [ref=e19]:
        - heading "Dicky Pratama" [level=1] [ref=e20]
        - paragraph [ref=e21]: Senior Software Engineer
        - paragraph [ref=e22]: 📍 Jakarta, Indonesia
      - generic [ref=e23]:
        - link "Get in Touch" [ref=e24] [cursor=pointer]:
          - /url: mailto:dickypratamss@gmail.com
          - img [ref=e25]
          - text: Get in Touch
        - link "LinkedIn" [ref=e28] [cursor=pointer]:
          - /url: https://www.linkedin.com/in/dicky-pratama-585840119/
          - img [ref=e29]
          - text: LinkedIn
        - link "GitHub" [ref=e33] [cursor=pointer]:
          - /url: https://github.com/dckkk
          - img [ref=e34]
          - text: GitHub
      - paragraph [ref=e38]: Senior Software Engineer at Grab specializing in Market Intelligence, LLM-driven automation, and high-frequency data pipelines. Experienced in building scalable systems with Go, Python, and cloud technologies.
      - generic [ref=e39]:
        - paragraph [ref=e40]: Scroll to explore
        - generic [ref=e41]: ↓
    - generic [ref=e43]:
      - heading "Experience" [level=2] [ref=e44]
      - paragraph [ref=e45]: My professional journey and key roles
      - generic [ref=e46]:
        - generic [ref=e49]:
          - generic [ref=e50]:
            - generic [ref=e51]:
              - heading "Senior Software Engineer" [level=3] [ref=e52]
              - paragraph [ref=e53]: Grab
              - paragraph [ref=e54]: Jakarta, Indonesia
            - generic [ref=e55]: May 2021 – Present
          - paragraph [ref=e56]: Market Intelligence team lead. Built LLM-driven automation systems generating ~12K hourly competitor insights using Claude agents. Led development of high-frequency data pipelines processing market data at scale.
          - generic [ref=e57]:
            - generic [ref=e58]: Go
            - generic [ref=e59]: Python
            - generic [ref=e60]: Kafka
            - generic [ref=e61]: Pinecone
            - generic [ref=e62]: Claude
            - generic [ref=e63]: Kubernetes
        - generic [ref=e66]:
          - generic [ref=e67]:
            - generic [ref=e68]:
              - heading "Staff Engineer" [level=3] [ref=e69]
              - paragraph [ref=e70]: OttoDigital
              - paragraph [ref=e71]: Jakarta, Indonesia
            - generic [ref=e72]: 2019 – May 2021
          - paragraph [ref=e73]: Led fintech platform development for payment systems. Architected and built high-scale systems handling millions of transactions daily.
          - generic [ref=e74]:
            - generic [ref=e75]: Go
            - generic [ref=e76]: Python
            - generic [ref=e77]: PostgreSQL
            - generic [ref=e78]: Temporal
            - generic [ref=e79]: gRPC
        - generic [ref=e82]:
          - generic [ref=e83]:
            - generic [ref=e84]:
              - heading "Consulting Engineer" [level=3] [ref=e85]
              - paragraph [ref=e86]: Bank Sinarmas
              - paragraph [ref=e87]: Jakarta, Indonesia
            - generic [ref=e88]: 2018 – 2019
          - paragraph [ref=e89]: Optimization and modernization consulting for banking infrastructure. Achieved significant cost reduction through system improvements.
          - generic [ref=e90]:
            - generic [ref=e91]: Java
            - generic [ref=e92]: SQL
            - generic [ref=e93]: AWS
    - generic [ref=e95]:
      - heading "Skills" [level=2] [ref=e96]
      - paragraph [ref=e97]: Technologies and expertise
      - generic [ref=e98]:
        - generic [ref=e100]:
          - heading "🗣️ Languages" [level=3] [ref=e101]
          - generic [ref=e102]:
            - generic [ref=e103]: Go
            - generic [ref=e104]: Python
            - generic [ref=e105]: Java
            - generic [ref=e106]: PHP
            - generic [ref=e107]: SQL
            - generic [ref=e108]: JavaScript
            - generic [ref=e109]: Terraform
        - generic [ref=e111]:
          - heading "💾 Databases" [level=3] [ref=e112]
          - generic [ref=e113]:
            - generic [ref=e114]: MySQL
            - generic [ref=e115]: PostgreSQL
            - generic [ref=e116]: MongoDB
            - generic [ref=e117]: Redis
        - generic [ref=e119]:
          - heading "☁️ Cloud" [level=3] [ref=e120]
          - generic [ref=e121]:
            - generic [ref=e122]: AWS
            - generic [ref=e123]: GCP
            - generic [ref=e124]: Kubernetes
            - generic [ref=e125]: Docker
        - generic [ref=e127]:
          - heading "🔧 Technologies" [level=3] [ref=e128]
          - generic [ref=e129]:
            - generic [ref=e130]: Kafka
            - generic [ref=e131]: Temporal
            - generic [ref=e132]: gRPC
            - generic [ref=e133]: Langchain
            - generic [ref=e134]: n8n
        - generic [ref=e136]:
          - heading "⚡ Specializations" [level=3] [ref=e137]
          - generic [ref=e138]:
            - generic [ref=e139]: LLM Orchestration
            - generic [ref=e140]: RAG Systems
            - generic [ref=e141]: Vector Databases
            - generic [ref=e142]: Prompt Engineering
            - generic [ref=e143]: Agentic Workflows
            - generic [ref=e144]: Reverse Engineering
    - generic [ref=e146]:
      - heading "Architecture" [level=2] [ref=e147]
      - paragraph [ref=e148]: End-to-end system design with RAG-powered AI assistant
      - paragraph [ref=e149]: This is the architecture used to build this website
      - img [ref=e151]:
        - generic [ref=e152]: End-to-End Architecture Flow
        - generic [ref=e154]: 👤 User Browser
        - generic [ref=e155]: HTTP/HTTPS
        - generic [ref=e157]: 🎨 React Frontend (Vite + TypeScript)
        - generic [ref=e158]: Chat Widget | Profile | Skills | Experience
        - generic [ref=e162]: Profile API
        - generic [ref=e163]: Skills, Experience
        - generic [ref=e165]: Chat API
        - generic [ref=e166]: RAG Engine
        - generic [ref=e168]: Availability API
        - generic [ref=e169]: Google Calendar
        - generic [ref=e171]: Profile Service
        - generic [ref=e172]: JSON Data Store
        - generic [ref=e174]: RAG Service
        - generic [ref=e175]: Vector Search
        - generic [ref=e176]: + Claude Haiku
        - generic [ref=e178]: Calendar Service
        - generic [ref=e179]: Google API
        - generic [ref=e185]: ChromaDB
        - generic [ref=e186]: Vector Store
        - generic [ref=e188]: CV Loader
        - generic [ref=e189]: PDF Parser
        - generic [ref=e191]: MiniLM
        - generic [ref=e192]: Embeddings
        - generic [ref=e194]: Google API
        - generic [ref=e195]: Calendar Data
        - generic [ref=e197]: Anthropic API
        - generic [ref=e198]: Claude Haiku
        - generic [ref=e200]: Session Store
        - generic [ref=e201]: Token Budget
        - generic [ref=e203]: Token Tracking
        - generic [ref=e204]:
          - generic [ref=e205]: "Legend:"
          - generic [ref=e207]: User Layer
          - generic [ref=e209]: Frontend
          - generic [ref=e211]: Service
          - generic [ref=e213]: Data/Storage
          - generic [ref=e215]: External API
      - generic [ref=e216]:
        - generic [ref=e217]:
          - heading "🎨 Frontend Stack" [level=4] [ref=e218]
          - list [ref=e219]:
            - listitem [ref=e220]: • React 18 + TypeScript
            - listitem [ref=e221]: • Vite bundler
            - listitem [ref=e222]: • Tailwind CSS
            - listitem [ref=e223]: • Context API state
        - generic [ref=e224]:
          - heading "⚙️ Backend Stack" [level=4] [ref=e225]
          - list [ref=e226]:
            - listitem [ref=e227]: • FastAPI (Python)
            - listitem [ref=e228]: • Langchain orchestration
            - listitem [ref=e229]: • ChromaDB + MiniLM
            - listitem [ref=e230]: • Session management
        - generic [ref=e231]:
          - heading "🔌 Integrations" [level=4] [ref=e232]
          - list [ref=e233]:
            - listitem [ref=e234]: • Anthropic Claude Haiku
            - listitem [ref=e235]: • Vector embeddings (MiniLM)
            - listitem [ref=e236]: • PDF processing (PyPDF)
            - listitem [ref=e237]: • Session management
      - paragraph [ref=e239]: 📅 Google Calendar Integration - Coming soon to show real-time availability based on calendar events
      - generic [ref=e240]:
        - heading "RAG Query Flow" [level=3] [ref=e241]
        - generic [ref=e242]:
          - generic [ref=e243]:
            - generic [ref=e244]: 1. Query
            - generic [ref=e245]: User question → Frontend sends to Chat API
          - generic [ref=e246]:
            - generic [ref=e247]: 2. Retrieve
            - generic [ref=e248]: ChromaDB + MiniLM finds relevant CV chunks (semantic search)
          - generic [ref=e249]:
            - generic [ref=e250]: 3. Augment
            - generic [ref=e251]: Context chunks added to Claude prompt + conversation history
          - generic [ref=e252]:
            - generic [ref=e253]: 4. Generate
            - generic [ref=e254]: Claude Haiku generates concise answer (≤250 tokens)
          - generic [ref=e255]:
            - generic [ref=e256]: 5. Track
            - generic [ref=e257]: Session store tracks tokens, enforces 8000 token budget
  - contentinfo [ref=e258]:
    - paragraph [ref=e260]: © 2026 Dicky Pratama. Built with React, Langchain, and Claude AI.
  - generic [ref=e261]:
    - generic [ref=e263]: Chat with Dicky's AI Assistant
    - button [ref=e266] [cursor=pointer]:
      - img [ref=e267]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | 
  3   | test.describe('Portfolio Website', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.goto('/')
  6   |     // Wait for content to load
  7   |     await page.waitForLoadState('networkidle')
  8   |   })
  9   | 
  10  |   test.describe('Page Load', () => {
  11  |     test('should load the home page', async ({ page }) => {
  12  |       expect(page.url()).toContain('localhost:5173')
  13  |     })
  14  | 
  15  |     test('should have correct page title', async ({ page }) => {
  16  |       await expect(page).toHaveTitle(/Dicky Pratama/)
  17  |     })
  18  | 
  19  |     test('should render navigation', async ({ page }) => {
  20  |       const nav = page.locator('nav')
  21  |       await expect(nav).toBeVisible()
  22  |     })
  23  |   })
  24  | 
  25  |   test.describe('Hero Section', () => {
  26  |     test('should display profile photo', async ({ page }) => {
  27  |       const photo = page.locator('img').first()
  28  |       await expect(photo).toBeVisible()
  29  |       // Check image loaded
  30  |       const src = await photo.getAttribute('src')
  31  |       expect(src).toBeTruthy()
  32  |     })
  33  | 
  34  |     test('should display profile name', async ({ page }) => {
  35  |       const name = page.locator('h1')
  36  |       await expect(name).toContainText(/Dicky/)
  37  |     })
  38  | 
  39  |     test('should display job title', async ({ page }) => {
  40  |       const title = page.locator('text=Senior Software Engineer')
  41  |       await expect(title).toBeVisible()
  42  |     })
  43  | 
  44  |     test('should have social links', async ({ page }) => {
  45  |       const linkedinLink = page.locator('a[href*="linkedin"]')
  46  |       const githubLink = page.locator('a[href*="github"]')
  47  |       
  48  |       await expect(linkedinLink).toBeVisible()
  49  |       await expect(githubLink).toBeVisible()
  50  |     })
  51  |   })
  52  | 
  53  |   test.describe('Experience Section', () => {
  54  |     test('should display experience section', async ({ page }) => {
  55  |       const heading = page.locator('text=Experience')
  56  |       await expect(heading).toBeVisible()
  57  |     })
  58  | 
  59  |     test('should show company details', async ({ page }) => {
  60  |       const company = page.locator('text=Grab')
> 61  |       await expect(company).toBeVisible()
      |                             ^ Error: expect(locator).toBeVisible() failed
  62  |     })
  63  | 
  64  |     test('should display technologies', async ({ page }) => {
  65  |       const tech = page.locator('text=Go').or(page.locator('text=Python'))
  66  |       await expect(tech.first()).toBeVisible()
  67  |     })
  68  |   })
  69  | 
  70  |   test.describe('Skills Section', () => {
  71  |     test('should display skills section', async ({ page }) => {
  72  |       const heading = page.locator('text=Skills')
  73  |       await expect(heading).toBeVisible()
  74  |     })
  75  | 
  76  |     test('should show skill categories', async ({ page }) => {
  77  |       await page.locator('text=Languages').scrollIntoViewIfNeeded()
  78  |       const languages = page.locator('text=Languages')
  79  |       await expect(languages).toBeVisible()
  80  |     })
  81  | 
  82  |     test('should display programming languages', async ({ page }) => {
  83  |       await page.locator('text=Languages').scrollIntoViewIfNeeded()
  84  |       const go = page.locator('text=Go').first()
  85  |       await expect(go).toBeVisible()
  86  |     })
  87  |   })
  88  | 
  89  |   test.describe('Chat Widget', () => {
  90  |     test('should display chat button', async ({ page }) => {
  91  |       const chatButton = page.locator('[class*="fixed"][class*="bottom"]').first()
  92  |       // Chat widget should be visible
  93  |       const messageCircle = page.locator('svg').filter({ has: page.locator('path') })
  94  |       expect(messageCircle.count()).toBeGreaterThan(0)
  95  |     })
  96  | 
  97  |     test('should open chat widget on click', async ({ page }) => {
  98  |       // Find and click chat button
  99  |       const chatButton = page.locator('button').filter({ 
  100 |         has: page.locator('svg') 
  101 |       }).last()
  102 |       
  103 |       if (await chatButton.isVisible()) {
  104 |         await chatButton.click()
  105 |         // Wait for chat window to open
  106 |         await page.waitForTimeout(500)
  107 |       }
  108 |     })
  109 | 
  110 |     test('should allow typing in chat', async ({ page }) => {
  111 |       // Open chat
  112 |       const chatButton = page.locator('button').filter({ 
  113 |         has: page.locator('svg') 
  114 |       }).last()
  115 |       
  116 |       if (await chatButton.isVisible()) {
  117 |         await chatButton.click()
  118 |         await page.waitForTimeout(500)
  119 |         
  120 |         // Find input field
  121 |         const input = page.locator('input[placeholder*="Ask"]').first()
  122 |         if (await input.isVisible()) {
  123 |           await input.fill('Who is Dicky?')
  124 |           expect(await input.inputValue()).toContain('Dicky')
  125 |         }
  126 |       }
  127 |     })
  128 |   })
  129 | 
  130 |   test.describe('API Integration', () => {
  131 |     test('should fetch profile data', async ({ page }) => {
  132 |       // Check that profile was loaded via API
  133 |       const name = page.locator('text=Dicky Pratama')
  134 |       await expect(name).toBeVisible()
  135 |     })
  136 | 
  137 |     test('should handle navigation links', async ({ page }) => {
  138 |       const experienceLink = page.locator('a[href*="#experience"]')
  139 |       if (await experienceLink.isVisible()) {
  140 |         await experienceLink.click()
  141 |         // Page should scroll to experience section
  142 |         const experienceHeading = page.locator('text=Experience')
  143 |         await expect(experienceHeading).toBeInViewport()
  144 |       }
  145 |     })
  146 |   })
  147 | 
  148 |   test.describe('Responsive Design', () => {
  149 |     test('should be responsive on mobile', async ({ browser }) => {
  150 |       const context = await browser.createContext({
  151 |         viewport: { width: 375, height: 667 },
  152 |       })
  153 |       const page = await context.newPage()
  154 |       await page.goto('/')
  155 |       await page.waitForLoadState('networkidle')
  156 | 
  157 |       // Check main content is visible
  158 |       const heading = page.locator('h1')
  159 |       await expect(heading).toBeVisible()
  160 | 
  161 |       await context.close()
```
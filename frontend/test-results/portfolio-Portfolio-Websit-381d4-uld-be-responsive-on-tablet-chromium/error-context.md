# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> Portfolio Website >> Responsive Design >> should be responsive on tablet
- Location: tests/portfolio.spec.ts:164:5

# Error details

```
TypeError: browser.createContext is not a function
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
      - img [ref=e150]:
        - generic [ref=e151]: End-to-End Architecture Flow
        - generic [ref=e153]: 👤 User Browser
        - generic [ref=e154]: HTTP/HTTPS
        - generic [ref=e156]: 🎨 React Frontend (Vite + TypeScript)
        - generic [ref=e157]: Chat Widget | Profile | Skills | Experience
        - generic [ref=e161]: Profile API
        - generic [ref=e162]: Skills, Experience
        - generic [ref=e164]: Chat API
        - generic [ref=e165]: RAG Engine
        - generic [ref=e167]: Availability API
        - generic [ref=e168]: Google Calendar
        - generic [ref=e170]: Profile Service
        - generic [ref=e171]: JSON Data Store
        - generic [ref=e173]: RAG Service
        - generic [ref=e174]: Vector Search
        - generic [ref=e175]: + Claude Haiku
        - generic [ref=e177]: Calendar Service
        - generic [ref=e178]: Google API
        - generic [ref=e182]: ChromaDB
        - generic [ref=e183]: Vector Store
        - generic [ref=e185]: CV Loader
        - generic [ref=e186]: PDF Parser
        - generic [ref=e188]: MiniLM
        - generic [ref=e189]: Embeddings
        - generic [ref=e191]: Google API
        - generic [ref=e192]: Calendar Data
        - generic [ref=e195]: Anthropic API
        - generic [ref=e196]: Claude Haiku
        - generic [ref=e198]: Session Store
        - generic [ref=e199]: Token Budget
        - generic [ref=e201]: Token Tracking
        - generic [ref=e202]:
          - generic [ref=e203]: "Legend:"
          - generic [ref=e205]: User Layer
          - generic [ref=e207]: Frontend
          - generic [ref=e209]: Service Layer
          - generic [ref=e211]: Data/Storage
          - generic [ref=e213]: External APIs
      - generic [ref=e214]:
        - generic [ref=e215]:
          - heading "🎨 Frontend Stack" [level=4] [ref=e216]
          - list [ref=e217]:
            - listitem [ref=e218]: • React 18 + TypeScript
            - listitem [ref=e219]: • Vite bundler
            - listitem [ref=e220]: • Tailwind CSS
            - listitem [ref=e221]: • Context API state
        - generic [ref=e222]:
          - heading "⚙️ Backend Stack" [level=4] [ref=e223]
          - list [ref=e224]:
            - listitem [ref=e225]: • FastAPI (Python)
            - listitem [ref=e226]: • Langchain orchestration
            - listitem [ref=e227]: • ChromaDB + MiniLM
            - listitem [ref=e228]: • Session management
        - generic [ref=e229]:
          - heading "🔌 Integrations" [level=4] [ref=e230]
          - list [ref=e231]:
            - listitem [ref=e232]: • Anthropic Claude Haiku
            - listitem [ref=e233]: • Vector embeddings (MiniLM)
            - listitem [ref=e234]: • PDF processing (PyPDF)
            - listitem [ref=e235]: • Session management
      - generic [ref=e236]:
        - heading "RAG Query Flow" [level=3] [ref=e237]
        - generic [ref=e238]:
          - generic [ref=e239]:
            - generic [ref=e240]: 1. Query
            - generic [ref=e241]: User question → Frontend sends to Chat API
          - generic [ref=e242]:
            - generic [ref=e243]: 2. Retrieve
            - generic [ref=e244]: ChromaDB + MiniLM finds relevant CV chunks (semantic search)
          - generic [ref=e245]:
            - generic [ref=e246]: 3. Augment
            - generic [ref=e247]: Context chunks added to Claude prompt + conversation history
          - generic [ref=e248]:
            - generic [ref=e249]: 4. Generate
            - generic [ref=e250]: Claude Haiku generates concise answer (≤250 tokens)
          - generic [ref=e251]:
            - generic [ref=e252]: 5. Track
            - generic [ref=e253]: Session store tracks tokens, enforces 8000 token budget
  - contentinfo [ref=e254]:
    - paragraph [ref=e256]: © 2026 Dicky Pratama. Built with React, Langchain, and Claude AI.
  - button [ref=e257] [cursor=pointer]:
    - generic [ref=e258]:
      - img [ref=e259]
      - img [ref=e261]
```

# Test source

```ts
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
  162 |     })
  163 | 
  164 |     test('should be responsive on tablet', async ({ browser }) => {
> 165 |       const context = await browser.createContext({
      |                                     ^ TypeError: browser.createContext is not a function
  166 |         viewport: { width: 768, height: 1024 },
  167 |       })
  168 |       const page = await context.newPage()
  169 |       await page.goto('/')
  170 |       await page.waitForLoadState('networkidle')
  171 | 
  172 |       const heading = page.locator('h1')
  173 |       await expect(heading).toBeVisible()
  174 | 
  175 |       await context.close()
  176 |     })
  177 |   })
  178 | })
  179 | 
  180 | test.describe('Chat Functionality (requires backend)', () => {
  181 |   test.beforeEach(async ({ page }) => {
  182 |     await page.goto('/')
  183 |     await page.waitForLoadState('networkidle')
  184 |   })
  185 | 
  186 |   test('chat should send message', async ({ page }) => {
  187 |     // This test requires backend to be running
  188 |     const chatButton = page.locator('button').filter({ 
  189 |       has: page.locator('svg') 
  190 |     }).last()
  191 |     
  192 |     if (await chatButton.isVisible()) {
  193 |       await chatButton.click()
  194 |       await page.waitForTimeout(500)
  195 |       
  196 |       const input = page.locator('input[placeholder*="Ask"]').first()
  197 |       if (await input.isVisible()) {
  198 |         await input.fill('Hello')
  199 |         const sendButton = page.locator('button').filter({ 
  200 |           has: page.locator('svg[class*="Send"]') 
  201 |         }).last()
  202 |         
  203 |         if (await sendButton.isVisible()) {
  204 |           await sendButton.click()
  205 |           // Wait for response
  206 |           await page.waitForTimeout(2000)
  207 |           
  208 |           // Check that message appears in chat
  209 |           const userMessage = page.locator('text=Hello')
  210 |           expect(await userMessage.count()).toBeGreaterThan(0)
  211 |         }
  212 |       }
  213 |     }
  214 |   }, { timeout: 30000 })
  215 | })
  216 | 
```
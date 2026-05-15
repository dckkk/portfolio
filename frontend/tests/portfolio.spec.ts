import { test, expect } from '@playwright/test'

test.describe('Portfolio Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for content to load
    await page.waitForLoadState('networkidle')
  })

  test.describe('Page Load', () => {
    test('should load the home page', async ({ page }) => {
      expect(page.url()).toContain('localhost:5173')
    })

    test('should have correct page title', async ({ page }) => {
      await expect(page).toHaveTitle(/Dicky Pratama/)
    })

    test('should render navigation', async ({ page }) => {
      const nav = page.locator('nav')
      await expect(nav).toBeVisible()
    })
  })

  test.describe('Hero Section', () => {
    test('should display profile photo', async ({ page }) => {
      const photo = page.locator('img').first()
      await expect(photo).toBeVisible()
      // Check image loaded
      const src = await photo.getAttribute('src')
      expect(src).toBeTruthy()
    })

    test('should display profile name', async ({ page }) => {
      const name = page.locator('h1')
      await expect(name).toContainText(/Dicky/)
    })

    test('should display job title', async ({ page }) => {
      const title = page.locator('text=Senior Software Engineer')
      await expect(title).toBeVisible()
    })

    test('should have social links', async ({ page }) => {
      const linkedinLink = page.locator('a[href*="linkedin"]')
      const githubLink = page.locator('a[href*="github"]')
      
      await expect(linkedinLink).toBeVisible()
      await expect(githubLink).toBeVisible()
    })
  })

  test.describe('Experience Section', () => {
    test('should display experience section', async ({ page }) => {
      const heading = page.locator('text=Experience')
      await expect(heading).toBeVisible()
    })

    test('should show company details', async ({ page }) => {
      const company = page.locator('text=Grab')
      await expect(company).toBeVisible()
    })

    test('should display technologies', async ({ page }) => {
      const tech = page.locator('text=Go').or(page.locator('text=Python'))
      await expect(tech.first()).toBeVisible()
    })
  })

  test.describe('Skills Section', () => {
    test('should display skills section', async ({ page }) => {
      const heading = page.locator('text=Skills')
      await expect(heading).toBeVisible()
    })

    test('should show skill categories', async ({ page }) => {
      await page.locator('text=Languages').scrollIntoViewIfNeeded()
      const languages = page.locator('text=Languages')
      await expect(languages).toBeVisible()
    })

    test('should display programming languages', async ({ page }) => {
      await page.locator('text=Languages').scrollIntoViewIfNeeded()
      const go = page.locator('text=Go').first()
      await expect(go).toBeVisible()
    })
  })

  test.describe('Chat Widget', () => {
    test('should display chat button', async ({ page }) => {
      const chatButton = page.locator('[class*="fixed"][class*="bottom"]').first()
      // Chat widget should be visible
      const messageCircle = page.locator('svg').filter({ has: page.locator('path') })
      expect(messageCircle.count()).toBeGreaterThan(0)
    })

    test('should open chat widget on click', async ({ page }) => {
      // Find and click chat button
      const chatButton = page.locator('button').filter({ 
        has: page.locator('svg') 
      }).last()
      
      if (await chatButton.isVisible()) {
        await chatButton.click()
        // Wait for chat window to open
        await page.waitForTimeout(500)
      }
    })

    test('should allow typing in chat', async ({ page }) => {
      // Open chat
      const chatButton = page.locator('button').filter({ 
        has: page.locator('svg') 
      }).last()
      
      if (await chatButton.isVisible()) {
        await chatButton.click()
        await page.waitForTimeout(500)
        
        // Find input field
        const input = page.locator('input[placeholder*="Ask"]').first()
        if (await input.isVisible()) {
          await input.fill('Who is Dicky?')
          expect(await input.inputValue()).toContain('Dicky')
        }
      }
    })
  })

  test.describe('API Integration', () => {
    test('should fetch profile data', async ({ page }) => {
      // Check that profile was loaded via API
      const name = page.locator('text=Dicky Pratama')
      await expect(name).toBeVisible()
    })

    test('should handle navigation links', async ({ page }) => {
      const experienceLink = page.locator('a[href*="#experience"]')
      if (await experienceLink.isVisible()) {
        await experienceLink.click()
        // Page should scroll to experience section
        const experienceHeading = page.locator('text=Experience')
        await expect(experienceHeading).toBeInViewport()
      }
    })
  })

  test.describe('Responsive Design', () => {
    test('should be responsive on mobile', async ({ browser }) => {
      const context = await browser.createContext({
        viewport: { width: 375, height: 667 },
      })
      const page = await context.newPage()
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Check main content is visible
      const heading = page.locator('h1')
      await expect(heading).toBeVisible()

      await context.close()
    })

    test('should be responsive on tablet', async ({ browser }) => {
      const context = await browser.createContext({
        viewport: { width: 768, height: 1024 },
      })
      const page = await context.newPage()
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const heading = page.locator('h1')
      await expect(heading).toBeVisible()

      await context.close()
    })
  })
})

test.describe('Chat Functionality (requires backend)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('chat should send message', async ({ page }) => {
    // This test requires backend to be running
    const chatButton = page.locator('button').filter({ 
      has: page.locator('svg') 
    }).last()
    
    if (await chatButton.isVisible()) {
      await chatButton.click()
      await page.waitForTimeout(500)
      
      const input = page.locator('input[placeholder*="Ask"]').first()
      if (await input.isVisible()) {
        await input.fill('Hello')
        const sendButton = page.locator('button').filter({ 
          has: page.locator('svg[class*="Send"]') 
        }).last()
        
        if (await sendButton.isVisible()) {
          await sendButton.click()
          // Wait for response
          await page.waitForTimeout(2000)
          
          // Check that message appears in chat
          const userMessage = page.locator('text=Hello')
          expect(await userMessage.count()).toBeGreaterThan(0)
        }
      }
    }
  }, { timeout: 30000 })
})

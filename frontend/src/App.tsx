import { Hero } from './components/Hero'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Architecture } from './components/Architecture'
import { ChatWidget } from './components/Chat'

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-gray-900 text-white px-4 py-4 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Dicky Pratama</h1>
          <div className="flex gap-4 text-sm">
            <a href="#experience" className="hover:text-blue-400 transition">
              Experience
            </a>
            <a href="#skills" className="hover:text-blue-400 transition">
              Skills
            </a>
            <a href="#architecture" className="hover:text-blue-400 transition">
              Architecture
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Hero />

        <div id="experience" className="bg-gray-50">
          <Experience />
        </div>

        <div id="skills">
          <Skills />
        </div>

        <div id="architecture" className="bg-gray-50">
          <Architecture />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-400">
          <p>© 2026 Dicky Pratama. Built with React, Langchain, and Claude AI.</p>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}

export default App

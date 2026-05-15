export function Architecture() {
  return (
    <div className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Architecture
      </h2>
      <p className="text-slate-400 mb-12">High-level system design and technology stack</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Frontend */}
        <div className="border border-blue-500/30 rounded-lg p-6 bg-gradient-to-b from-blue-900/20 to-transparent hover:border-blue-500 transition">
          <div className="text-2xl mb-3">🎨</div>
          <h3 className="text-lg font-bold text-blue-300 mb-3">Frontend</h3>
          <div className="space-y-2 text-sm text-slate-300">
            <div>React 18 + TypeScript</div>
            <div>Vite bundler</div>
            <div>Tailwind CSS</div>
            <div>Axios HTTP client</div>
          </div>
        </div>

        {/* Backend */}
        <div className="border border-purple-500/30 rounded-lg p-6 bg-gradient-to-b from-purple-900/20 to-transparent hover:border-purple-500 transition">
          <div className="text-2xl mb-3">⚙️</div>
          <h3 className="text-lg font-bold text-purple-300 mb-3">Backend</h3>
          <div className="space-y-2 text-sm text-slate-300">
            <div>FastAPI (Python)</div>
            <div>Langchain for LLM</div>
            <div>ChromaDB + MiniLM</div>
            <div>Claude Haiku 4.5</div>
          </div>
        </div>

        {/* Integrations */}
        <div className="border border-green-500/30 rounded-lg p-6 bg-gradient-to-b from-green-900/20 to-transparent hover:border-green-500 transition">
          <div className="text-2xl mb-3">🔌</div>
          <h3 className="text-lg font-bold text-green-300 mb-3">Integrations</h3>
          <div className="space-y-2 text-sm text-slate-300">
            <div>Google Calendar API</div>
            <div>GitHub API</div>
            <div>Anthropic API</div>
            <div>Vector embeddings</div>
          </div>
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 mb-12">
        <h3 className="text-lg font-bold text-blue-300 mb-6">System Flow</h3>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-20 text-center">
              <div className="bg-blue-500/20 border border-blue-500 rounded px-3 py-2 text-sm font-semibold text-blue-300">User</div>
            </div>
            <div className="flex-1 border-t border-slate-600"></div>
            <div className="text-slate-400 text-sm">Browser Request</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-20 text-center">
              <div className="bg-blue-500/20 border border-blue-500 rounded px-3 py-2 text-sm font-semibold text-blue-300">Frontend</div>
            </div>
            <div className="flex-1 border-t border-slate-600"></div>
            <div className="text-slate-400 text-sm">React SPA</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-20 text-center">
              <div className="bg-purple-500/20 border border-purple-500 rounded px-3 py-2 text-sm font-semibold text-purple-300">Backend</div>
            </div>
            <div className="flex-1 border-t border-slate-600"></div>
            <div className="text-slate-400 text-sm">FastAPI</div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="bg-green-500/20 border border-green-500 rounded px-3 py-2 text-xs font-semibold text-green-300 mb-2">Profile API</div>
              <div className="text-xs text-slate-400">Skills, Experience, Projects</div>
            </div>
            <div className="text-center">
              <div className="bg-orange-500/20 border border-orange-500 rounded px-3 py-2 text-xs font-semibold text-orange-300 mb-2">Chat API</div>
              <div className="text-xs text-slate-400">RAG + Vector Search</div>
            </div>
            <div className="text-center">
              <div className="bg-indigo-500/20 border border-indigo-500 rounded px-3 py-2 text-xs font-semibold text-indigo-300 mb-2">Availability API</div>
              <div className="text-xs text-slate-400">Google Calendar</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition">
          <h4 className="text-blue-300 font-bold mb-3">RAG Chatbot</h4>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>✓ CV chunking & semantic search</li>
            <li>✓ Limited to CV/LinkedIn topics</li>
            <li>✓ 8000 tokens per session</li>
            <li>✓ 60-minute session TTL</li>
          </ul>
        </div>

        <div className="border border-slate-700 rounded-lg p-6 hover:border-purple-500/50 transition">
          <h4 className="text-purple-300 font-bold mb-3">Security & Scale</h4>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>✓ Rate limiting (20 req/min)</li>
            <li>✓ Token budget enforcement</li>
            <li>✓ CORS protection</li>
            <li>✓ Auto-expiring sessions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

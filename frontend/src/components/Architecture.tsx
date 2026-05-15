export function Architecture() {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Architecture
      </h2>
      <p className="text-slate-400 mb-2">End-to-end system design with RAG-powered AI assistant</p>
      <p className="text-sm text-blue-400 mb-12">This is the architecture used to build this website</p>

      {/* Mermaid Diagram */}
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 mb-12 overflow-x-auto">
        <svg viewBox="0 0 1200 800" className="w-full min-h-[600px]" xmlns="http://www.w3.org/2000/svg">
          {/* Define styles */}
          <defs>
            <style>{`
              .arch-box { fill: #1e3a8a; stroke: #3b82f6; stroke-width: 2; }
              .arch-box-user { fill: #1e40af; stroke: #60a5fa; stroke-width: 2; }
              .arch-box-api { fill: #7c2d12; stroke: #fb923c; stroke-width: 2; }
              .arch-box-service { fill: #4c1d95; stroke: #d946ef; stroke-width: 2; }
              .arch-box-data { fill: #14532d; stroke: #10b981; stroke-width: 2; }
              .arch-text { fill: #f1f5f9; font-family: Arial, sans-serif; font-size: 12px; font-weight: bold; text-anchor: middle; }
              .arch-text-small { fill: #e2e8f0; font-family: Arial, sans-serif; font-size: 11px; text-anchor: middle; }
              .arch-text-title { fill: #60a5fa; font-family: Arial, sans-serif; font-size: 14px; font-weight: bold; text-anchor: middle; }
              .arch-arrow { stroke: #64748b; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
              .arch-label { fill: #cbd5e1; font-family: Arial, sans-serif; font-size: 10px; text-anchor: middle; }
            `}</style>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
            </marker>
          </defs>

          {/* Title */}
          <text x="600" y="30" className="arch-text-title" fontSize="16">End-to-End Architecture Flow</text>

          {/* Layer 1: User */}
          <rect x="500" y="60" width="200" height="50" className="arch-box-user" rx="5" />
          <text x="600" y="92" className="arch-text">👤 User Browser</text>

          {/* Arrow down */}
          <path d="M 600 110 L 600 140" className="arch-arrow" />
          <text x="630" y="130" className="arch-label">HTTP/HTTPS</text>

          {/* Layer 2: Frontend */}
          <rect x="450" y="140" width="300" height="70" className="arch-box" rx="5" />
          <text x="600" y="165" className="arch-text">🎨 React Frontend (Vite + TypeScript)</text>
          <text x="600" y="185" className="arch-text-small">Chat Widget | Profile | Skills | Experience</text>

          {/* Split arrows */}
          <path d="M 550 210 L 350 260" className="arch-arrow" />
          <path d="M 600 210 L 600 260" className="arch-arrow" />
          <path d="M 650 210 L 850 260" className="arch-arrow" />

          {/* Layer 3: Backend APIs */}
          {/* Profile API */}
          <rect x="220" y="260" width="160" height="60" className="arch-box-service" rx="5" />
          <text x="300" y="285" className="arch-text">Profile API</text>
          <text x="300" y="305" className="arch-text-small">Skills, Experience</text>

          {/* Chat API */}
          <rect x="520" y="260" width="160" height="60" className="arch-box-service" rx="5" />
          <text x="600" y="285" className="arch-text">Chat API</text>
          <text x="600" y="305" className="arch-text-small">RAG Engine</text>

          {/* Availability API */}
          <rect x="820" y="260" width="160" height="60" className="arch-box-service" rx="5" />
          <text x="900" y="285" className="arch-text">Availability API</text>
          <text x="900" y="305" className="arch-text-small">Google Calendar</text>

          {/* Arrows to services */}
          <path d="M 300 320 L 300 360" className="arch-arrow" />
          <path d="M 600 320 L 600 380" className="arch-arrow" />
          <path d="M 900 320 L 900 360" className="arch-arrow" />

          {/* Layer 4: Core Services */}
          {/* Profile Service */}
          <rect x="220" y="360" width="160" height="60" className="arch-box-data" rx="5" />
          <text x="300" y="385" className="arch-text">Profile Service</text>
          <text x="300" y="405" className="arch-text-small">JSON Data Store</text>

          {/* RAG Service */}
          <rect x="520" y="380" width="160" height="80" className="arch-box-service" rx="5" />
          <text x="600" y="410" className="arch-text">RAG Service</text>
          <text x="600" y="428" className="arch-text-small">Vector Search</text>
          <text x="600" y="446" className="arch-text-small">+ Claude Haiku</text>

          {/* Calendar Service */}
          <rect x="820" y="360" width="160" height="60" className="arch-box-data" rx="5" />
          <text x="900" y="385" className="arch-text">Calendar Service</text>
          <text x="900" y="405" className="arch-text-small">Google API</text>

          {/* Arrows to data layer */}
          <path d="M 300 420 L 300 520" className="arch-arrow" />
          <path d="M 580 460 L 230 520" className="arch-arrow" />
          <path d="M 600 460 L 430 520" className="arch-arrow" />
          <path d="M 600 460 L 600 520" className="arch-arrow" />
          <path d="M 900 420 L 1020 520" className="arch-arrow" />

          {/* Layer 5: Data & External Services */}
          {/* ChromaDB */}
          <rect x="160" y="520" width="140" height="60" className="arch-box-data" rx="5" />
          <text x="230" y="550" className="arch-text">ChromaDB</text>
          <text x="230" y="568" className="arch-text-small">Vector Store</text>

          {/* CV Loader */}
          <rect x="360" y="520" width="140" height="60" className="arch-box-data" rx="5" />
          <text x="430" y="550" className="arch-text">CV Loader</text>
          <text x="430" y="568" className="arch-text-small">PDF Parser</text>

          {/* MiniLM Embeddings */}
          <rect x="560" y="520" width="140" height="60" className="arch-box-service" rx="5" />
          <text x="630" y="550" className="arch-text">MiniLM</text>
          <text x="630" y="568" className="arch-text-small">Embeddings</text>

          {/* Session Store */}
          <rect x="760" y="520" width="140" height="60" className="arch-box-data" rx="5" />
          <text x="830" y="545" className="arch-text">Session Store</text>
          <text x="830" y="563" className="arch-text-small">Token Budget</text>

          {/* Google Calendar */}
          <rect x="950" y="520" width="140" height="60" className="arch-box-api" rx="5" />
          <text x="1020" y="550" className="arch-text">Google API</text>
          <text x="1020" y="568" className="arch-text-small">Calendar Data</text>

          {/* Anthropic API - Below MiniLM */}
          <rect x="560" y="640" width="140" height="50" className="arch-box-api" rx="5" />
          <text x="630" y="665" className="arch-text">Anthropic API</text>
          <text x="630" y="682" className="arch-text-small">Claude Haiku</text>

          {/* Arrow from MiniLM to Anthropic */}
          <path d="M 630 580 L 630 640" className="arch-arrow" />

          {/* Connect RAG Service to Session Manager */}
          <path d="M 680 420 L 830 520" className="arch-arrow" strokeDasharray="5,5" />
          <text x="745" y="460" className="arch-label">Token Tracking</text>

          {/* Legend */}
          <g transform="translate(60, 720)">
            <text x="0" y="0" className="arch-text-title" textAnchor="start" fontSize="12">Legend:</text>

            <rect x="0" y="12" width="14" height="14" className="arch-box-user" rx="2" />
            <text x="20" y="23" className="arch-text-small" textAnchor="start" fill="#60a5fa">User Layer</text>

            <rect x="120" y="12" width="14" height="14" className="arch-box" rx="2" />
            <text x="140" y="23" className="arch-text-small" textAnchor="start" fill="#60a5fa">Frontend</text>

            <rect x="240" y="12" width="14" height="14" className="arch-box-service" rx="2" />
            <text x="260" y="23" className="arch-text-small" textAnchor="start" fill="#d946ef">Service</text>

            <rect x="340" y="12" width="14" height="14" className="arch-box-data" rx="2" />
            <text x="360" y="23" className="arch-text-small" textAnchor="start" fill="#10b981">Data/Storage</text>

            <rect x="520" y="12" width="14" height="14" className="arch-box-api" rx="2" />
            <text x="540" y="23" className="arch-text-small" textAnchor="start" fill="#fb923c">External API</text>
          </g>
        </svg>
      </div>

      {/* Key Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="border border-blue-500/50 rounded-lg p-6 bg-slate-800/50">
          <h4 className="text-blue-300 font-bold mb-3 text-lg">🎨 Frontend Stack</h4>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• React 18 + TypeScript</li>
            <li>• Vite bundler</li>
            <li>• Tailwind CSS</li>
            <li>• Context API state</li>
          </ul>
        </div>

        <div className="border border-purple-500/50 rounded-lg p-6 bg-slate-800/50">
          <h4 className="text-purple-300 font-bold mb-3 text-lg">⚙️ Backend Stack</h4>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• FastAPI (Python)</li>
            <li>• Langchain orchestration</li>
            <li>• ChromaDB + MiniLM</li>
            <li>• Session management</li>
          </ul>
        </div>

        <div className="border border-blue-500/50 rounded-lg p-6 bg-slate-800/50">
          <h4 className="text-blue-300 font-bold mb-3 text-lg">🔌 Integrations</h4>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• Anthropic Claude Haiku</li>
            <li>• Vector embeddings (MiniLM)</li>
            <li>• PDF processing (PyPDF)</li>
            <li>• Session management</li>
          </ul>
        </div>
      </div>

      {/* Coming Soon Note */}
      <div className="border border-blue-500/30 rounded-lg p-4 bg-slate-800/50 mb-8">
        <p className="text-sm text-blue-300">
          📅 <span className="font-semibold">Google Calendar Integration</span> - Coming soon to show real-time availability based on calendar events
        </p>
      </div>

      {/* RAG Flow Details */}
      <div className="border border-slate-700 rounded-lg p-6 bg-slate-800/50">
        <h3 className="text-lg font-bold text-blue-300 mb-4">RAG Query Flow</h3>
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex gap-4">
            <div className="text-blue-400 font-bold min-w-fit">1. Query</div>
            <div>User question → Frontend sends to Chat API</div>
          </div>
          <div className="flex gap-4">
            <div className="text-purple-400 font-bold min-w-fit">2. Retrieve</div>
            <div>ChromaDB + MiniLM finds relevant CV chunks (semantic search)</div>
          </div>
          <div className="flex gap-4">
            <div className="text-orange-400 font-bold min-w-fit">3. Augment</div>
            <div>Context chunks added to Claude prompt + conversation history</div>
          </div>
          <div className="flex gap-4">
            <div className="text-green-400 font-bold min-w-fit">4. Generate</div>
            <div>Claude Haiku generates concise answer (≤250 tokens)</div>
          </div>
          <div className="flex gap-4">
            <div className="text-pink-400 font-bold min-w-fit">5. Track</div>
            <div>Session store tracks tokens, enforces 8000 token budget</div>
          </div>
        </div>
      </div>
    </div>
  )
}

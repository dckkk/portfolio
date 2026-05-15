import { useEffect, useState } from 'react'
import { apiClient, Profile } from '../lib/api'
import { Github, Linkedin, Mail } from 'lucide-react'

export function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient.getProfile().then(setProfile).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="animate-pulse h-64 bg-gray-200 rounded" />
  }

  if (!profile) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Photo */}
        <div className="flex justify-center mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-slate-900 shadow-2xl">
              <img
                src={profile.photo_url}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Name and Title */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {profile.name}
          </h1>
          <p className="text-2xl font-light text-blue-300 mb-2">
            {profile.title}
          </p>
          <p className="text-lg text-slate-400">
            📍 {profile.location}
          </p>
        </div>

        {/* Key Highlights */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">5+ Years</div>
              <p className="text-sm text-slate-300">Senior Software Engineer at <span className="font-semibold text-blue-300">Grab</span></p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-300 mb-2">💳 FinTech</div>
              <p className="text-sm text-slate-300">Payment Systems & <span className="font-semibold text-purple-300">Financial Services</span></p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-cyan-300 mb-2">🛠️ Systems</div>
              <p className="text-sm text-slate-300">Building <span className="font-semibold text-cyan-300">Scalable Infrastructure</span></p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <a
            href={`mailto:${profile.email}`}
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/50"
          >
            <Mail size={20} />
            Get in Touch
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <Linkedin size={20} />
            LinkedIn
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <Github size={20} />
            GitHub
          </a>
        </div>

        {/* Bio */}
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-slate-300 leading-relaxed text-center backdrop-blur-md bg-slate-800/50 p-8 rounded-xl border border-slate-700">
            {profile.summary}
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-16 animate-bounce">
          <p className="text-sm text-slate-400 mb-2">Scroll to explore</p>
          <div className="text-2xl text-blue-400">↓</div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

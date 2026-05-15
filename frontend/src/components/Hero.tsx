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
    <div className="py-16 px-4 text-center max-w-4xl mx-auto">
      <img
        src={profile.photo_url}
        alt={profile.name}
        className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg"
      />
      <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
      <p className="text-xl text-gray-600 mb-4">{profile.title}</p>
      <p className="text-gray-500 mb-6">{profile.location}</p>
      
      <div className="flex justify-center gap-4 mb-8">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <Mail size={20} />
          Email
        </a>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
        >
          <Linkedin size={20} />
          LinkedIn
        </a>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
        >
          <Github size={20} />
          GitHub
        </a>
      </div>

      <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
        {profile.summary}
      </p>
    </div>
  )
}

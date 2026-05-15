import { useEffect, useState } from 'react'
import { apiClient, Experience as ExperienceType } from '../lib/api'

export function Experience() {
  const [experience, setExperience] = useState<ExperienceType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient.getExperience().then(setExperience).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="animate-pulse h-96 bg-slate-700 rounded" />
  }

  return (
    <div className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Experience
      </h2>
      <p className="text-slate-400 mb-12">My professional journey and key roles</p>
      
      <div className="space-y-6">
        {experience.map((job, idx) => (
          <div
            key={idx}
            className="group relative hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative border-l-4 border-blue-500 pl-6 py-4 bg-slate-800/50 rounded-lg p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
                    {job.position}
                  </h3>
                  <p className="text-blue-300 font-semibold">{job.company}</p>
                  <p className="text-sm text-slate-400">{job.location}</p>
                </div>
                <span className="text-sm text-slate-400 whitespace-nowrap bg-slate-700/50 px-3 py-1 rounded-full">
                  {job.period}
                </span>
              </div>
              
              <p className="text-slate-300 mb-4 leading-relaxed">{job.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {job.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-300 text-xs rounded-full border border-blue-700/50 hover:border-blue-500 transition hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

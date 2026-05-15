import { useEffect, useState } from 'react'
import { apiClient, Experience } from '../lib/api'

export function Experience() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient.getExperience().then(setExperience).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="animate-pulse h-96 bg-gray-200 rounded" />
  }

  return (
    <div className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
      
      <div className="space-y-8">
        {experience.map((job, idx) => (
          <div key={idx} className="border-l-4 border-blue-600 pl-6 py-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold">{job.position}</h3>
                <p className="text-gray-600">{job.company} • {job.location}</p>
              </div>
              <span className="text-sm text-gray-500">{job.period}</span>
            </div>
            
            <p className="text-gray-700 mb-4">{job.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {job.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

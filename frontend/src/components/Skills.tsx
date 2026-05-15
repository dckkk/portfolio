import { useEffect, useState } from 'react'
import { apiClient, Skills } from '../lib/api'

export function Skills() {
  const [skills, setSkills] = useState<Skills | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient.getSkills().then(setSkills).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="animate-pulse h-96 bg-gray-200 rounded" />
  }

  if (!skills) return null

  const categories = [
    { title: 'Languages', items: skills.languages },
    { title: 'Databases', items: skills.databases },
    { title: 'Cloud', items: skills.cloud },
    { title: 'Technologies', items: skills.technologies },
    { title: 'Specializations', items: skills.specializations },
  ]

  return (
    <div className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <div key={category.title}>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

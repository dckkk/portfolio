import { useEffect, useState } from 'react'
import { apiClient, Skills as SkillsType } from '../lib/api'

export function Skills() {
  const [skills, setSkills] = useState<SkillsType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient.getSkills().then(setSkills).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="animate-pulse h-96 bg-slate-700 rounded" />
  }

  if (!skills) return null

  const categories = [
    { title: '🗣️ Languages', items: skills.languages },
    { title: '💾 Databases', items: skills.databases },
    { title: '☁️ Cloud', items: skills.cloud },
    { title: '🔧 Technologies', items: skills.technologies },
    { title: '⚡ Specializations', items: skills.specializations },
  ]

  return (
    <div className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Skills
      </h2>
      <p className="text-slate-400 mb-12">Technologies and expertise</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category, idx) => (
          <div
            key={category.title}
          >
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-6 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              <h3 className="text-lg font-bold mb-4 text-blue-300">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-800 text-slate-200 rounded-full text-sm font-medium border border-slate-600 hover:border-blue-500 hover:text-blue-300 transition transform hover:scale-105 cursor-default"
                  >
                    {skill}
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

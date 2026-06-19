import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { projects } from '../data/projects'
import type { ProjectCategory } from '../types/project'

const categories: ('All' | ProjectCategory)[] = ['All', 'Frontend', 'Systems', 'AI/ML']

export const ProjectsPage = () => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]>('All')

  const filtered = useMemo(
    () =>
      projects.filter((project) => {
        const categoryMatch = category === 'All' || project.category === category
        const queryMatch = project.title.toLowerCase().includes(query.toLowerCase()) || project.summary.toLowerCase().includes(query.toLowerCase())
        return categoryMatch && queryMatch
      }),
    [category, query],
  )

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <Seo title="Projects | Muhammad Wahaj" description="Project portfolio featuring React, C++, and machine learning work." path="/projects" />
      <h1 className="text-4xl font-semibold">Projects</h1>
      <div className="mt-6 flex flex-wrap gap-3">
        <input
          aria-label="Search projects"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search project..."
          className="min-w-60 rounded-xl border border-white/20 bg-white/5 px-4 py-2"
        />
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-xl border px-3 py-2 text-sm ${category === item ? 'border-cyan-300 text-cyan-200' : 'border-white/20 text-white/75'}`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {filtered.map((project) => (
          <article key={project.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-violet-200">{project.category}</p>
            <h2 className="mt-2 text-2xl font-semibold">{project.title}</h2>
            <p className="mt-2 text-white/75">{project.summary}</p>
            <p className="mt-3 text-sm text-cyan-200">{project.tech.join(' · ')}</p>
            <Link className="mt-4 inline-block text-cyan-200 hover:text-cyan-100" to={`/projects/${project.slug}`}>Read case study →</Link>
          </article>
        ))}
      </div>
    </section>
  )
}

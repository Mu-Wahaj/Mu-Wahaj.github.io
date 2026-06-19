import { Navigate, useParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { projects } from '../data/projects'
import { trackEvent } from '../utils/analytics'

export const ProjectDetailPage = () => {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return <Navigate to="/404" replace />
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <Seo title={`${project.title} | Muhammad Wahaj`} description={project.summary} path={`/projects/${project.slug}`} />
      <p className="text-sm uppercase tracking-[0.15em] text-cyan-200">{project.category}</p>
      <h1 className="mt-2 text-4xl font-semibold">{project.title}</h1>
      <p className="mt-5 text-white/75">{project.summary}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl text-cyan-200">Features</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-white/75">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl text-cyan-200">Challenges & Solutions</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-white/75">{project.challenges.map((item, idx) => <li key={item}>{item} → {project.solutions[idx] ?? 'Solved with robust engineering'}</li>)}</ul>
        </article>
      </div>

      {project.metrics?.length ? (
        <article className="mt-4 rounded-2xl border border-violet-300/25 bg-violet-500/5 p-6">
          <h2 className="text-xl text-violet-200">Metrics</h2>
          <p className="mt-2 text-white/75">{project.metrics.join(' · ')}</p>
        </article>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent('project_click', { project: project.slug, target: 'github' })}
            className="rounded-xl bg-cyan-400 px-4 py-2 text-black"
          >
            GitHub
          </a>
        ) : null}
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent('project_click', { project: project.slug, target: 'demo' })}
            className="rounded-xl border border-white/20 px-4 py-2"
          >
            Live Demo
          </a>
        ) : null}
      </div>
    </section>
  )
}

export type ProjectCategory = 'Frontend' | 'Systems' | 'AI/ML'

export type Project = {
  slug: string
  title: string
  category: ProjectCategory
  summary: string
  tech: string[]
  features: string[]
  challenges: string[]
  solutions: string[]
  metrics?: string[]
  githubUrl?: string
  demoUrl?: string
}

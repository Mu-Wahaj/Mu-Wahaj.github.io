import { Seo } from '../components/Seo'
import { profile } from '../data/profile'

export const AboutPage = () => (
  <section className="mx-auto max-w-5xl px-6 py-16">
    <Seo title="About | Muhammad Wahaj" description="Detailed background of Muhammad Wahaj, frontend developer and AI/ML enthusiast in Lahore." path="/about" />
    <h1 className="text-4xl font-semibold">About Muhammad Wahaj</h1>
    <p className="mt-6 text-lg text-white/75">{profile.summary}</p>
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-medium text-cyan-200">Career Objective</h2>
        <p className="mt-3 text-white/75">Seeking opportunities to build impactful products and solve meaningful problems through software.</p>
      </article>
      <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-medium text-cyan-200">Location & Contact</h2>
        <p className="mt-3 text-white/75">{profile.location} · {profile.email}</p>
      </article>
    </div>
  </section>
)

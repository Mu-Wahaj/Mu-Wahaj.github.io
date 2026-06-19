import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { MagneticButton } from '../components/MagneticButton'
import { Seo } from '../components/Seo'
import { profile, skills } from '../data/profile'
import { projects } from '../data/projects'
import { Loader } from '../components/Loader'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { label: 'Projects Built', value: 12 },
  { label: 'Years Learning', value: 3 },
  { label: 'Technologies Used', value: 18 },
]

export const HomePage = () => {
  const [loaded, setLoaded] = useState(false)
  const heroRef = useRef<HTMLHeadingElement>(null)
  const featured = useMemo(() => projects.slice(0, 3), [])

  useEffect(() => {
    if (!loaded || !heroRef.current) return
    const split = new SplitType(heroRef.current, { types: 'chars' })
    gsap.fromTo(
      split.chars,
      { y: 48, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.02, ease: 'power3.out' },
    )

    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: { trigger: item, start: 'top 82%' },
        },
      )
    })

    return () => {
      split.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [loaded])

  return (
    <>
      {!loaded ? <Loader onDone={() => setLoaded(true)} /> : null}
      <Seo
        title="Muhammad Wahaj | Frontend Developer & AI/ML Enthusiast"
        description="Premium portfolio of Muhammad Wahaj, React.js developer from Lahore building responsive applications and intelligent systems."
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: profile.name,
          jobTitle: profile.roles.join(' · '),
          address: profile.location,
          email: profile.email,
          sameAs: [profile.github, profile.linkedin],
        }}
      />
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-20 md:pt-28">
        <p className="mb-4 inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-200">Available for opportunities</p>
        <h1 ref={heroRef} className="max-w-4xl text-4xl font-semibold leading-tight md:text-7xl">{profile.name}</h1>
        <p className="mt-5 max-w-3xl text-lg text-white/75">Building responsive web applications and exploring intelligent systems through modern software engineering.</p>
        <p className="mt-4 text-white/65">{profile.roles.join(' · ')}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/contact"><MagneticButton className="rounded-xl bg-cyan-400 px-5 py-3 font-medium text-black">Let&apos;s Collaborate</MagneticButton></Link>
          <Link to="/resume"><MagneticButton className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-medium">View Resume</MagneticButton></Link>
        </div>
      </section>

      <section data-reveal className="mx-auto grid max-w-6xl gap-4 px-6 pb-16 md:grid-cols-3">
        {stats.map((item) => (
          <article key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-3xl font-semibold text-cyan-300">{item.value}+</p>
            <p className="mt-2 text-white/70">{item.label}</p>
          </article>
        ))}
      </section>

      <section data-reveal className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-3xl font-semibold">About</h2>
        <p className="mt-4 max-w-4xl text-white/75">{profile.summary}</p>
      </section>

      <section data-reveal className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-3xl font-semibold">Experience</h2>
        <article className="mt-6 rounded-2xl border border-violet-300/20 bg-violet-400/5 p-6">
          <p className="text-cyan-200">PNY Trainings · Frontend Development Trainee</p>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-white/75">
            <li>Built responsive React applications</li>
            <li>Developed reusable UI components</li>
            <li>Worked with Git and GitHub</li>
            <li>Implemented frontend best practices</li>
            <li>Built multiple production-style projects</li>
          </ul>
        </article>
      </section>

      <section data-reveal className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-3xl font-semibold">Skills</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {Object.entries(skills).map(([group, list]) => (
            <article key={group} className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-cyan-300/40">
              <h3 className="text-lg capitalize text-cyan-200">{group}</h3>
              <p className="mt-2 text-white/75">{list.join(' · ')}</p>
            </article>
          ))}
        </div>
      </section>

      <section data-reveal className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold">Featured Projects</h2>
          <Link to="/projects" className="text-cyan-200 hover:text-cyan-100">View all</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featured.map((project) => (
            <article key={project.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.16em] text-violet-200">{project.category}</p>
              <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-white/70">{project.summary}</p>
              <Link to={`/projects/${project.slug}`} className="mt-5 inline-block text-cyan-200 hover:text-cyan-100">Explore project →</Link>
            </article>
          ))}
        </div>
      </section>

      <section data-reveal className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-3xl font-semibold">AI/ML Journey</h2>
        <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 p-6">
          <p className="text-white/75">Transitioning from frontend craftsmanship to data-driven intelligence through applied machine learning projects, model experimentation, and practical problem solving.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-black/20 p-4">Learning Python fundamentals → model pipelines</div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-4">Applied NLP with TF-IDF and Naive Bayes</div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-4">Regression modeling with measurable business outcomes</div>
          </div>
        </div>
      </section>

      <section data-reveal className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-3xl font-semibold">Education</h2>
        <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/75">{profile.education.degree} — {profile.education.school} ({profile.education.years})</p>
      </section>

      <section data-reveal className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Resume</h2>
            <p className="mt-3 text-white/75">Access downloadable and printable resume with analytics tracking.</p>
            <Link to="/resume" className="mt-4 inline-block rounded-lg bg-cyan-400 px-4 py-2 text-black">Open Resume</Link>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="mt-3 text-white/75">Have a role or project in mind? Let&apos;s connect.</p>
            <Link to="/contact" className="mt-4 inline-block rounded-lg border border-white/20 px-4 py-2">Get in Touch</Link>
          </article>
        </div>
      </section>
    </>
  )
}

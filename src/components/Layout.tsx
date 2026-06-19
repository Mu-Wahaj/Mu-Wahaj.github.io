import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { profile } from '../data/profile'
import { CommandPalette } from './CommandPalette'
import { CustomCursor } from './CustomCursor'
import { trackEvent } from '../utils/analytics'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
]

export const Layout = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') {
      return 'dark'
    }
    const stored = window.localStorage.getItem('portfolio-theme') as 'dark' | 'light' | null
    return stored ?? 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen bg-[#050505] text-white antialiased">
      <CustomCursor />
      <CommandPalette />
      <div className="pointer-events-none fixed inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(34,211,238,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(168,85,247,0.2), transparent 45%)' }} />
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050505]/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <NavLink to="/" className="text-lg font-semibold tracking-wide">{profile.name}</NavLink>
          <div className="flex items-center gap-2 md:gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-2 py-1 text-sm transition ${isActive ? 'text-cyan-300' : 'text-white/80 hover:text-white'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              className="rounded-md border border-white/20 px-2 py-1 text-xs text-white/80"
              onClick={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <a className="text-white/80 hover:text-cyan-300" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" onClick={() => trackEvent('social_click', { target: 'github' })}>
              <FaGithub />
            </a>
            <a className="text-white/80 hover:text-cyan-300" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" onClick={() => trackEvent('social_click', { target: 'linkedin' })}>
              <FaLinkedin />
            </a>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/60">
        © {new Date().getFullYear()} {profile.name} · Lahore, Pakistan
      </footer>
    </div>
  )
}

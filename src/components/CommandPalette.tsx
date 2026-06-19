import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const links = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Resume', path: '/resume' },
  { label: 'Contact', path: '/contact' },
]

export const CommandPalette = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const filtered = useMemo(
    () => links.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 grid place-items-start bg-black/70 p-6 pt-24" role="dialog" aria-modal="true">
      <div className="w-full max-w-xl rounded-2xl border border-white/15 bg-[#0a0a0f]/95 p-4 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
        <input
          autoFocus
          aria-label="Search routes"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Go to..."
          className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-white outline-none focus:border-cyan-400"
        />
        <ul className="mt-3 space-y-2">
          {filtered.map((item) => (
            <li key={item.path}>
              <button
                type="button"
                className="w-full rounded-lg border border-transparent px-3 py-2 text-left text-white/90 hover:border-white/20 hover:bg-white/5"
                onClick={() => {
                  navigate(item.path)
                  setOpen(false)
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

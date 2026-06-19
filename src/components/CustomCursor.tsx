import { useEffect, useState } from 'react'

export const CustomCursor = () => {
  const [point, setPoint] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const move = (event: MouseEvent) => setPoint({ x: event.clientX, y: event.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none fixed z-50 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/60 bg-cyan-400/20 backdrop-blur-sm md:block"
      style={{ left: point.x, top: point.y }}
    />
  )
}

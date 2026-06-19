import { useEffect, useState } from 'react'
import gsap from 'gsap'

type LoaderProps = { onDone: () => void }

export const Loader = ({ onDone }: LoaderProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((value) => (value >= 100 ? 100 : value + 4))
    }, 36)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress < 100) return
    const timeline = gsap.timeline({ onComplete: onDone })
    timeline.to('#loader-mark', { opacity: 1, y: 0, duration: 0.3 }).to('#loader-root', { opacity: 0, duration: 0.35, delay: 0.2 })
  }, [progress, onDone])

  return (
    <div id="loader-root" className="fixed inset-0 z-50 grid place-items-center bg-[#050505]">
      <div className="text-center">
        <p id="loader-mark" className="translate-y-3 text-4xl font-bold tracking-widest text-cyan-300 opacity-0">MW</p>
        <p className="mt-4 text-sm text-white/70">Loading experience... {progress}%</p>
      </div>
    </div>
  )
}

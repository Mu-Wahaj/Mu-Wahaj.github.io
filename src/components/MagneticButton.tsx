import { type ButtonHTMLAttributes, type MouseEvent, useRef } from 'react'

type MagneticButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const MagneticButton = ({ className = '', onMouseMove, onMouseLeave, ...props }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null)

  const handleMove = (event: MouseEvent<HTMLButtonElement>) => {
    const target = ref.current
    if (!target) return
    const rect = target.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    target.style.transform = `translate(${x * 0.14}px, ${y * 0.14}px)`
    onMouseMove?.(event)
  }

  const handleLeave = (event: MouseEvent<HTMLButtonElement>) => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0, 0)'
    }
    onMouseLeave?.(event)
  }

  return (
    <button
      ref={ref}
      className={`transition-transform duration-200 ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    />
  )
}

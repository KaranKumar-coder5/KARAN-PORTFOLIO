import { useMemo } from 'react'

type Particle = {
  id: number
  x: number
  size: number
  opacity: number
  duration: number
  delay: number
  driftX: number
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 2 + Math.random() * 2,
    opacity: 0.08 + Math.random() * 0.15,
    duration: 18 + Math.random() * 22,
    delay: Math.random() * -30,
    driftX: (Math.random() - 0.5) * 60,
  }))
}

const PARTICLE_STYLE = `
@keyframes particle-float {
  0% {
    transform: translateY(100vh) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: var(--particle-opacity);
  }
  90% {
    opacity: var(--particle-opacity);
  }
  100% {
    transform: translateY(-20px) translateX(var(--particle-drift));
    opacity: 0;
  }
}
`

export type ParticlesProps = {
  count?: number
  color?: string
  className?: string
}

export function Particles({ count = 18, color = 'var(--color-grass-300)', className }: ParticlesProps) {
  const particles = useMemo(() => generateParticles(count), [count])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[1] overflow-hidden ${className ?? ''}`}
    >
      <style dangerouslySetInnerHTML={{ __html: PARTICLE_STYLE }} />
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: color,
            opacity: 0,
            '--particle-opacity': p.opacity,
            '--particle-drift': `${p.driftX}px`,
            animation: `particle-float ${p.duration}s linear ${p.delay}s infinite`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

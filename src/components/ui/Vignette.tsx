export function Vignette() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(15,15,26,0.18) 100%)',
      }}
    />
  )
}

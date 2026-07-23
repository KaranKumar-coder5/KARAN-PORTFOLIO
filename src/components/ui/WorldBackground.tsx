import { useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'

/* ── Palette ───────────────────────────────────────────── */
const SKY = {
  top: '#3a7bd5',
  mid: '#6db3f2',
  low: '#b4d8f0',
  horizon: '#ffd194',
  sunBloom: '#ffe8b0',
}
const MTN = { far: '#7a95a8', mid: '#5a7585', near: '#3e5a6a' }
const HILL = { far: '#2e4a1e', mid: '#3f6428', near: '#5d8c3e', bright: '#6fa04a' }
const TREE = { fill: '#2a4218', fillLight: '#3a5a28', trunk: '#5c4510' }
const BLOCK = { grass: '#5d8c3e', dirt: '#8b6914', dirtDark: '#6b5010' }

/* ── Mountain silhouettes ──────────────────────────────── */
const MTN_FAR = [
  'polygon(0% 100%, 5% 70%, 12% 55%, 20% 68%, 30% 42%, 38% 58%, 48% 30%, 55% 50%, 65% 35%, 72% 48%, 82% 38%, 90% 55%, 95% 45%, 100% 100%)',
  'polygon(0% 100%, 8% 62%, 18% 48%, 28% 60%, 40% 35%, 52% 52%, 62% 40%, 75% 55%, 85% 42%, 100% 100%)',
]
const MTN_MID = [
  'polygon(0% 100%, 6% 60%, 15% 50%, 22% 62%, 32% 38%, 42% 55%, 50% 32%, 60% 48%, 70% 35%, 80% 50%, 88% 40%, 100% 100%)',
  'polygon(0% 100%, 10% 55%, 22% 42%, 35% 58%, 45% 35%, 55% 50%, 68% 38%, 78% 52%, 100% 100%)',
]
const MTN_NEAR = [
  'polygon(0% 100%, 8% 55%, 18% 45%, 28% 58%, 38% 35%, 48% 50%, 58% 30%, 68% 45%, 78% 38%, 88% 48%, 100% 100%)',
  'polygon(0% 100%, 12% 50%, 25% 40%, 38% 55%, 50% 32%, 62% 48%, 75% 38%, 85% 50%, 100% 100%)',
]

/* ── Deterministic RNG ─────────────────────────────────── */
function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function makeClouds(n: number) {
  const r = rng(42)
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: r() * 90,
    y: r() * 18 + 3,
    w: r() * 140 + 60,
    h: r() * 28 + 16,
    o: r() * 0.25 + 0.18,
    drift: r() * 50 + 20,
    dur: r() * 40 + 50,
  }))
}

function makeParticles(n: number) {
  const r = rng(99)
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: r() * 100,
    size: r() * 2.5 + 0.8,
    o: r() * 0.07 + 0.03,
    dur: r() * 18 + 16,
    delay: r() * -40,
    driftX: (r() - 0.5) * 35,
  }))
}

function makeTrees(n: number, seed: number) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: r() * 85 + 5,
    scale: r() * 0.55 + 0.55,
    variant: Math.floor(r() * 3),
  }))
}

function makeBlocks(n: number) {
  const r = rng(55)
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: r() * 80 + 8,
    y: r() * 5 + 1,
    w: r() * 12 + 16,
    h: r() * 8 + 14,
    rot: (r() - 0.5) * 10,
  }))
}

function makeStars(n: number) {
  const r = rng(11)
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: r() * 100,
    y: r() * 35,
    size: r() * 1.5 + 0.5,
    o: r() * 0.4 + 0.1,
  }))
}

/* ── Pine Tree ─────────────────────────────────────────── */
function PineTree({
  x,
  scale,
  variant,
}: {
  x: number
  scale: number
  variant: number
}) {
  const layers = variant === 0 ? [16, 13, 10] : variant === 1 ? [14, 11, 8] : [18, 14, 10]
  const trunkH = 8 + variant * 2
  return (
    <div
      className="absolute bottom-0"
      style={{
        left: `${x}%`,
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
      }}
    >
      <div
        className="mx-auto"
        style={{
          width: 3 + variant,
          height: trunkH,
          backgroundColor: TREE.trunk,
          borderRadius: 1,
        }}
      />
      {layers.map((bw, i) => (
        <div
          key={i}
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: trunkH - 2 + i * (bw * 0.6),
            width: 0,
            height: 0,
            borderLeft: `${bw / 2}px solid transparent`,
            borderRight: `${bw / 2}px solid transparent`,
            borderBottom: `${bw * 0.8}px solid ${i === 2 ? TREE.fillLight : TREE.fill}`,
          }}
        />
      ))}
    </div>
  )
}

/* ── Grass Block ───────────────────────────────────────── */
function GrassBlock({
  x,
  y,
  w,
  h,
  rot,
}: {
  x: number
  y: number
  w: number
  h: number
  rot: number
}) {
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        bottom: `${y}%`,
        width: w,
        height: h,
        transform: `rotate(${rot}deg)`,
        borderRadius: 1,
      }}
    >
      <div
        className="w-full"
        style={{
          height: '45%',
          backgroundColor: BLOCK.grass,
          borderRadius: '2px 2px 0 0',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      />
      <div
        className="w-full"
        style={{
          height: '55%',
          background: `linear-gradient(to bottom, ${BLOCK.dirt} 0%, ${BLOCK.dirtDark} 100%)`,
          borderRadius: '0 0 2px 2px',
          boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.2)',
        }}
      />
    </div>
  )
}

/* ── CSS Animations ────────────────────────────────────── */
const KEYFRAMES = `
@keyframes wb-cloud-drift {
  from { transform: translateX(0); }
  to { transform: translateX(var(--wb-cd)); }
}
@keyframes wb-particle-float {
  0%   { transform: translateY(100vh) translateX(0); opacity: 0; }
  6%   { opacity: var(--wb-po); }
  84%  { opacity: var(--wb-po); }
  100% { transform: translateY(-20px) translateX(var(--wb-pd)); opacity: 0; }
}
@keyframes wb-sun-pulse {
  0%, 100% { opacity: 0.9; transform: translateX(-50%) scale(1); }
  50%      { opacity: 1;   transform: translateX(-50%) scale(1.04); }
}
@keyframes wb-fog-drift {
  0%   { transform: translateX(-3%); }
  100% { transform: translateX(3%); }
}
`

/* ═════════════════════════════════════════════════════════
   WORLD BACKGROUND
   Persistent voxel landscape behind all sections.
   ═════════════════════════════════════════════════════════ */
export function WorldBackground() {
  const prefersReducedMotion = useReducedMotion()

  const clouds = useMemo(() => makeClouds(6), [])
  const particles = useMemo(() => makeParticles(16), [])
  const treesFar = useMemo(() => makeTrees(6, 33), [])
  const treesNear = useMemo(() => makeTrees(8, 77), [])
  const blocks = useMemo(() => makeBlocks(8), [])
  const stars = useMemo(() => makeStars(20), [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: SKY.horizon }}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* ── 1  SKY ──────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(175deg, ${SKY.top} 0%, ${SKY.mid} 30%, ${SKY.low} 55%, ${SKY.horizon} 78%, ${SKY.sunBloom} 100%)`,
        }}
      />

      {/* ── 2  STARS ────────────────────────────────── */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            backgroundColor: '#fff',
            opacity: s.o,
          }}
        />
      ))}

      {/* ── 3  SUN ──────────────────────────────────── */}
      <div
        className="absolute"
        style={{
          left: '50%',
          bottom: '28%',
          width: 400,
          height: 200,
          transform: 'translateX(-50%)',
          background: `radial-gradient(ellipse at 50% 80%, ${SKY.sunBloom}cc 0%, ${SKY.sunBloom}66 30%, ${SKY.horizon}33 55%, transparent 75%)`,
          animation: prefersReducedMotion
            ? 'none'
            : 'wb-sun-pulse 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          left: '50%',
          bottom: '30%',
          width: 56,
          height: 56,
          transform: 'translateX(-50%)',
          background: `radial-gradient(circle, #fff8e8 0%, ${SKY.sunBloom} 50%, transparent 100%)`,
          boxShadow: `0 0 60px 20px ${SKY.sunBloom}88`,
        }}
      />

      {/* ── 4  CLOUDS ───────────────────────────────── */}
      {clouds.map((c) => (
        <div
          key={c.id}
          className="absolute rounded-full"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.w,
            height: c.h,
            backgroundColor: `rgba(255,255,255,${c.o})`,
            filter: 'blur(8px)',
            '--wb-cd': `${c.drift}px`,
            animation: prefersReducedMotion
              ? 'none'
              : `wb-cloud-drift ${c.dur}s linear infinite alternate`,
          } as React.CSSProperties}
        />
      ))}

      {/* ── 5  FAR MOUNTAINS ────────────────────────── */}
      {MTN_FAR.map((clip, i) => (
        <div
          key={`mtn-far-${i}`}
          className="absolute"
          style={{
            bottom: '25%',
            left: '-8%',
            right: '-8%',
            height: '40%',
            backgroundColor: MTN.far,
            clipPath: clip,
            opacity: 0.45,
          }}
        />
      ))}

      {/* ── 6  MID MOUNTAINS ────────────────────────── */}
      {MTN_MID.map((clip, i) => (
        <div
          key={`mtn-mid-${i}`}
          className="absolute"
          style={{
            bottom: '21%',
            left: '-5%',
            right: '-5%',
            height: '36%',
            backgroundColor: MTN.mid,
            clipPath: clip,
            opacity: 0.65,
          }}
        />
      ))}

      {/* ── 7  NEAR MOUNTAINS ───────────────────────── */}
      {MTN_NEAR.map((clip, i) => (
        <div
          key={`mtn-near-${i}`}
          className="absolute"
          style={{
            bottom: '18%',
            left: '-3%',
            right: '-3%',
            height: '32%',
            backgroundColor: MTN.near,
            clipPath: clip,
            opacity: 0.8,
          }}
        />
      ))}

      {/* ── 8  FAR HILLS ────────────────────────────── */}
      <div
        className="absolute"
        style={{
          bottom: '14%',
          left: '-12%',
          width: '65%',
          height: 170,
          borderRadius: '50% 50% 0 0',
          backgroundColor: HILL.far,
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: '12%',
          left: '20%',
          width: '55%',
          height: 140,
          borderRadius: '50% 50% 0 0',
          backgroundColor: HILL.far,
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: '13%',
          right: '-10%',
          width: '60%',
          height: 155,
          borderRadius: '50% 50% 0 0',
          backgroundColor: HILL.far,
        }}
      />

      {/* ── 9  MID HILLS ───────────────────────────── */}
      <div
        className="absolute"
        style={{
          bottom: '9%',
          left: '-8%',
          width: '52%',
          height: 130,
          borderRadius: '50% 50% 0 0',
          backgroundColor: HILL.mid,
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: '7%',
          left: '30%',
          width: '58%',
          height: 145,
          borderRadius: '50% 50% 0 0',
          backgroundColor: HILL.mid,
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: '8%',
          right: '-6%',
          width: '48%',
          height: 120,
          borderRadius: '50% 50% 0 0',
          backgroundColor: HILL.mid,
        }}
      />

      {/* ── 10  NEAR HILLS ──────────────────────────── */}
      <div
        className="absolute"
        style={{
          bottom: '4%',
          left: '-6%',
          width: '48%',
          height: 110,
          borderRadius: '50% 50% 0 0',
          backgroundColor: HILL.near,
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: '3%',
          left: '28%',
          width: '52%',
          height: 120,
          borderRadius: '50% 50% 0 0',
          backgroundColor: HILL.near,
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: '5%',
          right: '-4%',
          width: '44%',
          height: 100,
          borderRadius: '50% 50% 0 0',
          backgroundColor: HILL.near,
        }}
      />

      {/* ── 11  GRASS PLANE ─────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '10%',
          background: `linear-gradient(to bottom, ${HILL.bright} 0%, ${HILL.near} 30%, ${BLOCK.dirt} 100%)`,
        }}
      />

      {/* ── 12  TREES (far layer) ───────────────────── */}
      {treesFar.map((t) => (
        <div
          key={`tf-${t.id}`}
          className="absolute"
          style={{ bottom: '14%', left: `${t.x}%` }}
        >
          <PineTree x={0} scale={t.scale * 0.7} variant={t.variant} />
        </div>
      ))}

      {/* ── 13  TREES (near layer) ──────────────────── */}
      {treesNear.map((t) => (
        <div
          key={`tn-${t.id}`}
          className="absolute"
          style={{ bottom: '8%', left: `${t.x}%` }}
        >
          <PineTree x={0} scale={t.scale} variant={t.variant} />
        </div>
      ))}

      {/* ── 14  GRASS BLOCKS ────────────────────────── */}
      {blocks.map((b) => (
        <GrassBlock
          key={b.id}
          x={b.x}
          y={b.y}
          w={b.w}
          h={b.h}
          rot={b.rot}
        />
      ))}

      {/* ── 15  FOG LAYER ───────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(180,200,210,0.12) 70%, rgba(180,200,210,0.25) 85%, rgba(180,200,210,0.35) 100%)',
          animation: prefersReducedMotion
            ? 'none'
            : 'wb-fog-drift 20s ease-in-out infinite alternate',
        }}
      />

      {/* ── 16  ATMOSPHERIC HAZE ────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(58,123,213,0.08) 0%, transparent 30%)',
        }}
      />

      {/* ── 17  PARTICLES ───────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
              backgroundColor: 'rgba(255,248,230,0.9)',
              opacity: 0,
              '--wb-po': p.o,
              '--wb-pd': `${p.driftX}px`,
              animation: prefersReducedMotion
                ? 'none'
                : `wb-particle-float ${p.dur}s linear ${p.delay}s infinite`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  )
}

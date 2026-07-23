import gsap from 'gsap'

let isRegistered = false

export function registerGsapPlugins(
  ...plugins: Parameters<typeof gsap.registerPlugin>
): typeof gsap {
  if (!isRegistered) {
    gsap.registerPlugin(...plugins)
    isRegistered = true
  }

  return gsap
}

export { gsap }

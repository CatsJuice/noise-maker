import { acceptHMRUpdate, defineStore } from 'pinia'

export interface NoiseParams {
  baseFrequency?: number
  numOctaves?: number
  opacity?: number
  width: number
  height: number
}

export const useNoiseStore = defineStore('noise', () => {
  const controlState = reactive<NoiseParams>({
    baseFrequency: 0.25,
    numOctaves: 1,
    opacity: 0.2,
    width: 1024,
    height: 1024,
  })

  const id = Math.random().toString(36).substring(7) + Date.now().toString(36)

  const svgCode = computed(() => '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">'
    + `<filter id="${id}">`
    + '<feTurbulence type="fractalNoise" '
    + `baseFrequency="${controlState.baseFrequency}" `
    + `numOctaves="${controlState.numOctaves}" `
    + 'stitchTiles="stitch" />'
    + '</filter>'
    + `<rect width="100%" height="100%" filter="url(#${id})" `
    + `opacity="${controlState.opacity}" `
    + '/>'
    + '</svg>')

  const svgBase64 = computed(() => `data:image/svg+xml,${encodeURIComponent(svgCode.value)}`)

  return {
    svgCode,
    svgBase64,
    controlState,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNoiseStore, import.meta.hot))

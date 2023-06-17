import { acceptHMRUpdate, defineStore } from 'pinia'

export interface NoiseParams {
  baseFrequency?: number
  numOctaves?: number
  opacity?: number
  width: number
  height: number
}
export interface NoiseControl {
  key: keyof NoiseParams
  label?: string
  min?: number
  max?: number
  step?: number
  formatter?: (value: number) => string
}

const controls: NoiseControl[] = [
  {
    key: 'baseFrequency',
    label: 'Base Frequency',
    min: 0,
    max: 1,
    step: 0.01,
  },
  {
    key: 'numOctaves',
    label: 'Octaves',
    min: 1,
    max: 10,
    step: 0.1,
  },
  {
    key: 'opacity',
    label: 'Opacity',
    min: 0,
    max: 1,
    step: 0.01,
    formatter: value => `${Math.round(value * 100)}%`,
  },
  {
    key: 'width',
    label: 'Width',
    min: 1,
    max: 4096,
    step: 1,
    formatter: value => `${value}px`,
  },
  {
    key: 'height',
    label: 'Height',
    min: 1,
    max: 4096,
    step: 1,
    formatter: value => `${value}px`,
  },
]

const defaultState: NoiseParams = {
  baseFrequency: 0.25,
  numOctaves: 1,
  opacity: 0.2,
  width: 1024,
  height: 1024,
}

export const useNoiseStore = defineStore('noise', () => {
  const controlState = reactive<NoiseParams>({
    ...defaultState,
  })

  const id = Math.random().toString(36).substring(7) + Date.now().toString(36)

  const svgCode = computed(() => `<svg viewBox="0 0 ${controlState.width} ${controlState.height}" xmlns="http://www.w3.org/2000/svg">`
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
    controls,
    svgCode,
    svgBase64,
    controlState,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNoiseStore, import.meta.hot))

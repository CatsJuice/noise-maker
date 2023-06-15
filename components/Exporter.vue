<script lang="ts" setup>
const noiseStore = useNoiseStore()
const { copy } = useClipboard()

function copyCss() {
  const css = `background-image: url('${noiseStore.svgBase64}');`
  copy(css)
}

function copySvg() {
  const svg = noiseStore.svgCode
  copy(svg)
}

function downloadSvg() {
  const svg = noiseStore.svgBase64
  const url = svg
  const a = document.createElement('a')
  a.href = url
  a.download = 'noise.svg'
  a.click()
}
</script>

<template>
  <div flex="~ gap-2 items-center">
    <div class="export-btn" @click="copyCss">
      <div i-ic:sharp-css />
    </div>
    <div class="export-btn" @click="copySvg">
      <div i-carbon:svg />
    </div>
    <div class="export-btn" @click="downloadSvg">
      <div i-ic:round-download />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.export-btn
  --start-color: rgba(140, 140, 140, 0.5)
  --mid-color: rgba(140, 140, 140, 0)
  --end-color: rgba(140, 140, 140, 0.5)
  width: 36px
  height: 36px
  border-width: 1px
  border-style: solid
  border-image: linear-gradient(145deg, var(--start-color) 0%, var(--mid-color) 50%, var(--end-color) 100%) 1
  cursor: pointer
  background: rgba(255, 255, 255, 0.2)
  backdrop-filter: blur(12px) saturate(180%)
  transition: all 0.23s ease
  display: flex
  align-items: center
  justify-content: center

  &:hover
    background: rgba(255, 255, 255, 0.3)
    --start-color: rgba(140, 140, 140, 1)
    --end-color:  rgba(140, 140, 140, 1)

  & > *
    width: 80%
    height: 80%
    opacity: 0.7
</style>

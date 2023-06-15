<script setup lang="ts">
const { x: mouseX, y: mouseY } = useMouse()
const { svgBase64 } = useNoiseStore()

const highlights = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF']
const activeColor = ref(highlights[0])
const offset = reactive({ x: 0, y: 0 })
const cursorRef = ref<HTMLElement>()
const $el = ref<HTMLElement>()

useIntervalFn(() => {
  const index = highlights.indexOf(activeColor.value)
  activeColor.value = highlights[(index + 1) % highlights.length]
}, 5000)
useIntervalFn(() => {
  offset.x = (Math.random() - 0.5) * 100
  offset.y = (Math.random() - 0.5) * 100
}, 5000, { immediate: true })

const circleStyle = computed(() => ({
  'transform': `translate(${offset.x}%, ${offset.y}%)`,
  '--highlight': `${activeColor.value}`,
}))
const cursorStyle = computed(() => {
  const rect = $el.value?.getBoundingClientRect()
  if (!rect)
    return {}
  const x = mouseX.value - (rect.left || 0)
  const y = mouseY.value - (rect.top || 0)
  return { left: `${x}px`, top: `${y}px` }
})
</script>

<template>
  <div ref="$el" flex="~" relative h-full max-h-500px max-w-4xl w-full items-center justify-center overflow-hidden rounded-5>
    <ClientOnly>
      <!-- auto move highlight -->
      <div class="highlight" w="1/2" h="1/2" z="-1" absolute rounded-full transition-5000 transition-all :style="circleStyle" />
      <!-- cursor highlight -->
      <div ref="cursorRef" absolute :style="cursorStyle" z="-1" h-200px w-200px rounded-full bg="amber/70" translate-x="-1/2" translate-y="-1/2" />
      <!-- background -->
      <div bg="gray/20" border="~ 2 white/20" h-full w-full rounded-inherit backdrop-blur-100px />
      <!-- noise -->
      <div
        :style="{ backgroundImage: `url('${svgBase64}')` }" absolute left-0 top-0 h-full w-full
      />
      <!-- mask -->
      <div absolute inset-0 bg-gradient="~ to-b from-transparent to-white/50 dark:to-black/50" />
    </ClientOnly>
    <div absolute inset-0>
      <slot />
    </div>
  </div>
</template>

<style lang="sass" scoped>
@property --highlight
  syntax: '<color>'
  initial: '#FF0000'
  inherits: false
.highlight
  background-color: var(--highlight)
  transition: --highlight 5000ms, background-color 5000ms, transform 5000ms
</style>

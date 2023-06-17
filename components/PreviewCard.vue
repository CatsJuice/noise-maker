<script setup lang="ts">
const { x: mouseX, y: mouseY } = useMouse()
const noiseStore = useNoiseStore()

const highlights = ['#4BFF0C', '#FFDA0C', '#0078FF', '#FF0C64', '#00FFFF', '#FE19D4']
const activeColor = ref(highlights[0])
const offset = reactive({
  x: (0.5 - Math.random()) * 100,
  y: (0.5 - Math.random()) * 100,
})
const $el = ref<HTMLElement>()

useIntervalFn(() => {
  const index = highlights.indexOf(activeColor.value)
  activeColor.value = highlights[(index + 1) % highlights.length]
}, 5000)
function move() {
  offset.x = (Math.random() - 0.5) * 100
  offset.y = (Math.random() - 0.5) * 100
}
useIntervalFn(move, 4000)

onMounted(() => setTimeout(() => move(), 500))

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
  <div ref="$el" flex="~" relative h-full max-h-600px max-w-4xl w-full items-center justify-center overflow-hidden rounded-5 sm:max-h-500px>
    <ClientOnly>
      <!-- auto move highlight -->
      <div class="highlight" z="-1" absolute h-full w-full rounded-full transition-5000 transition-all :style="circleStyle" />
      <!-- cursor highlight -->
      <div class="cursor-highlight" :style="cursorStyle" z="1" absolute rounded-full translate-x="-1/2" translate-y="-1/2" />
      <!-- background -->
      <div bg="gray/20" border="~ 2 white/20" h-full w-full rounded-inherit backdrop-blur-100px />
      <!-- noise -->
      <div
        :style="{ backgroundImage: `url('${noiseStore.svgBase64}')` }" absolute left-0 top-0 h-full w-full
      />
      <!-- mask -->
      <div absolute inset-0 bg-gradient="~ to-b from-transparent to-white/50 dark:to-black/50" />
    </ClientOnly>
    <div absolute inset-0 z-2 cursor-none>
      <slot />
    </div>
  </div>
</template>

<style lang="sass" scoped>
@property --highlight
  syntax: '<color>'
  initial-value: #FF0000
  inherits: false
.highlight
  // background-color: var(--highlight)
  background: radial-gradient(var(--highlight) 0%, transparent 50%)
  transition: --highlight 5000ms, background 5000ms, transform 5000ms
.cursor-highlight
  background: red
  width: 8px
  height: 8px
</style>

<script setup lang="ts">
export interface BaseSliderProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
}

const props = withDefaults(defineProps<BaseSliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
})
const emits = defineEmits<{
  'update:modelValue': [v: number]
}>()

const handle = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const dragging = ref(false)

useDraggable(handle, {
  axis: 'x',
  initialValue: { x: 0, y: 0 },
  onMove,
  onStart,
  onEnd,
})

const percent = computed(() => {
  const totalRange = props.max - props.min
  return (props.modelValue! / totalRange) * 100
})

let startPos = { x: 0, y: 0 }
let trackWidth = 0
let handleStart = 0
function onMove(e: any) {
  const offsetX = e.x - startPos.x
  const newXPixel = handleStart + offsetX

  const totalRange = props.max - props.min
  const totalPieces = totalRange / props.step
  const newPiece = Math.round((newXPixel / trackWidth) * totalPieces)
  const newValue = props.step >= 1 ? newPiece * props.step : newPiece / (1 / props.step)
  emits('update:modelValue', Math.min(Math.max(newValue, props.min!), props.max!))
}
function onStart(e: any) {
  dragging.value = true
  startPos = e
  const trackRect = track.value!.getBoundingClientRect()
  trackWidth = trackRect.width
  handleStart = e.x - trackRect.left
}
function onEnd() {
  dragging.value = false
}
</script>

<template>
  <div class="slider" :class="{ 'slider--dragging': dragging }" relative h-4px select-none>
    <div class="slider__bg" absolute w-full overflow-hidden op-50>
      <svg width="1000" height="4" viewBox=" 0 0 1000 4">
        <line
          x1="0"
          y1="2"
          x2="1000"
          y2="2"
          stroke="var(--primary)"
          stroke-width="4"
          stroke-dasharray="1 2"
        />
      </svg>
    </div>

    <div ref="track" class="slider__track" h-full w-full>
      <div :style="{ width: `${percent}%` }" bg-primary relative h-full>
        <div
          ref="handle"
          class="slider__handle"
          top="1/2"
          translate-x="-1/2" translate-y="-1/2"
          bg-primary absolute left-full h-4 w-1 rounded-1px transition-all
        />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.slider--dragging .slider__handle,
.slider__handle:hover
    width: 6px
    border-radius: 2px

.slider--dragging .slider__bg
  opacity: 0.7
</style>

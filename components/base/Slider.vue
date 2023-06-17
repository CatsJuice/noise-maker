<script setup lang="ts">
export interface BaseSliderProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  /**
   * Whether to show a tooltip when dragging the slider
   */
  tooltip?: boolean
  tooltipFormatter?: (value: number) => string
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
  const value = props.modelValue ?? 0
  return ((value - props.min!) / totalRange) * 100
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
  const newValue = (props.step >= 1 ? newPiece * props.step : newPiece / (1 / props.step)) + props.min!
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

function onTrackClick(e: MouseEvent) {
  const trackRect = track.value!.getBoundingClientRect()
  const offsetX = e.clientX - trackRect.left
  const totalRange = props.max - props.min
  const totalPieces = totalRange / props.step
  const newPiece = Math.round((offsetX / trackRect.width) * totalPieces)
  const newValue = (props.step >= 1 ? newPiece * props.step : newPiece / (1 / props.step)) + props.min!
  emits('update:modelValue', Math.min(Math.max(newValue, props.min!), props.max!))
}
</script>

<template>
  <div
    flex="~"
    class="slider" :class="{ 'slider--dragging': dragging }" relative select-none items-center
  >
    <div class="slider__bg" absolute w-full overflow-hidden op-50>
      <svg width="1000" height="8" viewBox=" 0 0 1000 8">
        <line
          x1="0"
          y1="4"
          x2="1000"
          y2="4"
          stroke="var(--primary)"
          stroke-width="8"
          stroke-dasharray="1 2"
        />
      </svg>
    </div>

    <div ref="track" relative z-1 class="slider__track" w-full @click="onTrackClick">
      <div
        class="slider__thumb"
        :style="{ width: `${percent}%` }"
        bg-primary relative h-full rounded-full
      >
        <div
          ref="handle"
          class="slider__handle"
          top="1/2"
          translate-x="-1/2" translate-y="-1/2"
          bg-primary absolute left-full h-4 w-1 rounded-1px rounded-full transition-all
        />
      </div>

      <ClientOnly>
        <transition name="tooltip">
          <div
            v-if="tooltip && dragging"
            :style="{ left: `${percent}%` }"
            class="slider__tooltip"
            left="1/2" translate-x="-1/2"
            absolute bottom-full rounded-1 px-2 py-1 text-xs font-500 text-white
          >
            {{ tooltipFormatter ? tooltipFormatter(modelValue!) : modelValue }}
          </div>
        </transition>
      </ClientOnly>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.slider
  height: 8px
  --h: 4px
  &:hover,
  &:active
    --h: 8px

  &__track,
  &__bg
    transition: all 0.23s ease
    height: var(--h)
    border-radius: 8px
  &__bg
    border-top-right-radius: 0
    border-bottom-right-radius: 0
.slider--dragging .slider__handle,
.slider__handle:hover
    width: 8px !important
    height: 24px !important

.slider--dragging .slider__bg
  opacity: 0.7

.slider__thumb
  background-color: var(--primary50)
  backdrop-filter: blur(3px) saturate(300%)

// transition tooltip

.slider__tooltip
  --translateX: -50%
  --translateY: 0px
  bottom: calc(100% + 20px)
  transform: translate(var(--translateX), var(--translateY))
  background-color: var(--primary50)
  backdrop-filter: blur(3px) saturate(300%)
  z-index: 10
  &::after
    content: ""
    position: absolute
    width: 0
    height: 0
    border: 5px solid transparent
    border-top-color: var(--primary50)
    left: calc(50% - 5px)
    top: 100%

.tooltip-enter-active,
.tooltip-leave-active
  transition: all 0.23s ease
.tooltip-enter-from,
.tooltip-leave-to
  opacity: 0
  --translateY: 10px
</style>

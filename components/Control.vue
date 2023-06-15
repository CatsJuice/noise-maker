<script lang="ts" setup>
import '~/assets/slider.css'

const { controls, controlState } = useNoiseStore()
</script>

<template>
  <div>
    <div w-full flex="~ col gap-2 nowrap" justify-center text-sm>
      <div v-for="control in controls" :key="control.key" flex="~ nowrap gap-4 items-center">
        <div w-140px>
          {{ control.label }}:
        </div>
        <input v-model="controlState[control.key]" class="slider" type="range" :min="control.min" :max="control.max" :step="control.step">

        <div>
          {{ controlState[control.key] }}
        </div>
      </div>
    </div>
  </div>
</template>

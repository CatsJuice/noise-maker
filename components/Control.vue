<script lang="ts" setup>
const { controls, controlState } = useNoiseStore()
</script>

<template>
  <div>
    <div w-full flex="~ col gap-2 nowrap" justify-center text-sm>
      <div v-for="control in controls" :key="control.key" flex="~ nowrap gap-6 sm:gap-4 sm:items-center col sm:row">
        <div w-140px font-500 op-90>
          {{ control.label }}:
        </div>
        <BaseSlider
          v-model="controlState[control.key]"
          tooltip
          flex="~ sm:1"
          w-full sm:max-w-250px sm:w-0
          :min="control.min" :max="control.max" :step="control.step"
          :tooltip-formatter="control.formatter"
        />
      </div>
    </div>
  </div>
</template>

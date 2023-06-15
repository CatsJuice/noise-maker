<script lang="ts" setup>
import { gitRepo } from '../constants/index'
</script>

<template>
  <div flex="~ gap-4" items-center>
    <a :href="gitRepo" target="_blank" rel="noopener noreferrer">
      <div i-carbon:logo-github />
    </a>
    <DarkToggle />
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/info')

const time = useTimeAgo(() => data.value?.startAt || 0)
</script>

<template>
  <div text-gray:80>
    <span font-500 text-gray>{{ data?.visitCount }}</span>
    page views since
    <span text-gray>{{ time }}</span>
  </div>
</template>

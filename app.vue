<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --primary: #C70039;
  --primary50: #C7003980;
}

html.dark {
  --primary: #FFC300;
  --primary50: #FFC30080;
}

html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}
#__nuxt {
  padding: 20px
}

html.dark {
  background: #222;
  color: white;
}
</style>

<script setup lang="ts">

</script>

<template>
  <div h-full w-full flex="~ col gap-4" items-center justify-center>
    <PreviewCard>
      <div h-full w-full p-8 flex="~ col gap-4">
        <div class="group" relative text-2rem font-700>
          Generate Noise
          <div absolute inset-0 translate-y-1 content-inherit op-20 transition-all-500 group-hover:translate-x-0 group-hover:translate-y-0 translate-x="-1">
            Generate Noise
          </div>
        </div>
        <Control flex="~ 1" h-0 />
        <Exporter />
      </div>
      <Tools absolute right-8 top-8 h-48px />
    </PreviewCard>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { BrandMark } from '../elements'
</script>

<template>
  <footer class="content-grid h-12">
    <section class="flex items-center justify-between gap-4 px-2">
      <RouterLink to="/" class="font-outfit text-sm font-black">
        <span> TODO<span class="text-avocado-500">S</span> </span>
      </RouterLink>
      <BrandMark />
    </section>
  </footer>
</template>

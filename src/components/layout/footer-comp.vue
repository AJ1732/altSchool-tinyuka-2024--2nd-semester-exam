<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { BrandMark } from '../elements'
</script>

<template>
  <footer className="content-grid h-12">
    <section className="flex items-center justify-between gap-4 px-2">
      <RouterLink to="/" className="text-sm font-outfit font-black">
        TODO<span className="text-avocado-500">S</span>
      </RouterLink>
      <BrandMark />
    </section>
  </footer>
</template>

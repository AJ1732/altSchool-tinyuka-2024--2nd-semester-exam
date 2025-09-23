<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Footer } from '@/components/layout'
</script>

<template>
  <main className="content-grid mt-4 min-h-[calc(100dvh-4rem)]">
    <div className="bg-neutral-background/60 border size-full rounded-lg p-4">
      <RouterView />
    </div>
  </main>
  <Footer />
</template>

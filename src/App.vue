<script setup lang="ts">
import { RouterView } from 'vue-router'

import { Footer } from '@/components/layout'
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <main class="content-grid mt-4 min-h-[calc(100dvh-4rem)]">
    <div class="bg-neutral-background/60 size-full rounded-lg border p-4">
      <RouterView />
    </div>
  </main>
  <Footer />
  <Toaster />
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'

import { Button } from '@/components/ui/button'
</script>

<template>
  <section class="flex size-full flex-col justify-between">
    <hgroup class="text-xl leading-[150%] md:text-2xl lg:text-3xl">
      <h3>Opps!</h3>
      <h2>You sure you&apos;re meant to be here?</h2>
    </hgroup>

    <h1
      class="bg-avocado-500 mx-auto px-4 py-1 text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
    >
      This page doesn&apos;t exist!
    </h1>

    <div class="ml-auto flex flex-col items-end space-y-2 lg:mb-10 lg:space-y-4">
      <p class="text-lg md:text-xl lg:text-2xl">Don&apos;t worry, We all get lost sometimes</p>

      <Button asChild class="ml-auto h-14 w-fit px-8 text-xl" size="lg">
        <RouterLink to="/">Let&apos;s go Home</RouterLink>
      </Button>
    </div>
  </section>
</template>

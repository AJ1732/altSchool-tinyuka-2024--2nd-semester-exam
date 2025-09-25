<script setup lang="ts">
import { Github } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

import { Button } from '@/components/ui/button'
</script>

<template>
  <main className="flex h-full flex-col items-center justify-center space-y-8 text-neutral-800">
    <!-- Hero Section -->
    <header className="max-w-xl space-y-4">
      <h1 className="text-4xl font-black">TODO<span className="text-avocado-500">S</span></h1>
      <p className="text-lg">
        A comprehensive Todo application using React that showcases API integration, modern
        patterns, routing, and accessible UI.
      </p>
      <div className="flex flex-wrap gap-4">
        <Button size="lg" asChild>
          <RouterLink to="/todos">View Todos</RouterLink>
        </Button>
        <Button size="lg" asChild variant="outline">
          <RouterLink to="/error">Test Error Page</RouterLink>
        </Button>
        <Button size="lg" asChild variant="destructive">
          <RouterLink to="/alt">Test Not Found Page</RouterLink>
        </Button>
      </div>
    </header>

    <!-- Technical Requirements -->
    <section aria-labelledby="tech-req-heading" className="w-full max-w-xl space-y-4">
      <article className="space-y-3">
        <h3 className="text-xl font-medium">Core Technologies</h3>
        <ul className="list-inside list-disc space-y-1">
          <li><strong>React 19+</strong> with functional components and hooks</li>
          <li>UI Library <strong>Shadcn UI</strong> to speed up development</li>
          <li><strong>TanStack Router</strong> for routing/navigation</li>
          <li>
            API Integration of{{ ' ' }}
            <strong>
              <a target="_blank" href="https://jsonplaceholder.typicode.com">
                JSONplaceholder
              </a> </strong
            >{{ ' ' }} todos with <strong>Axios</strong> and{{ ' ' }}
            <strong>TanStack Query</strong>
          </li>
          <li>Styling with <strong>Tailwind CSS</strong></li>
        </ul>
      </article>
    </section>

    <section>
      <Button className="w-fit">
        <a
          href="https://github.com/AJ1732/altSchool-tinyuka-2024--2nd-semester-exam/tree/vuejs"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2"
        >
          <Github /> Checkout Source Code
        </a>
      </Button>
    </section>
  </main>
</template>

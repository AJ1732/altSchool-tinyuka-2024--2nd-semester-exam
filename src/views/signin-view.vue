<script lang="ts" setup>
import { SigninForm } from '@/features/auth/components'
</script>

<template>
  <div class="grid h-full place-content-center space-y-4">
    <header class="text-center">
      <h1 class="text-xl font-medium md:text-3xl lg:text-4xl">Sign into Your Account</h1>
    </header>
    <SigninForm />
  </div>
</template>

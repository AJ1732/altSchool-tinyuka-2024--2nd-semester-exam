<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { RouterLink } from 'vue-router'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useSignin } from '../queries'

const formSchema = toTypedSchema(
  z.object({
    email: z.email({
      message: 'Must be a valid email.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
  }),
)

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const { mutateAsync: signin, isPending } = useSignin()

const onSubmit = handleSubmit(async (values) => {
  await signin({ ...values })
})
</script>

<template>
  <form class="w-full max-w-2xl space-y-6 lg:min-w-80" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="text" placeholder="e.g. todo@example.com" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="text" placeholder="••••••••" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" :disabled="isPending"> Submit </Button>

    <p>
      Don&apos;t have an account?
      <RouterLink to="/signup" class="text-avocado-600 font-normal hover:underline">
        Signup
      </RouterLink>
    </p>
  </form>
</template>

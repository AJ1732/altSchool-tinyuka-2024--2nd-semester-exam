<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { RouterLink } from 'vue-router'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useSignup } from '../queries'

const formSchema = toTypedSchema(
  z
    .object({
      email: z.email({
        message: 'Must be a valid email.',
      }),
      password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
      }),
      confirmPassword: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    }),
)

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const { mutateAsync: signup, isPending } = useSignup()

const onSubmit = handleSubmit(async (values) => {
  const res = await signup({ email: values.email, password: values.password })
  console.log('Response:', res)
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
        <FormDescription> Choose a strong password (min. 8 characters). </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="confirmPassword" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Confirm Password</FormLabel>
        <FormControl>
          <Input type="text" placeholder="••••••••" v-bind="componentField" />
        </FormControl>
        <FormDescription>Passwords must match.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" :disabled="isPending"> Submit </Button>

    <p>
      Already have an account?
      <RouterLink to="/signin" class="text-avocado-600 font-normal hover:underline">
        Signin
      </RouterLink>
    </p>
  </form>
</template>

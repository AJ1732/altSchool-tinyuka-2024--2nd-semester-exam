/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { signup, signin } from "../services";

// Helper: infer the async return type of a function
type AwaitedReturn<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : never;

// Use the helper to infer the shape returned by `signup` / `signin`
type SignupResponse = AwaitedReturn<typeof signup>;
type SigninResponse = AwaitedReturn<typeof signin>;

export const useSignup = () => {
  const qc = useQueryClient();
  const router = useRouter();

  return useMutation<SignupResponse, Error, AuthCreds>({
    mutationFn: async (creds: AuthCreds) => {
      const p = signup(creds); // Promise<SignupResponse>

      toast.promise(p, {
        loading: "Signing up...",
        success: "Check your email if confirmation is required!",
        // explicitly type err so we don't get 'implicit any'
        error: (err: unknown) =>
          `Signup failed: ${String((err as Error)?.message ?? err)}`,
      });

      return await p;
    },

    onSuccess: (data: SignupResponse) => {
      // data shape depends on supabase, but typically { user?, session? }
      qc.setQueryData(["auth", "user"], (data as any)?.user ?? null);
      router.push("/callback");
    },

    onError: (err: unknown) => {
      console.error("Signup error:", err);
    },
  });
};

export const useSignin = () => {
  const qc = useQueryClient();
  const router = useRouter();

  return useMutation<SigninResponse, Error, AuthCreds>({
    mutationFn: async (creds: AuthCreds) => {
      const p = signin(creds);

      toast.promise(p, {
        loading: "Signing in...",
        success: "Welcome back!",
        error: (err: unknown) =>
          `Signin failed: ${String((err as Error)?.message ?? err)}`,
      });
      const pa = await p;
      console.log(pa);
      return p;
    },

    onSuccess: (data: SigninResponse) => {
      qc.setQueryData(["auth", "user"], (data as any)?.user ?? null);
      router.push("/");
    },

    onError: (err: unknown) => {
      console.error("Signin error:", err);
    },
  });
};

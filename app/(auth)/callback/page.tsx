"use client";
import { supabase } from "@/supabase/client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // parse tokens from URL hash: #access_token=...&refresh_token=...&...
    const hash = window.location.hash; // only available client-side
    if (!hash) {
      // nothing to do — redirect or show message
      router.replace("/");
      return;
    }

    const params = new URLSearchParams(hash.substring(1)); // remove leading '#'
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    const type = params.get("type"); // e.g. signup / magiclink / recovery
    const error_description = params.get("error_description");

    if (error_description) {
      toast.error(`Auth error: ${error_description}`);
      router.replace("/"); // or to an error page
      return;
    }

    if (!access_token || !refresh_token) {
      // nothing to consume — either already handled or wrong flow
      router.replace("/");
      return;
    }

    // set the session in the Supabase client
    (async () => {
      try {
        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          toast.error(`Failed to set session: ${error.message}`);
          router.replace("/"); // or an error page
          return;
        }

        // optional: you can read data.session / data.user
        toast.success(type === "signup" ? "Signed up!" : "Signed in!");
        // now user is signed in client-side — redirect to home or dashboard
        router.replace("/");
      } catch (err) {
        console.error("setSession error", err);
        toast.error("Unexpected auth error");
        router.replace("/");
      } finally {
        // remove the hash from URL to keep things tidy (so tokens aren't visible)
        // replace the URL without the hash:
        const cleanUrl = window.location.origin + window.location.pathname + window.location.search;
        window.history.replaceState(null, "", cleanUrl);
      }
    })();
  }, [router]);

  return <div className="p-8">Signing you in…</div>;
}

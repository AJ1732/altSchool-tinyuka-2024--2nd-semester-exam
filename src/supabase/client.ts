import { createClient } from "@supabase/supabase-js";

import { SUPABASE_API_KEY, SUPABASE_PROJECT_URL } from "@/lib/env";

export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_API_KEY, {
  auth: {
    persistSession: true,
    detectSessionInUrl: false,
  },
});

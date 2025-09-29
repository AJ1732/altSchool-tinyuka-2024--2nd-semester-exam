import { supabase } from "@/supabase/client";

// signup user
export async function signup(cred: AuthCreds) {
  const { data, error } = await supabase.auth.signUp(cred);
  if (error) throw error;
  return data;
}

// signin user
export async function signin(cred: AuthCreds) {
  const { data, error } = await supabase.auth.signInWithPassword(cred);
  if (error) throw error;
  return data;
}

// get current session
export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  console.log("Current session check:", { data, error });
  return { data, error };
}

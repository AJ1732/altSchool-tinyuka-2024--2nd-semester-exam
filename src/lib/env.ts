export const SUPABASE_PROJECT_URL = assertValue(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  "Missing environment variable: VITE_SUPABASE_PROJECT_URL",
);

export const SUPABASE_API_KEY = assertValue(
  import.meta.env.VITE_SUPABASE_API_KEY,
  "Missing environment variable: VITE_SUPABASE_PROJECT_URL",
);

function assertValue(v: string | undefined, errorMessage: string): string {
  if (v === undefined) throw new Error(errorMessage);
  return v;
}

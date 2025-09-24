export const SUPABASE_PROJECT_URL = assertValue(
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
  "Missing environment variable: NEXT_PUBLIC_SUPABASE_PROJECT_URL",
);

export const SUPABASE_API_KEY = assertValue(
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
  "Missing environment variable: NEXT_PUBLIC_SUPABASE_PROJECT_URL",
);

function assertValue(v: string | undefined, errorMessage: string): string {
  if (v === undefined) throw new Error(errorMessage);
  return v;
}

import { createClient } from "@supabase/supabase-js";

const {
  VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY,
  TEST_SUPABASE_SERVICE_ROLE_KEY,
} = process.env;

if (
  !VITE_SUPABASE_URL ||
  !VITE_SUPABASE_ANON_KEY ||
  !TEST_SUPABASE_SERVICE_ROLE_KEY
) {
  throw new Error("Missing Supabase environment variables");
}

export const supabaseAdminClient = createClient(
  VITE_SUPABASE_URL,
  TEST_SUPABASE_SERVICE_ROLE_KEY,
);

export const supabaseAnonClient = createClient(
  VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY,
);

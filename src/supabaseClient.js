import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// --- Crucial Error Handling ---
// This will stop the app with a clear message if the .env file is not set up correctly.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing. Make sure you have a .env file in your project root with REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
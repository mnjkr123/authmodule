// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://owkohxbrbejjwqfzxqzu.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93a29oeGJyYmVqandxZnp4cXp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA4OTI5MDcsImV4cCI6MjAzNjQ2ODkwN30.2b1Z662y68OV8nn6p_oBGs_BC5myELRiVwHz1sRsEak";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

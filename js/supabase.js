// supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ivivpejkbrzmmrueikht.supabase.co"  // ← Paste your URL here
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2aXZwZWprYnJ6bW1ydWVpa2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MDQ1NzgsImV4cCI6MjA2MjM4MDU3OH0.6Zxe36Sz7wU9toyLwlCs_77V0MexF2px3wGp7cB3ebc"      // ← Paste your key here

export const supabase = createClient(supabaseUrl, supabaseKey)
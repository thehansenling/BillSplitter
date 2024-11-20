import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://oqwynstiemdntxbdubiw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xd3luc3RpZW1kbnR4YmR1Yml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2ODk0MTEsImV4cCI6MjAzNzI2NTQxMX0.VuaXA5auIPTWhJVHbQ16fAC0ctx5sG4mc32OM2QAK9o'

export const supabase = createClient(supabaseUrl, supabaseKey, {
   auth: {
     autoRefreshToken: true,
     persistSession: true,
     detectSessionInUrl: false,
   },
 });

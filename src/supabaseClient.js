import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://klpxkypcyiclxomjtlrn.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtscHhreXBjeWljbHhvbWp0bHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4Nzc1OTgsImV4cCI6MjEwNTQ1MzU5OH0.Wvz7dw_iCZbammTZomjaxW3fkOZa5a6GTMQKLrSGdic'

export const supabase = createClient(supabaseUrl, supabaseKey)

if (supabaseUrl === 'https://placeholder.supabase.co') {
    console.error('Supabase URL is missing! Check your .env.local file.');
}
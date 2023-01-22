import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
    "https://zbhpohptkdsrrkjqwqol.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiaHBvaHB0a2RzcnJranF3cW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQxNTIyOTgsImV4cCI6MTk4OTcyODI5OH0.SQ9pLzgoaU7yPzx2QM6nL4TwT9hq9qTO1t4-x9SBTRc"
)
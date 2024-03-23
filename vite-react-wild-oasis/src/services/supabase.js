import { createClient } from "@supabase/supabase-js"; // Import module createClient để tạo client kết nối với Supabase
const supabaseUrl = "https://vrnjplundvwdtwcwyzzr.supabase.co"; // URL của Supabase
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZybmpwbHVuZHZ3ZHR3Y3d5enpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExNzA5MDAsImV4cCI6MjAyNjc0NjkwMH0.eslQ1ARbNWCgEg5qpuU8vpDjUwgmwCNmHcA40TR3Ea8"; // Key của Supabase
const supabase = createClient(supabaseUrl, supabaseKey); // Tạo client kết nối với Supabase
export default supabase;

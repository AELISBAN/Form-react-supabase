

import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabaseUrl = "https://cjuyadnhthhthdkebriq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqdXlhZG5odGhodGhka2VicmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2MzI0MDUsImV4cCI6MjA2MjIwODQwNX0.0m-rYTsx-AB855C-s3XxT0HdtvjX9XFWMM9idWmt-RE";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;





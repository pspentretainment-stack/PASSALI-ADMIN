
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pstdgxmhgqsrcwaztxis.supabase.co";

const supabaseKey = "sb_publishable_K9C9FArlRzQpOukhjA6P4A_EObZ4g0B";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

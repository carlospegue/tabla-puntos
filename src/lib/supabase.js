import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gdggbyycfiixpwddknpi.supabase.co'; 
const supabaseKey = 'sb_publishable_eGwwwWkHux2xz2mjF5X4vQ_OfjHBht9'; 

export const supabase = createClient(supabaseUrl, supabaseKey);
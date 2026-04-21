import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gdggbyycfiixpwddknpi.supabase.co'; // Reemplaza con tu URL
const supabaseKey = 'sb_publishable_eGwwwWkHux2xz2mjF5X4vQ_OfjHBht9'; // Reemplaza con tu API Key

export const supabase = createClient(supabaseUrl, supabaseKey);
import { createClient } from '@supabase/supabase-js';

const url = __api.env.SUPABASE_URL;
const key = __api.env.SUPABASE_KEY;

export const db = createClient(url, key);

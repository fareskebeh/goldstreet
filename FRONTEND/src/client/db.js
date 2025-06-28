import {createClient} from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
const aKey= import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY

const db = createClient(
    supabaseUrl,
    aKey
);

export default db;
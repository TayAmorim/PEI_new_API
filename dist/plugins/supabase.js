import fastifyPlugin from 'fastify-plugin';
import { createClient } from '@supabase/supabase-js';
async function supabasePlugin(fastify) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    fastify.decorate('supabase', supabase);
}
export default fastifyPlugin(supabasePlugin);

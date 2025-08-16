import fastifyPlugin from 'fastify-plugin';
import { createClient } from '@supabase/supabase-js';
async function supabasePlugin(fastify) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    fastify.addHook('onRequest', async (request, reply) => {
        const authHeader = request.headers.authorization;
        const supabase = createClient(supabaseUrl, supabaseKey, {
            global: {
                headers: {
                    ...(authHeader && { Authorization: authHeader })
                }
            },
            auth: {
                persistSession: false
            }
        });
        request.server.supabase = supabase;
    });
}
export default fastifyPlugin(supabasePlugin);

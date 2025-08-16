import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

declare module 'fastify' {
  interface FastifyInstance {
    supabase: SupabaseClient;
  }
}

async function supabasePlugin(fastify: FastifyInstance) {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_KEY!;

  fastify.addHook('onRequest', async (request) => {
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
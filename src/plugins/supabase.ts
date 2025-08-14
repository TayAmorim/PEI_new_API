import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Adiciona o tipo do cliente supabase na instância do Fastify
declare module 'fastify' {
  interface FastifyInstance {
    supabase: SupabaseClient;
  }
}

async function supabasePlugin(fastify: FastifyInstance) {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_KEY!;

  const supabase = createClient(supabaseUrl, supabaseKey);

  fastify.decorate('supabase', supabase);
}

export default fastifyPlugin(supabasePlugin);